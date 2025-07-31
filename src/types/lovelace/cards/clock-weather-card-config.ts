import { LovelaceCardConfig } from '../../homeassistant/data/lovelace/config/card';
import { AppearanceSharedConfig } from '../shared/config/appearance-config';
import { EntitySharedConfig } from '../shared/config/entity-config';

/**
 * Clock Weather Card Configuration
 *
 * @property {string} [sun_entity] - Entity ID of the sun entity to use for sunrise/sunset times.
 *
 * @see https://github.com/pkissling/clock-weather-card
 */
export type ClockWeatherCardConfig = LovelaceCardConfig &
  EntitySharedConfig &
  AppearanceSharedConfig & {
    sun_entity?: string;
    forecast_rows?: number;
  };
