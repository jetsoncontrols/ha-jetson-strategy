import { LovelaceCardConfig } from '../../homeassistant/data/lovelace/config/card';

/**
 * Weather Radar Card Configuration
 *
 * @property {string} type - Must be 'custom:weather-radar-card'.
 * @property {string} [card_title] - The title to display on the card.
 * @property {string} [data_source] - Specifies which set of radar tiles to use. Default: 'RainViewer-Original'.
 * @property {'light'|'dark'} [map_style] - Specifies the style for the map. Options: 'light', 'dark'. Default: 'light'.
 * @property {number} [zoom_level] - The initial zoom level, 4-10. Default: 7.
 * @property {number} [center_latitude] - The initial center latitude of the map.
 * @property {number} [center_longitude] - The initial center longitude of the map.
 * @property {number} [marker_latitude] - The latitude for the home icon if enabled.
 * @property {number} [marker_longitude] - The longitude for the home icon if enabled.
 * @property {number} [frame_count] - The number of frames to use in the loop. Default: 10.
 * @property {number} [frame_delay] - The number of ms to show each frame. Default: 500.
 * @property {number} [restart_delay] - The additional ms to show the last frame. Default: 1000.
 * @property {boolean} [static_map] - Set to true to disable all panning and zooming. Default: false.
 * @property {boolean} [show_zoom] - Show the zoom controls in the top left corner. Default: false.
 * @property {boolean} [square_map] - Will keep the map square (not in panel mode). Default: false.
 * @property {boolean} [show_marker] - Show the home icon at the marker position. Default: false.
 * @property {boolean} [show_playback] - Show the playback controls in the bottom right toolbar. Default: false.
 * @property {boolean} [show_recenter] - Show the re-center control in the bottom right toolbar. Default: false.
 * @property {boolean} [show_scale] - Show a scale in the bottom left corner. Default: false.
 * @property {boolean} [show_range] - Show range rings around marker position. Default: false.
 * @property {boolean} [extra_labels] - Show more town labels (labels become smaller). Default: false.
 */
export type WeatherRadarCardConfig = LovelaceCardConfig & {
  card_title?: string;
  data_source?: string;
  map_style?: 'light' | 'dark';
  zoom_level?: number;
  center_latitude?: number;
  center_longitude?: number;
  marker_latitude?: number;
  marker_longitude?: number;
  frame_count?: number;
  frame_delay?: number;
  restart_delay?: number;
  static_map?: boolean;
  show_zoom?: boolean;
  square_map?: boolean;
  show_marker?: boolean;
  show_playback?: boolean;
  show_recenter?: boolean;
  show_scale?: boolean;
  show_range?: boolean;
  extra_labels?: boolean;
};
