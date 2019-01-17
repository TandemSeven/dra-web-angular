import { Images } from './images.enum';

const iconMap = {
  bkn: Images.Cloudy,
  blizzard: Images.Snowflake,
  cold: Images.Snowflake,
  dust: Images.Tornado,
  few: Images.Cloudy,
  fog: Images.Sunset,
  fzra: Images.Sleet,
  haze: Images.Sunset,
  hot: Images.Sun,
  hurricane: Images.Tornado,
  ovc: Images.Cloudy,
  rain: Images.Rain,
  rain_fzra: Images.Snowflake,
  rain_showers: Images.RainHighClouds,
  rain_showers_hi: Images.RainLowClouds,
  rain_snow: Images.Sleet,
  rain_sleet: Images.Sleet,
  sct: Images.Cloudy,
  skc: Images.Clear,
  sleet: Images.Sleet,
  smoke: Images.Tornado,
  snow: Images.Snowing,
  snow_fzra: Images.Sleet,
  snow_sleet: Images.Sleet,
  tornado: Images.Tornado,
  tropical_storm: Images.Storm,
  tsra: Images.Storm,
  tsra_sct: Images.Storm,
  tsra_hi: Images.Storm,
  wind_bkn: Images.CloudyWindy,
  wind_ovc: Images.CloudyWindy,
  wind_sct: Images.PartlyCloudyWindy,
  wind_skc: Images.Clear,
  wind_few: Images.PartlyCloudyWindy
};


export function CreateIconMap () {
  return iconMap;
}
