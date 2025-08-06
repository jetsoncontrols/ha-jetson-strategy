import { ExpanderCardConfig } from "../types/lovelace/cards/expander-card-config";
import AbstractCard from "./AbstractCard";

/**
 * Expander Card Class
 *
 * Used to create a card configuration for an Expander card.
 */
class ExpanderCard extends AbstractCard {
  /** Returns the default configuration object for the card. */
  static getDefaultConfig(): ExpanderCardConfig {
    return {
      type: "custom:expander-card",
    };
  }

  /**
   * Class constructor.
   *
   * @param {ExpanderCardConfig} [customConfiguration] Custom card configuration.
   */
  constructor(customConfiguration?: ExpanderCardConfig) {
      super();
      this.configuration = {      ...this.configuration,
      ...ExpanderCard.getDefaultConfig(),
      ...customConfiguration,
      };
  }
}

export default ExpanderCard;