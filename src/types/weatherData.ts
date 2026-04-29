export type WeatherData = {
  date: Date // converted from unix time returned by API
  temperature: number // in Celsius
  humidity: number // in percentage
  windSpeed: number // in m/s
  windDirection: number // in degrees
  precipitation: number // in mm
  light: number // in lux
  leadTimeHours?: number // only for predictions, indicates hours between data recording and prediction being made
}
