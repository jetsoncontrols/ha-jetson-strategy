// noinspection JSUnusedGlobalSymbols Class is dynamically imported.

import { EntityRegistryEntry } from '../types/homeassistant/data/entity_registry';
import { MushroomEntityCardConfig } from '../types/lovelace/cards/mushroom/entity-card-config';
import AbstractCard from './AbstractCard';

/**
 * Switch Card Class
 *
 * Used to create a card configuration to control an entity of the switch domain.
 */
class SwitchCard extends AbstractCard {
  /** Returns the default configuration object for the card. */
  static getDefaultConfig(): MushroomEntityCardConfig {
    return {
      type: 'custom:mushroom-entity-card',
      icon: undefined,
      tap_action: {
        action: 'toggle',
      },
    };
  }

  /**
   * Class constructor.
   *
   * @param {EntityRegistryEntry} entity The HASS entity to create a card configuration for.
   * @param {EntityCardConfig} [customConfiguration] Custom card configuration.
   */
  constructor(entity: EntityRegistryEntry, customConfiguration?: MushroomEntityCardConfig) {
    super(entity);

    this.configuration = { ...this.configuration, ...SwitchCard.getDefaultConfig(), ...customConfiguration };
  }
}

export default SwitchCard;
