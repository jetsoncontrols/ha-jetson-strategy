import { HeadingCardConfig } from '../types/lovelace/cards/heading-card-config';
import AbstractCard from './AbstractCard';

/**
 * Heading Card Class
 *
 * Used to create a card configuration for a heading/title card.
 */
class HeadingCard extends AbstractCard {
  /** Returns the default configuration object for the card. */
  static getDefaultConfig(): HeadingCardConfig {
    return {
      type: 'heading',
      heading_style: 'title',
    };
  }

  /**
   * Class constructor.
   *
   * @param {any} entity The entity or data to create a heading card for.
   * @param {MushroomTitleCardConfig} [customConfiguration] Custom card configuration.
   */
  constructor(entity: any, customConfiguration?: HeadingCardConfig) {
    super(entity);
    this.configuration = { ...this.configuration, ...HeadingCard.getDefaultConfig(), ...customConfiguration };
  }
}

export default HeadingCard;
