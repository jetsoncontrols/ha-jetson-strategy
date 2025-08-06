import { LovelaceCardConfig } from '../../homeassistant/data/lovelace/config/card';

/**
 * Horizontal Stack Card Configuration
 *
 * @property {string} [title] - Optional. Title of the stack.
 * @property {LovelaceCardConfig[]} cards - Required. List of cards in the stack.
 */
export type HorizontalStackCardConfig = LovelaceCardConfig & {
  title?: string;
  cards: LovelaceCardConfig[];
};

