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
    title?: string;
    sun_entity?: string;
    temperature_sensor?: string;
    humidity_sensor?: string;
    weather_icon_type?: 'line' | 'fill';
    animated_icon?: boolean;
    forecast_rows?: number;
    locale?: string;
    time_pattern?: string;
    time_format?: 12 | 24;
    date_pattern?: string;
    hide_today_section?: boolean;
    hide_forecast_section?: boolean;
    show_humidity?: boolean;
    hide_clock?: boolean;
    hide_date?: boolean;
    hourly_forecast?: boolean;
    use_browser_time?: boolean;
    time_zone?: string | null;
    show_decimal?: boolean;
    apparent_sensor?: string;
    aqi_sensor?: string;
  };
  