import { GridCardConfig } from '../types/lovelace/cards/grid-card-config';
import AbstractCard from './AbstractCard';

/**
 * Grid Card Class
 *
 * Used to create a card configuration for a Grid card.
 */
class GridCard extends AbstractCard {
  /** Returns the default configuration object for the card. */
  static getDefaultConfig(): GridCardConfig {
    return {
      type: 'grid',
      square: false,
      columns: 1,
      cards: [],
    };
  }

  /**
   * Class constructor.
   *
   * @param {any} entity The entity or data to create a heading card for.
   * @param {GridCardConfig} [customConfiguration] Custom card configuration.
   */
  constructor(customConfiguration?: GridCardConfig) {
    super();
    this.configuration = { ...this.configuration, ...GridCard.getDefaultConfig(), ...customConfiguration };
  }
}

export default GridCard;
