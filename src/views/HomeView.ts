// noinspection JSUnusedGlobalSymbols Class is dynamically imported.

import { Registry } from '../Registry';
import { LovelaceCardConfig } from '../types/homeassistant/data/lovelace/config/card';
import { TileCardConfig } from '../types/lovelace/cards/tile-card-config';
import { GridCardConfig } from '../types/lovelace/cards/grid-card-config';
import { ViewConfig } from '../types/strategy/strategy-views';
import { logMessage, lvlError, lvlInfo } from '../utilities/debug';
import { localize } from '../utilities/localize';
import AbstractView from './AbstractView';
import { HeadingCardConfig } from '../types/lovelace/cards/heading-card-config';
import { ExpanderCardConfig } from '../types/lovelace/cards/expander-card-config';
import { HorizontalStackCardConfig } from '../types/lovelace/cards/horizontal-stack-card-config';
import { WeatherRadarCardConfig } from '../types/lovelace/cards/weather-radar-card-config';

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
  private async weatherSection(): Promise<GridCardConfig | undefined> {
    if (Registry.strategyOptions.home_view.hidden.includes('weather')) {
      return;
    }

    const GridCard = (await import('../cards/GridCard')).default;
    let result: GridCardConfig = GridCard.getDefaultConfig();

    // Add Heading card to the grid card.
    const HeadingCard = (await import('../cards/HeadingCard')).default;
    let weatherHeadingConfig: HeadingCardConfig = HeadingCard.getDefaultConfig();
    weatherHeadingConfig.heading = localize('weather.weather');
    weatherHeadingConfig.icon = 'mdi:sun-thermometer-outline';
    weatherHeadingConfig.heading_style = 'title';
    result.cards.push(weatherHeadingConfig);

    // Add Weather card to the grid card.
    const ClockWeatherCard = (await import('../cards/ClockWeatherCard')).default;
    const weatherEntities = Registry.entities.filter((entity) => entity.entity_id.startsWith('weather.'));
    if (weatherEntities.length === 0) {
      logMessage(lvlError, 'No weather entities found for weather section!');
    } else {
      result.cards.push(
        ...weatherEntities.map((weather) => new ClockWeatherCard(weather).getCard()),
      );
    }

    if (!Registry.strategyOptions.home_view.weather_details.hidden) {
      // Add Expander card for weather details.
      const ExpanderCard = (await import('../cards/ExpanderCard')).default;
      let weatherDetailsExpanderConfig: ExpanderCardConfig = ExpanderCard.getDefaultConfig();
      weatherDetailsExpanderConfig.cards = [];
      weatherDetailsExpanderConfig.title = localize('weather.details');

      // Add Pollen details cards to the expander.
      if (Registry.strategyOptions.home_view.weather_details.grass_pollen_entity || 
          Registry.strategyOptions.home_view.weather_details.trees_pollen_entity ||
          Registry.strategyOptions.home_view.weather_details.weeds_pollen_entity) {
        const HorizontalStackCard = (await import('../cards/HorizontalStackCard')).default;
        let pollenStackCardConfig: HorizontalStackCardConfig = HorizontalStackCard.getDefaultConfig();
        const TileCard = (await import('../cards/TileCard')).default;
        if (Registry.strategyOptions.home_view.weather_details.grass_pollen_entity) {
          let grassPollenCard: TileCardConfig = TileCard.getDefaultConfig();
          grassPollenCard.entity = Registry.strategyOptions.home_view.weather_details.grass_pollen_entity;
          grassPollenCard.name = localize('weather.grass_pollen');
          grassPollenCard.features_position = 'bottom';
          grassPollenCard.vertical = true;
          pollenStackCardConfig.cards.push(grassPollenCard);
        }
        if (Registry.strategyOptions.home_view.weather_details.trees_pollen_entity) {
          let treesPollenCard: TileCardConfig = TileCard.getDefaultConfig();
          treesPollenCard.entity = Registry.strategyOptions.home_view.weather_details.trees_pollen_entity;
          treesPollenCard.name = localize('weather.trees_pollen');
          treesPollenCard.features_position = 'bottom';
          treesPollenCard.vertical = true;
          pollenStackCardConfig.cards.push(treesPollenCard);
        }
        if (Registry.strategyOptions.home_view.weather_details.weeds_pollen_entity) {
          let weedsPollenCard: TileCardConfig = TileCard.getDefaultConfig();
          weedsPollenCard.entity = Registry.strategyOptions.home_view.weather_details.weeds_pollen_entity;
          weedsPollenCard.name = localize('weather.weeds_pollen');
          weedsPollenCard.features_position = 'bottom';
          weedsPollenCard.vertical = true;
          pollenStackCardConfig.cards.push(weedsPollenCard);
        }
          weatherDetailsExpanderConfig.cards.push(pollenStackCardConfig);
      }

      // Add Weather Radar card to the expander.
      const WeatherRadarCard = (await import('../cards/WeatherRadarCard')).default;
      let weatherRadarCardConfig: WeatherRadarCardConfig = WeatherRadarCard.getDefaultConfig();
      weatherDetailsExpanderConfig.cards.push(weatherRadarCardConfig);

      result.cards.push(weatherDetailsExpanderConfig);
    }

    return result;
  }

  /**
   * Create a lights on section to include in the view.
   *
   * If the section is marked as hidden in the strategy option, then the section is not created.
   */
  private async createLightsOnSection(): Promise<GridCardConfig | undefined> {
    if (Registry.strategyOptions.home_view.hidden.includes('lightsOn')) { // The section is hidden.
      return;
    }

    const GridCard = (await import('../cards/GridCard')).default;
    let result: GridCardConfig = GridCard.getDefaultConfig();
    
    // Add Heading card to the grid card.
    const HeadingCard = (await import('../cards/HeadingCard')).default;
    let lightsOnHeading: HeadingCardConfig = HeadingCard.getDefaultConfig();
    lightsOnHeading.heading = localize('light.lights_on_right_now');
    lightsOnHeading.icon = 'mdi:lightbulb-group-outline';
    lightsOnHeading.heading_style = 'title';
    result.cards.push(lightsOnHeading);

    Registry.floors.forEach((floor) => {
      if (!floor.hidden) {
        // logMessage(lvlInfo, 'Found Floor: ', floor);
        // Create a card for each floor.
      }
    });
    return result;
  }
}

export default HomeView;
