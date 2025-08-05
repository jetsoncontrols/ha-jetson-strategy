// noinspection JSUnusedGlobalSymbols Class is dynamically imported.

import { Registry } from '../Registry';
import { LovelaceCardConfig } from '../types/homeassistant/data/lovelace/config/card';
import { TileCardConfig } from '../types/lovelace/cards/tile-card-config';
import { ClockWeatherCardConfig } from '../types/lovelace/cards/clock-weather-card-config';
import { ViewConfig } from '../types/strategy/strategy-views';
import { logMessage, lvlError, lvlInfo } from '../utilities/debug';
import { localize } from '../utilities/localize';
import AbstractView from './AbstractView';
import { stackHorizontal } from '../utilities/cardStacking';
import { StackCardConfig } from '../types/homeassistant/panels/lovelace/cards/types';

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

    if (Registry.strategyOptions.quick_access_cards) {
      homeViewCards.push(...Registry.strategyOptions.quick_access_cards);
    }

    if (weatherSection) {
      homeViewCards.push(weatherSection);
    }

    if (lightsOnSection) {
      homeViewCards.push(lightsOnSection);
    }

    if (Registry.strategyOptions.extra_cards) {
      homeViewCards.push(...Registry.strategyOptions.extra_cards);
    }

    return homeViewCards;
  }

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
