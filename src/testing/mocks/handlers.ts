import { http, HttpResponse } from "msw"
import { BASE_URL } from "../../features/fetch-weather-data/api/weatherApi"

const currentWeatherMock = {
  unixTime: 1776855000,
  temperature: 16.8,
  humidity: 64,
  windSpeed: 4.2,
  windDirection: 235,
  precipitation: 0,
  light: 18500,
}

export const handlers = [
  http.get(`${BASE_URL}/current`, () => {
    return HttpResponse.json(currentWeatherMock)
  }),
]
