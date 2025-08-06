import { LovelaceCardConfig } from '../../homeassistant/data/lovelace/config/card';

/**
 * Expander Card Configuration
 *
 * @property {string} [title] - Title (not displayed if using Title-Card).
 * @property {boolean} [clear] - Remove background. Default: false.
 * @property {boolean} [clear_children] - Remove backgrounds/borders of child cards. Default: false.
 * @property {boolean} [expanded] - Start expanded. Default: false.
 * @property {string} [expand_id] - Unique ID for JS LocalStorage to save expanded state.
 * @property {string} [button_background] - Background color of expand button. Default: 'transparent'.
 * @property {string} [gap] - Gap between child cards. Default: '0.6em'.
 * @property {string} [padding] - Padding of all card content. Default: '1em'.
 * @property {string} [child_padding] - Padding of child cards. Default: '0.5em'.
 * @property {LovelaceCardConfig} [title_card] - Replace title with card.
 * @property {string} [title_card_padding] - Padding of title-card. Default: '0px'.
 * @property {boolean} [title_card_button_overlay] - Overlay expand button over title-card. Default: false.
 * @property {string} [overlay_margin] - Margin from top right of expander button (if overlay). Default: '2em'.
 * @property {LovelaceCardConfig[]} [cards] - Child cards to show when expanded.
 */
export type ExpanderCardConfig = LovelaceCardConfig & {
  title?: string;
  clear?: boolean;
  clear_children?: boolean;
  expanded?: boolean;
  expand_id?: string;
  button_background?: string;
  gap?: string;
  padding?: string;
  child_padding?: string;
  title_card?: LovelaceCardConfig;
  title_card_padding?: string;
  title_card_button_overlay?: boolean;
  overlay_margin?: string;
  cards?: LovelaceCardConfig[];
};