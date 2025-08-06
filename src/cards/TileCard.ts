// noinspection JSUnusedGlobalSymbols Class is dynamically imported.

import { EntityRegistryEntry } from '../types/homeassistant/data/entity_registry';
import { TileCardConfig } from '../types/lovelace/cards/tile-card-config';
import AbstractCard from './AbstractCard';

/**
 * Tile Card Class
 *
 * Used to create a card configuration to control an entity using a tile card.
 */
class TileCard extends AbstractCard {
  /** Returns the default configuration object for the card. */
  static getDefaultConfig(): TileCardConfig {
    return {
      type: 'tile',
      // tap_action: {
      //   action: 'toggle',
      // },
    };
  }

  /**
   * Class constructor.
   *
   * @param {EntityRegistryEntry} entity The HASS entity to create a card configuration for.
   * @param {EntityCardConfig} [customConfiguration] Custom card configuration.
   */
  constructor(entity: EntityRegistryEntry, customConfiguration?: TileCardConfig) {
    super(entity);

    this.configuration = { ...this.configuration, ...TileCard.getDefaultConfig(), ...customConfiguration };
  }
}

export default TileCard;
