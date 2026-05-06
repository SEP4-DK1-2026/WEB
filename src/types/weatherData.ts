export type WeatherData = {
  date: Date // converted from unix time returned by API
  temperature: number // in Celsius
  humidity: number // in percentage
  windDirection: number // in degrees
  windSpeed: number // in m/s
  precipitation: number // in mm
  light: number // in lux
}

export type PredictionData = Omit<WeatherData, "date"> & {
  predictedDate: Date // only for predictions, indicates the date/time the prediction is for
  predictionOffset: number // only for predictions, indicates hours between data recording and prediction being made
}