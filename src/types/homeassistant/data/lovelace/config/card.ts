import { Condition } from '../../../panels/common/validate-condition';
import { LovelaceGridOptions } from '../../../panels/lovelace/types';

/**
 * Represents the configuration for a Lovelace card in Home Assistant.
 *
 * @property {number} [index] - The index of the card in the view.
 * @property {number} [view_index] - The index of the view the card belongs to.
 * @property {any} [view_layout] - The layout options for the card view.
 * @property {LovelaceGridOptions} [grid_options] - The grid options for the card layout.
 * @property {string} type - The type of the card.
 * @property {Condition[]} [visibility] - An optional array of visibility conditions for the card.
 * @property {any} [key] - Additional properties can be included in the configuration.
 */
export interface LovelaceCardConfig {
  index?: number;
  view_index?: number;
  view_layout?: any;
  grid_options?: LovelaceGridOptions;
  type: string;
  visibility?: Condition[];

  [key: string]: any;
}
