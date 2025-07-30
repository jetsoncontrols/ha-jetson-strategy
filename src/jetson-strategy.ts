import { HassServiceTarget } from 'home-assistant-js-websocket';
import HeaderCard from './cards/HeaderCard';
import SensorCard from './cards/SensorCard';
import { Registry } from './Registry';
import { LovelaceCardConfig } from './types/homeassistant/data/lovelace/config/card';
import { LovelaceConfig } from './types/homeassistant/data/lovelace/config/types';
import { LovelaceViewConfig } from './types/homeassistant/data/lovelace/config/view';
import {
  DashboardInfo,
  isSupportedDomain,
  isSupportedView,
  StrategyArea,
  StrategyViewConfig,
  ViewInfo,
} from './types/strategy/strategy-generics';
import { sanitizeClassName } from './utilities/auxiliaries';
import { logMessage, lvlError, lvlInfo } from './utilities/debug';
import RegistryFilter from './utilities/RegistryFilter';
import { stackHorizontal } from './utilities/cardStacking';
// import { PersistentNotification } from './utilities/PersistentNotification';
// import { HomeAssistant } from './types/homeassistant/types';
// import semver from 'semver/preload';


export class JetsonStrategy extends HTMLTemplateElement {
  /**
   * Generate a dashboard.
   *
   * This method creates views for each exposed domain and area.
   * It also adds custom views if specified in the strategy options.
   *
   * @param {DashboardInfo} info Dashboard strategy information object.
   *
   * @remarks
   * Called when opening a dashboard.
   */
  static async generateDashboard(info: DashboardInfo): Promise<LovelaceConfig> {
    await Registry.initialize(info);

    const views: StrategyViewConfig[] = [];

    // Parallelize view imports and creation.
    const viewPromises = Registry.getExposedNames('view')
      .filter(isSupportedView)
      .map(async (viewName) => {
        try {
          const moduleName = sanitizeClassName(`${viewName}View`);
          const View = (await import(`./views/${moduleName}`)).default;
          const currentView = new View(Registry.strategyOptions.views[viewName]);
          const viewConfiguration = await currentView.getView();

          if (viewConfiguration.cards.length) {
            return viewConfiguration;
          }

          logMessage(lvlInfo, `View ${viewName} has no entities available!`);
        } catch (e) {
          logMessage(lvlError, `Error importing ${viewName} view!`, e);
        }

        return null;
      });

    const resolvedViews = (await Promise.all(viewPromises)).filter(Boolean) as StrategyViewConfig[];

    views.push(...resolvedViews);

    // Extra views
    if (Registry.strategyOptions.extra_views) {
      views.push(...Registry.strategyOptions.extra_views);

      views.sort((a, b) => {
        return (a.order ?? Infinity) - (b.order ?? Infinity) || (a.title ?? '').localeCompare(b.title ?? '');
      });
    }

    // Subviews for areas
    views.push(
      ...Registry.areas.map((area) => ({
        title: area.name,
        path: area.area_id,
        subview: true,
        hidden: area.hidden ?? false,
        order: area.order ?? Infinity,
        strategy: {
          type: 'custom:jetson-strategy',
          options: { area },
        },
      }))
    );

    return { views };
  }

  /**
   * Generate a view.
   *
   * The method creates cards for each domain (e.g., sensors, switches, etc.) in the current area, using a combination
   * of Header cards and entity-specific cards.
   * It also handles miscellaneous entities that don't fit into any supported domain.
   *
   * @param {ViewInfo} info The view's strategy information object.
   *
   * @remarks
   * Called upon opening a subview.
   */
  static async generateView(info: ViewInfo): Promise<LovelaceViewConfig> {
    const exposedDomainNames = Registry.getExposedNames('domain');
    const area = info.view.strategy?.options?.area ?? ({} as StrategyArea);
    const areaEntities = new RegistryFilter(Registry.entities).whereAreaId(area.area_id).toList();
    const viewCards: LovelaceCardConfig[] = [...(area.extra_cards ?? [])];

    // Set the target for any Header card to the current area.
    const target: HassServiceTarget = { area_id: [area.area_id] };

    // Prepare promises for all supported domains
    const domainCardPromises = exposedDomainNames.filter(isSupportedDomain).map(async (domain) => {
      const moduleName = sanitizeClassName(domain + 'Card');

      const entities = new RegistryFilter(areaEntities)
        .whereDomain(domain)
        .where((entity) => !(domain === 'switch' && entity.entity_id.endsWith('_stateful_scene')))
        .toList();

      if (!entities.length) {
        return null;
      }

      const headerCard = new HeaderCard(
        { entity_id: entities.map((entity) => entity.entity_id) },
        {
          ...Registry.strategyOptions.domains['_'],
          ...Registry.strategyOptions.domains[domain],
        }
      ).createCard();

      try {
        const DomainCard = (await import(`./cards/${moduleName}`)).default;

        if (domain === 'sensor') {
          let domainCards = entities
            .filter((entity) => Registry.hassStates[entity.entity_id]?.attributes.unit_of_measurement)
            .map((entity) => {
              const options = {
                ...(entity.device_id && Registry.strategyOptions.card_options?.[entity.device_id]),
                ...Registry.strategyOptions.card_options?.[entity.entity_id],
                type: 'custom:mini-graph-card',
                entities: [entity.entity_id],
              };
              return new SensorCard(entity, options).getCard();
            });

          if (domainCards.length) {
            domainCards = stackHorizontal(
              domainCards,
              Registry.strategyOptions.domains[domain].stack_count ?? Registry.strategyOptions.domains['_'].stack_count
            );

            return { type: 'vertical-stack', cards: [headerCard, ...domainCards] };
          }

          return null;
        }

        let domainCards = entities.map((entity) => {
          const cardOptions = {
            ...(entity.device_id && Registry.strategyOptions.card_options?.[entity.device_id]),
            ...Registry.strategyOptions.card_options?.[entity.entity_id],
          };
          return new DomainCard(entity, cardOptions).getCard();
        });

        domainCards = stackHorizontal(
          domainCards,
          Registry.strategyOptions.domains[domain].stack_count ?? Registry.strategyOptions.domains['_'].stack_count
        );

        return domainCards.length ? { type: 'vertical-stack', cards: [headerCard, ...domainCards] } : null;
      } catch (e) {
        logMessage(lvlError, `Error creating card configurations for domain ${domain}`, e);
        return null;
      }
    });

    // Await all domain card stacks
    const domainCardStacks = (await Promise.all(domainCardPromises)).filter(Boolean) as LovelaceCardConfig[];
    viewCards.push(...domainCardStacks);

    // Miscellaneous domain
    if (!Registry.strategyOptions.domains.default.hidden) {
      const miscellaneousEntities = new RegistryFilter(areaEntities)
        .not()
        .where((entity) => isSupportedDomain(entity.entity_id.split('.', 1)[0]))
        .toList();

      if (miscellaneousEntities.length) {
        try {
          const MiscellaneousCard = (await import('./cards/MiscellaneousCard')).default;
          let miscellaneousCards = miscellaneousEntities.map((entity) =>
            new MiscellaneousCard(entity, Registry.strategyOptions.card_options?.[entity.entity_id]).getCard()
          );

          const headerCard = new HeaderCard(target, {
            ...Registry.strategyOptions.domains['_'],
            ...Registry.strategyOptions.domains['default'],
          }).createCard();

          if (miscellaneousCards.length) {
            miscellaneousCards = stackHorizontal(
              miscellaneousCards,
              Registry.strategyOptions.domains['default'].stack_count ??
                Registry.strategyOptions.domains['_'].stack_count
            );

            viewCards.push({
              type: 'vertical-stack',
              cards: [headerCard, ...miscellaneousCards],
            });
          }
        } catch (e) {
          logMessage(lvlError, 'Error creating card configurations for domain `miscellaneous`', e);
        }
      }
    }

    return { cards: viewCards };
  }
}

customElements.define('ll-strategy-dashboard-jetson-strategy', JetsonStrategy);

const STRATEGY_VERSION = 'v1.0.0';
console.info(
  '%c Jetson Strategy %c '.concat(STRATEGY_VERSION, ' '),
  'color: white; background: coral; font-weight: 700;',
  'color: coral; background: white; font-weight: 700;'
);
