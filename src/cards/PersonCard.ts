import { EntityRegistryEntry } from '../types/homeassistant/data/entity_registry';
import { MushroomPersonCardConfig } from '../types/lovelace/cards/mushroom/person-card-config';
import AbstractCard from './AbstractCard';

/**
 * Person Card Class
 *
 * Used to create a card configuration to control an entity of the person domain.
 */
class PersonCard extends AbstractCard {
  /** Returns the default configuration object for the card. */
  static getDefaultConfig(): MushroomPersonCardConfig {
    return {
      type: 'custom:mushroom-person-card',
      layout: 'vertical',
      primary_info: 'none',
      secondary_info: 'none',
      icon_type: 'entity-picture',
    };
  }

  /**
   * Class constructor.
   *
   * @param {EntityRegistryEntry} entity The HASS entity to create a card configuration for.
   * @param {PersonCardConfig} [customConfiguration] Custom card configuration.
   */
  constructor(entity: EntityRegistryEntry, customConfiguration?: MushroomPersonCardConfig) {
    super(entity);

    this.configuration = { ...this.configuration, ...PersonCard.getDefaultConfig(), ...customConfiguration };
  }
}

export default PersonCard;
