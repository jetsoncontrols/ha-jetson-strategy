import AbstractView from './AbstractView';
import { Registry } from '../Registry';
import { CustomHeaderCardConfig } from '../types/strategy/strategy-cards';
import { ViewConfig } from '../types/strategy/strategy-views';
import { localize } from '../utilities/localize';

class LightView extends AbstractView {
  /** The domain of the entities that the view is representing. */
  static readonly domain = 'light' as const;

  constructor(customConfiguration?: ViewConfig) {
    super();

    this.initializeViewConfig(LightView.getDefaultConfig(), customConfiguration, LightView.getViewHeaderCardConfig());
  }

  static getDefaultConfig(): ViewConfig {
    return {
      title: localize('light.lights'),
      path: 'lights',
      icon: 'mdi:lightbulb-group',
      subview: false,
      headerCardConfiguration: {
        iconOn: 'mdi:lightbulb',
        iconOff: 'mdi:lightbulb-off',
        onService: 'light.turn_on',
        offService: 'light.turn_off',
      },
    };
  }

  /** Returns the default configuration of the view's Header card. */
  static getViewHeaderCardConfig(): CustomHeaderCardConfig {
    return {
      title: localize('light.all_lights'),
      subtitle:
        `${Registry.getCountTemplate(LightView.domain, 'eq', 'on')} ${localize('light.lights')} ` +
        localize('generic.on'),
    };
  }
  // static async generate(hass: any): Promise<any[]> {
  //   // Implement logic to generate cards for lights
  //   // Example implementation:
  //   const allLightEntities = Object.keys(hass.states)
  //     .filter(entityId => entityId.startsWith('light.'))
  //     .map(entityId => hass.states[entityId]);

  //   const lightCards = allLightEntities.map(entity => ({
  //     type: 'tile',
  //     entity: entity.entity_id,
  //     name: entity.attributes.friendly_name || entity.entity_id,
  //     show_entity_picture: false,
  //     tap_action: {
  //       action: 'toggle'
  //     }
  //   }));

  //   const cards = lightCards.length > 0 ? lightCards : [
  //     {
  //       type: 'markdown',
  //       content: 'No light entities found yes'
  //     }
  //   ];

  //   return cards;
  // }
}

export default LightView;