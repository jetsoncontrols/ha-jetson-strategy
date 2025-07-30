// noinspection JSUnusedGlobalSymbols Class is dynamically imported.

import { EntityRegistryEntry } from '../types/homeassistant/data/entity_registry';
import { MushroomCoverCardConfig } from '../types/lovelace/cards/mushroom/cover-card-config';
import AbstractCard from './AbstractCard';

/**
 * Cover Card Class
 *
 * Used to create a card configuration to control an entity of the cover domain.
 */
class CoverCard extends AbstractCard {
  /** Returns the default configuration object for the card. */
  static getDefaultConfig(): MushroomCoverCardConfig {
    return {
      type: 'custom:mushroom-cover-card',
      icon: undefined,
      show_buttons_control: true,
      show_position_control: true,
      show_tilt_position_control: true,
    };
  }

  /**
   * Class constructor.
   *
   * @param {EntityRegistryEntry} entity The HASS entity to create a card configuration for.
   * @param {CoverCardConfig} [customConfiguration] Custom card configuration.
   */
  constructor(entity: EntityRegistryEntry, customConfiguration?: MushroomCoverCardConfig) {
    super(entity);

    this.configuration = { ...this.configuration, ...CoverCard.getDefaultConfig(), ...customConfiguration };
  }
}

export default CoverCard;
