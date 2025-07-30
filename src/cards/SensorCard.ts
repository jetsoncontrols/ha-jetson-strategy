import { EntityRegistryEntry } from '../types/homeassistant/data/entity_registry';
import { MushroomEntityCardConfig } from '../types/lovelace/cards/mushroom/entity-card-config';
import AbstractCard from './AbstractCard';

/**
 * Sensor Card Class
 *
 * Used to create a card for controlling an entity of the sensor domain.
 */
class SensorCard extends AbstractCard {
  /** Returns the default configuration object for the card. */
  static getDefaultConfig(): MushroomEntityCardConfig {
    return {
      type: 'custom:mushroom-entity-card',
      icon: 'mdi:information',
      animate: true,
      line_color: 'green',
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

    this.configuration = { ...this.configuration, ...SensorCard.getDefaultConfig(), ...customConfiguration };
  }
}

export default SensorCard;
