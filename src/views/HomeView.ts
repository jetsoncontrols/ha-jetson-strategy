// noinspection JSUnusedGlobalSymbols Class is dynamically imported.

import { Registry } from '../Registry';
import { ActionConfig } from '../types/homeassistant/data/lovelace/config/action';
import { LovelaceCardConfig } from '../types/homeassistant/data/lovelace/config/card';
import { AreaCardConfig, StackCardConfig } from '../types/homeassistant/panels/lovelace/cards/types';
import { MushroomPersonCardConfig } from '../types/lovelace/cards/mushroom/person-card-config';
import { MushroomTemplateCardConfig } from '../types/lovelace/cards/mushroom/template-card-config';
import { TileCardConfig } from '../types/lovelace/cards/tile-card-config';
import { ClockWeatherCardConfig } from '../types/lovelace/cards/clock-weather-card-config';
import { ViewConfig } from '../types/strategy/strategy-views';
import { sanitizeClassName } from '../utilities/auxiliaries';
import { logMessage, lvlError, lvlInfo } from '../utilities/debug';
import { localize } from '../utilities/localize';
import AbstractView from './AbstractView';
import registryFilter from '../utilities/RegistryFilter';
import { stackHorizontal } from '../utilities/cardStacking';

/**
 * Home View Class.
 *
 * Used to create a Home view.
 */
class HomeView extends AbstractView {
  /** The domain of the entities that the view is representing. */
  static readonly domain = 'home' as const;

  /**
   * Class constructor.
   *
   * @param {ViewConfig} [customConfiguration] Custom view configuration.
   */
  constructor(customConfiguration?: ViewConfig) {
    super();

    this.baseConfiguration = { ...this.baseConfiguration, ...HomeView.getDefaultConfig(), ...customConfiguration };
  }

  /** Returns the default configuration object for the view. */
  static getDefaultConfig(): ViewConfig {
    return {
      title: localize('generic.home'),
      icon: undefined,//'mdi:home',
      path: 'home',
      subview: false,
    };
  }

  /**
   * Create the configuration of the cards to include in the view.
   *
   * @override
   */
  async createCardConfigurations(): Promise<LovelaceCardConfig[]> {
    const homeViewCards: LovelaceCardConfig[] = [];

    let weatherSection, lightsOnSection;

    try {
      [weatherSection, lightsOnSection] = await Promise.all([
        this.weatherSection(),
        this.createLightsOnSection(),
      ]);
    } catch (e) {
      logMessage(lvlError, 'Error importing created sections!', e);

      return homeViewCards;
    }

    // Create the greeting section.
    // if (!Registry.strategyOptions.home_view.hidden.includes('greeting')) {
    //   homeViewCards.push({
    //     type: 'custom:mushroom-template-card',
    //     primary: `{% set time = now().hour %}
    //        {% if (time >= 18) %}
    //          ${localize('generic.good_evening')},{{user}}!
    //        {% elif (time >= 12) %}
    //          ${localize('generic.good_afternoon')}, {{user}}!
    //        {% elif (time >= 6) %}
    //          ${localize('generic.good_morning')}, {{user}}!
    //        {% else %}
    //          ${localize('generic.hello')}, {{user}}! {% endif %}`,
    //     icon: 'mdi:hand-wave',
    //     icon_color: 'orange',
    //     tap_action: {
    //       action: 'none',
    //     } as ActionConfig,
    //     double_tap_action: {
    //       action: 'none',
    //     } as ActionConfig,
    //     hold_action: {
    //       action: 'none',
    //     } as ActionConfig,
    //   } as MushroomTemplateCardConfig);
    // }

    if (Registry.strategyOptions.quick_access_cards) {
      homeViewCards.push(...Registry.strategyOptions.quick_access_cards);
    }

    // if (areasSection) {
    //   homeViewCards.push(areasSection);
    // }

    if (weatherSection) {
      homeViewCards.push(weatherSection);
    }
    if (lightsOnSection) {
      homeViewCards.push(lightsOnSection);
    }

    if (Registry.strategyOptions.extra_cards) {
      homeViewCards.push(...Registry.strategyOptions.extra_cards);
    }

    return [
      {
        type: 'vertical-stack',
        cards: homeViewCards,
      },
    ];
  }

  

  /**
   * Create the area cards to include in the view.
   *
   * Area cards are grouped into two areas per row.
   * If the section is marked as hidden in the strategy option, then the section is not created.
   */
  // private async createAreasSection(): Promise<StackCardConfig | undefined> {
  //   if (Registry.strategyOptions.home_view.hidden.includes('areas')) {
  //     // Areas section is hidden.
  //     return;
  //   }

  //   const cardConfigurations: (MushroomTemplateCardConfig | AreaCardConfig)[] = [];

  //   for (const area of Registry.areas) {
  //     const moduleName =
  //       Registry.strategyOptions.areas[area.area_id]?.type ?? Registry.strategyOptions.areas['_']?.type ?? 'default';

  //     let AreaCard;

  //     try {
  //       AreaCard = (await import(`../cards/${moduleName}`)).default;
  //     } catch (e) {
  //       // Fallback to the default strategy card.
  //       AreaCard = (await import('../cards/AreaCard')).default;

  //       if (Registry.strategyOptions.debug && moduleName !== 'default') {
  //         logMessage(lvlError, `Error importing ${moduleName}: card!`, e);
  //       }
  //     }

  //     cardConfigurations.push(
  //       new AreaCard(area, {
  //         ...Registry.strategyOptions.areas['_'],
  //         ...Registry.strategyOptions.areas[area.area_id],
  //       }).getCard(),
  //     );
  //   }

  //   return {
  //     type: 'vertical-stack',
  //     title: Registry.strategyOptions.home_view.hidden.includes('areasTitle') ? undefined : localize('generic.areas'),
  //     cards: stackHorizontal(cardConfigurations, Registry.strategyOptions.home_view.stack_count['_'], {
  //       'custom:mushroom-template-card': Registry.strategyOptions.home_view.stack_count.areas?.[0],
  //       area: Registry.strategyOptions.home_view.stack_count.areas?.[1],
  //     }),
  //   };
  // }

  /**
   * Create the weather section to include in the view.
   *
   * If the section is marked as hidden in the strategy option, then the section is not created.
   */
  private async weatherSection(): Promise<ClockWeatherCardConfig | undefined> {
    if (Registry.strategyOptions.home_view.hidden.includes('weather')) {
      return;
    }
    const cardConfigurations: ClockWeatherCardConfig[] = [];
    const ClockWeatherCard = (await import('../cards/ClockWeatherCard')).default;

    cardConfigurations.push(
      ...Registry.entities
        .filter((entity) => entity.entity_id.startsWith('weather.'))
        .map((weather) => new ClockWeatherCard(weather).getCard()),
    );

    if (cardConfigurations.length > 1) {
      return {
        type: 'vertical-stack',
        cards: cardConfigurations
      };
    }
    return cardConfigurations[0];
  }

  /**
   * Create a lights on section to include in the view.
   *
   * If the section is marked as hidden in the strategy option, then the section is not created.
   */
  private async createLightsOnSection(): Promise<StackCardConfig | undefined> {
    if (Registry.strategyOptions.home_view.hidden.includes('lightsOn')) {
      // The section is hidden.
      return;
    }

    const cardConfigurations: TileCardConfig[] = [];
    const TileCard = (await import('../cards/TileCard')).default;

    cardConfigurations.push(
      ...Registry.entities
        .filter((entity) => entity.entity_id.startsWith('light.'))
        .map((light) => new TileCard(light).getCard()),
    );

    console.info(`Creating lights on section with ${cardConfigurations.length} cards.`);

    return {
      type: 'vertical-stack',
      cards: stackHorizontal(
        cardConfigurations,
        cardConfigurations.length),
    };
  }
}

export default HomeView;
