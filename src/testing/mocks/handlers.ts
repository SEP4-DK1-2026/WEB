import { http, HttpResponse } from "msw"
import { BASE_URL } from "../../features/fetch-weather-data/api/weatherApi"
import {
  currentWeatherMock,
  historicalDataLast7Days,
  predictionDataNext7Days,
} from "../../utils/weatherMockSeries"

function parseQueryNumber(url: URL, key: string): number | undefined {
  const value = url.searchParams.get(key)
  if (value === null) {
    return undefined
  }

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

function normalizeUnixTimeToSeconds(value: number): number {
  return value > 1_000_000_000_000
    ? Math.floor(value / 1000)
    : Math.floor(value)
}

export const handlers = [
  http.get(`${BASE_URL}/current`, () => {
    return HttpResponse.json(currentWeatherMock)
  }),
  http.get(`${BASE_URL}/historical`, ({ request }) => {
    const url = new URL(request.url)
    const startDate = parseQueryNumber(url, "startDate")
    const endDate = parseQueryNumber(url, "endDate")

    if (startDate === undefined || endDate === undefined) {
      return HttpResponse.json(historicalDataLast7Days)
    }

    const startSeconds = normalizeUnixTimeToSeconds(startDate)
    const endSeconds = normalizeUnixTimeToSeconds(endDate)

    const filtered = historicalDataLast7Days.filter(
      (entry) => entry.unixTime >= startSeconds && entry.unixTime <= endSeconds,
    )

    return HttpResponse.json(filtered)
  }),
  http.get(`${BASE_URL}/predict`, ({ request }) => {
    const url = new URL(request.url)
    const hoursFromNow = parseQueryNumber(url, "hoursFromNow")

    if (hoursFromNow === undefined) {
      return HttpResponse.json(predictionDataNext7Days)
    }

    const boundedHours = Math.max(
      0,
      Math.min(Math.floor(hoursFromNow), predictionDataNext7Days.length),
    )

    return HttpResponse.json(predictionDataNext7Days.slice(0, boundedHours))
  }),
]
