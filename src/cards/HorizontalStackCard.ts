import { HorizontalStackCardConfig } from "../types/lovelace/cards/horizontal-stack-card-config";
import AbstractCard from "./AbstractCard";

/**
 * Horizontal Stack Card Class
 *
 * Used to create a card configuration for a Horizontal Stack card.
 */
class HorizontalStackCard extends AbstractCard {
  /** Returns the default configuration object for the card. */
  static getDefaultConfig(): HorizontalStackCardConfig {
    return {
      type: 'horizontal-stack',
      cards: [],
    };
  }
    /**
     * Class constructor.
     *
     * @param {HorizontalStackCardConfig} [customConfiguration] Custom card configuration.
     */
    constructor(customConfiguration?: HorizontalStackCardConfig) {
      super();
      this.configuration = { ...this.configuration, ...HorizontalStackCard.getDefaultConfig(), ...customConfiguration };
    }
}

export default HorizontalStackCard;