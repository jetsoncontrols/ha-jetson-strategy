// noinspection JSUnusedGlobalSymbols Class is dynamically imported.

import { EntityRegistryEntry } from '../types/homeassistant/data/entity_registry';
import { ClockWeatherCardConfig } from '../types/lovelace/cards/clock-weather-card-config';
import AbstractCard from './AbstractCard';

/**
 * Clock Weather Card Class
 *
 * Used to create a card configuration to view weather with a clock weather card.
 */
class ClockWeatherCard extends AbstractCard {
  /** Returns the default configuration object for the card. */
  static getDefaultConfig(): ClockWeatherCardConfig {
    return {
      type: 'custom:clock-weather-card',
      icon: undefined,
      forecast_rows: 8,
      show_humidity: true,
      hide_date: true,
    };
  }

  /**
   * Class constructor.
   *
   * @param {EntityRegistryEntry} entity The HASS entity to create a card configuration for.
   * @param {EntityCardConfig} [customConfiguration] Custom card configuration.
   */
  constructor(entity: EntityRegistryEntry, customConfiguration?: ClockWeatherCardConfig) {
    super(entity);

    this.configuration = { ...this.configuration, ...ClockWeatherCard.getDefaultConfig(), ...customConfiguration };
  }
}

export default ClockWeatherCard;
