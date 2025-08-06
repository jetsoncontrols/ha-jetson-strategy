import { LovelaceCardConfig } from '../../homeassistant/data/lovelace/config/card';

/**
 * Grid Card Configuration
 *
 * @property {string} [title] - Title of the grid card (optional).
 * @property {boolean} [square=true] - Whether the cards should be shown as square. Defaults to true.
 * @property {number} [columns=3] - Number of columns in the grid. Defaults to 3.
 * @property {Array<object>} cards - List of card configurations to display in the grid. Required.
 */
export type GridCardConfig = LovelaceCardConfig & {
  title?: string;
  square?: boolean;
  columns?: number;
  cards: LovelaceCardConfig[];
};
