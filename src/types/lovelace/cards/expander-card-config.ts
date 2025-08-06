import { LovelaceCardConfig } from '../../homeassistant/data/lovelace/config/card';

/**
 * Expander Card Configuration
 *
 * @property {string} [title='Expander'] - Title of the expander card (not displayed if using title-card).
 * @property {boolean} [clear=false] - Remove background.
 * @property {boolean} [clearChildren=false] - Remove backgrounds/borders of child cards.
 * @property {boolean} [expanded=false] - Start expanded.
 * @property {string} [expandId] - Unique ID for JS LocalStorage to save expanded state.
 * @property {string} [buttonBackground='transparent'] - Background color of expand button.
 * @property {string} [gap='0.6em'] - Gap between child cards.
 * @property {string} [padding='1em'] - Padding of all card content.
 * @property {string} [childPadding='0.5em'] - Padding of child cards.
 * @property {LovelaceCardConfig} [titleCard] - Replace title with card.
 * @property {string} [titleCardPadding='0px'] - Padding of title-card.
 * @property {boolean} [titleCardButtonOverlay=false] - Overlay expand button over title-card.
 * @property {string} [overlayMargin='2em'] - Margin from top right of expander button (if overlay).
 * @property {LovelaceCardConfig[]} [cards] - Child cards to show when expanded.
 */
export type ExpanderCardConfig = LovelaceCardConfig & {
  title?: string; // default: 'Expander'
  clear?: boolean; // default: false
  clearChildren?: boolean; // default: false
  expanded?: boolean; // default: false
  expandId?: string;
  buttonBackground?: string; // default: 'transparent'
  gap?: string; // default: '0.6em'
  padding?: string; // default: '1em'
  childPadding?: string; // default: '0.5em'
  titleCard?: LovelaceCardConfig;
  titleCardPadding?: string; // default: '0px'
  titleCardButtonOverlay?: boolean; // default: false
  overlayMargin?: string; // default: '2em'
  cards?: LovelaceCardConfig[];
};