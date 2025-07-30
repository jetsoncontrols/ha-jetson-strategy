// noinspection JSUnusedGlobalSymbols Class is dynamically imported.

import { EntityRegistryEntry } from '../types/homeassistant/data/entity_registry';
import { VACUUM_COMMANDS, MushroomVacuumCardConfig } from '../types/lovelace/cards/mushroom/vacuum-card-config';
import AbstractCard from './AbstractCard';

/**
 * Vacuum Card Class
 *
 * Used to create a card configuration to control an entity of the vacuum domain.
 */
class VacuumCard extends AbstractCard {
  /** Returns the default configuration object for the card. */
  static getDefaultConfig(): MushroomVacuumCardConfig {
    return {
      type: 'custom:mushroom-vacuum-card',
      icon: undefined,
      icon_animation: true,
      commands: [...VACUUM_COMMANDS],
      tap_action: {
        action: 'more-info',
      },
    };
  }

  /**
   * Class constructor.
   *
   * @param {EntityRegistryEntry} entity The HASS entity to create a card configuration for.
   * @param {VacuumCardConfig} [customConfiguration] Custom card configuration.
   */
  constructor(entity: EntityRegistryEntry, customConfiguration?: MushroomVacuumCardConfig) {
    super(entity);

    this.configuration = { ...this.configuration, ...VacuumCard.getDefaultConfig(), ...customConfiguration };
  }
}

export default VacuumCard;
