import { http, HttpResponse } from "msw"
import {
  generateHistoricalData,
  generateNextHoursPredictions,
  getCurrentWeatherMock,
} from "../../utils/weatherMockSeries"

export const handlers = [
  http.get("*/getLatestWeather", () => {
    return HttpResponse.json(getCurrentWeatherMock())
  }),

  http.get("*/getWeatherInRange", ({ request }) => {
    const url = new URL(request.url)

    const startTime = Number(url.searchParams.get("startTime"))
    const endTime = Number(url.searchParams.get("endTime"))

    if (!Number.isFinite(startTime) || !Number.isFinite(endTime)) {
      const now = Math.floor(Date.now() / 1000)
      return HttpResponse.json(generateHistoricalData(now - 24 * 60 * 60, now))
    }

    return HttpResponse.json(generateHistoricalData(startTime, endTime))
  }),

  http.get("*/getPredictionsNextHours", ({ request }) => {
    const url = new URL(request.url)
    const hoursFromNow = Number(url.searchParams.get("hoursFromNow") ?? 24)

    return HttpResponse.json(generateNextHoursPredictions(hoursFromNow))
  }),

  http.get("*/getPredictionsInRange", ({ request }) => {
    const url = new URL(request.url)

    const startTime = Number(url.searchParams.get("startTime"))
    const endTime = Number(url.searchParams.get("endTime"))

    if (!Number.isFinite(startTime) || !Number.isFinite(endTime)) {
      const now = Math.floor(Date.now() / 1000)
      return HttpResponse.json(
        generateNextHoursPredictions(24),
      )
    }

    const hoursFromNow = Math.max(
      0,
      Math.ceil((endTime - startTime) / 3600),
    )

    return HttpResponse.json(generateNextHoursPredictions(hoursFromNow))
  }),
]