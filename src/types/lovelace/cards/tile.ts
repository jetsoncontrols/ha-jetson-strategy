import { LovelaceCardConfig } from '../../homeassistant/data/lovelace/config/card';
import { ActionsSharedConfig } from '../shared/config/actions-config';
import { AppearanceSharedConfig } from '../shared/config/appearance-config';
import { EntitySharedConfig } from '../shared/config/entity-config';

/**
 * Tile Card Configuration
 *
 * @property {string} [icon_color] - Custom color for the icon when the entity's state is active. Defaults to 'blue'.
 *
 * @see https://www.home-assistant.io/dashboards/tile/
 */
export type EntityCardConfig = LovelaceCardConfig &
  EntitySharedConfig &
  AppearanceSharedConfig &
  ActionsSharedConfig & {
    icon_color?: string;
  };
