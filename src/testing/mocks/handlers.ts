import { http, HttpResponse } from "msw"
import {
  generateHistoricalData,
  generatePredictionData,
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
    const hoursParam = url.searchParams.get("hoursFromNow")
    const parsedHours = hoursParam === null ? 168 : Number(hoursParam)
    const hoursFromNow = Number.isFinite(parsedHours) ? parsedHours : 168

    return HttpResponse.json(generateNextHoursPredictions(hoursFromNow))
  }),

  http.get("*/getPredictionNext24Hours", () => {
    const now = Math.floor(Date.now() / 1000)
    const targetTimestamp = now + 24 * 60 * 60
    const [prediction] = generatePredictionData(
      targetTimestamp,
      targetTimestamp,
      24,
    )

    return HttpResponse.json(prediction)
  }),

  http.get("*/getPredictionsLastAndNext24Hours", () => {
    const now = Math.floor(Date.now() / 1000)
    const startTimestamp = now - 24 * 60 * 60
    const endTimestamp = now + 24 * 60 * 60

    return HttpResponse.json(
      generatePredictionData(startTimestamp, endTimestamp, 0),
    )
  }),
]
