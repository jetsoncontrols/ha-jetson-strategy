// noinspection JSUnusedGlobalSymbols Class is dynamically imported.

import { EntityRegistryEntry } from '../types/homeassistant/data/entity_registry';
import { WeatherRadarCardConfig } from '../types/lovelace/cards/weather-radar-card-config';
import AbstractCard from './AbstractCard';

/**
 * Weather Radar Card Class
 *
 * Used to create a card configuration to view weather radar data.
 */
class WeatherRadarCard extends AbstractCard {
  /** Returns the default configuration object for the card. */
  static getDefaultConfig(): WeatherRadarCardConfig {
    return {
        type: 'custom:weather-radar-card',
        data_source: 'RainViewer-DarkSky',
        zoom_level: 7,
        static_map: false,
        show_recenter: true,
        show_playback: false,
        show_marker: true,
        map_style: 'dark'
    };
  }

  /**
   * Class constructor.
   *
   * @param {EntityRegistryEntry} entity The HASS entity to create a card configuration for.
   * @param {EntityCardConfig} [customConfiguration] Custom card configuration.
   */
  constructor(entity: EntityRegistryEntry, customConfiguration?: WeatherRadarCardConfig) {
    super(entity);

    this.configuration = { ...this.configuration, ...WeatherRadarCard.getDefaultConfig(), ...customConfiguration };
  }
}

export default WeatherRadarCard;
