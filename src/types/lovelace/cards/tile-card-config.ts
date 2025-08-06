import { ActionConfig } from '../../homeassistant/data/lovelace/config/action';
import { LovelaceCardConfig } from '../../homeassistant/data/lovelace/config/card';
import { ActionsSharedConfig } from '../shared/config/actions-config';
import { AppearanceSharedConfig } from '../shared/config/appearance-config';
import { EntitySharedConfig } from '../shared/config/entity-config';

/**
 * Tile Card Configuration
 *
 * @property {string} [name] - Optional. Overwrites the entity name.
 * @property {string} [icon] - Optional. Overwrites the entity icon.
 * @property {string} [color] - Optional. Set the color when the entity is active. Default: state.
 * @property {boolean} [show_entity_picture=false] - Optional. If your entity has a picture, it will replace the icon.
 * @property {boolean} [vertical=false] - Optional. Displays the icon above the name and state.
 * @property {boolean} [hide_state=false] - Optional. Hide the entity state.
 * @property {string | string[]} [state_content] - Optional. Content to display for the state.
 * @property {object} [tap_action] - Optional. Action taken on card tap.
 * @property {object} [hold_action] - Optional. Action taken on tap-and-hold.
 * @property {object} [double_tap_action] - Optional. Action taken on double tap.
 * @property {object} [icon_tap_action] - Optional. Action taken on icon card tap.
 * @property {object} [icon_hold_action] - Optional. Action taken on icon tap-and-hold.
 * @property {object} [icon_double_tap_action] - Optional. Action taken on icon double tap.
 * @property {any[]} [features] - Optional. Additional widgets to control your entity.
 * @property {string} [features_position='bottom'] - Optional. Position of the features on the tile card.
 */
export type TileCardConfig = LovelaceCardConfig & ActionsSharedConfig & EntitySharedConfig & {
  name?: string;
  icon?: string;
  color?: string; // default: state
  show_entity_picture?: boolean; // default: false
  vertical?: boolean; // default: false
  hide_state?: boolean; // default: false
  state_content?: string | string[];
  icon_tap_action?: ActionConfig;
  icon_hold_action?: ActionConfig;
  icon_double_tap_action?: ActionConfig;
  features?: any[];
  features_position?: 'bottom' | 'inline'; // default: bottom
};
