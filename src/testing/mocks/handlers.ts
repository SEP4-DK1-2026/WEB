import { http, HttpResponse } from "msw"
import { BASE_URL } from "../../features/fetch-weather-data/api/weatherApi"
import {
  getCurrentWeatherMock,
  generateHistoricalData,
  generateNextHoursPredictions,
  generatePredictionData,
} from "../../utils/weatherMockSeries"

/**
 * Parses a query parameter as a number.
 * Handles both milliseconds and seconds timestamps.
 */
function parseQueryNumber(url: URL, key: string): number | undefined {
  const value = url.searchParams.get(key)
  if (value === null) {
    return undefined
  }

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

/**
 * Normalizes a timestamp to seconds.
 * Handles both millisecond and second timestamps automatically.
 */
function normalizeUnixTimeToSeconds(value: number): number {
  return value > 1_000_000_000_000
    ? Math.floor(value / 1000)
    : Math.floor(value)
}

export const handlers = [
  // Get latest/current weather data
  http.get(`${BASE_URL}/getLatestWeather`, () => {
    return HttpResponse.json(getCurrentWeatherMock())
  }),

  // Get historical data within a date range
  http.get(`${BASE_URL}/historical`, ({ request }) => {
    const url = new URL(request.url)
    const startDate = parseQueryNumber(url, "startDate")
    const endDate = parseQueryNumber(url, "endDate")

    if (startDate === undefined || endDate === undefined) {
      return HttpResponse.json([])
    }

    const startSeconds = normalizeUnixTimeToSeconds(startDate)
    const endSeconds = normalizeUnixTimeToSeconds(endDate)

    const historicalData = generateHistoricalData(startSeconds, endSeconds)
    return HttpResponse.json(historicalData)
  }),

  // Get predictions for N hours from now
  http.get(`${BASE_URL}/getPredictionsNextHours`, ({ request }) => {
    const url = new URL(request.url)
    const hoursFromNow = parseQueryNumber(url, "hoursFromNow")

    if (hoursFromNow === undefined) {
      return HttpResponse.json([])
    }

    const predictions = generateNextHoursPredictions(hoursFromNow)
    return HttpResponse.json(predictions)
  }),

  // Get predictions within a date range
  http.get(`${BASE_URL}/getPredictionsInRange`, ({ request }) => {
    const url = new URL(request.url)
    const startDate = parseQueryNumber(url, "startDate")
    const endDate = parseQueryNumber(url, "endDate")

    if (startDate === undefined || endDate === undefined) {
      return HttpResponse.json([])
    }

    const startSeconds = normalizeUnixTimeToSeconds(startDate)
    const endSeconds = normalizeUnixTimeToSeconds(endDate)

    const predictions = generatePredictionData(startSeconds, endSeconds)
    return HttpResponse.json(predictions)
  }),
]
