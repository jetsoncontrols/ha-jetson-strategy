import { LovelaceCardConfig } from '../../homeassistant/data/lovelace/config/card';
import { ActionsSharedConfig } from '../shared/config/actions-config';
import { EntitySharedConfig } from '../shared/config/entity-config';

/**
 * Heading Card Configuration
 *
 * @property {string} [heading] - The main heading text to display on the card.
 * @property {'title' | 'subtitle'} [heading_style] - Style of the heading. 'title' for large text, 'subtitle' for smaller text. Defaults to 'title'.
 * @property {string} [color] - Custom color for the heading or icon. Accepts any valid CSS color value.
 * @property {boolean} [show_icon] - Whether to display the entity's icon. Defaults to true.
 * @property {boolean} [show_state] - Whether to display the entity's state. Defaults to false.
 * @property {'state' | 'name' | 'last_changed' | 'last_updated' | string | string[]} [state_content] - What to show as the state content. Can be 'state', 'name', 'last_changed', 'last_updated', a custom string, or an array of strings for multiple fields.
 *
 * @see https://www.home-assistant.io/dashboards/tile/
 */
export type HeadingCardConfig = LovelaceCardConfig & EntitySharedConfig & ActionsSharedConfig & {
    heading?: string;
    heading_style?: 'title' | 'subtitle';
    color?: string;
    show_icon?: boolean;
    show_state?: boolean;
    state_content?: 'state' | 'name' | 'last_changed' | 'last_updated' | string | string[];
  };
