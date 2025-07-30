// noinspection JSUnusedGlobalSymbols Class is dynamically imported.

import { EntityRegistryEntry } from '../types/homeassistant/data/entity_registry';
import { MushroomLightCardConfig } from '../types/lovelace/cards/mushroom/light-card-config';
import { isCallServiceActionConfig } from '../types/strategy/strategy-generics';
import AbstractCard from './AbstractCard';

/**
 * Light Card Class
 *
 * Used to create a card configuration to control an entity of the light domain.
 */
class LightCard extends AbstractCard {
  /** Returns the default configuration object for the card. */
  static getDefaultConfig(): MushroomLightCardConfig {
    return {
      type: 'custom:mushroom-light-card',
      icon: undefined,
      show_brightness_control: true,
      show_color_control: true,
      show_color_temp_control: true,
      use_light_color: true,
      double_tap_action: {
        action: 'call-service',
        perform_action: 'light.turn_on',
        target: {
          entity_id: undefined,
        },
        data: {
          rgb_color: [255, 255, 255],
        },
      },
    };
  }

  /**
   * Class constructor.
   *
   * @param {EntityRegistryEntry} entity The HASS entity to create a card configuration for.
   * @param {LightCardConfig} [customConfiguration] Custom card configuration.
   */
  constructor(entity: EntityRegistryEntry, customConfiguration?: MushroomLightCardConfig) {
    super(entity);

    const configuration = LightCard.getDefaultConfig();

    if (isCallServiceActionConfig(configuration.double_tap_action)) {
      configuration.double_tap_action.target = { entity_id: entity.entity_id };
    }

    this.configuration = { ...this.configuration, ...configuration, ...customConfiguration };
  }
}

export default LightCard;
