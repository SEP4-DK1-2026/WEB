import weatherMockData from "./weatherMockData.json"

export type WeatherDtoMock = {
  unixTime: number
  temperature: number
  humidity: number
  windSpeed: number
  windDirection: number
  precipitation: number
  light: number
  leadTimeHours?: number
}

export const currentWeatherMock: WeatherDtoMock = weatherMockData.currentWeather
export const historicalDataLast7Days: WeatherDtoMock[] =
  weatherMockData.historicalDataLast7Days

export const predictionDataNext7Days: WeatherDtoMock[] =
  weatherMockData.predictionDataNext7Days
