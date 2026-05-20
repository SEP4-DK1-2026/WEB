import { describe, expect, it, vi, beforeEach, afterEach } from "vitest"
import {
  getLatestWeather,
  getPredictionNext24Hours,
  getPredictions,
  getPredictionsInRange,
  getPredictionsInRangeUsingDates,
  getHistoricalDataInRange,
  getHistoricalDataInRangeUsingDates,
  getLast24Hours,
  getPredictionsLastAndNext24Hours,
} from "../../features/fetch-weather-data/api/weatherApi"

function mockFetch(data: unknown, ok = true, statusText = "OK") {
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok,
    statusText,
    json: vi.fn().mockResolvedValue(data),
  }) as unknown as typeof fetch
}

describe("weatherApi", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date("2026-05-20T10:00:00Z"))
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it("fetches latest weather and maps dto to WeatherData", async () => {
    mockFetch({
      time: 1_700_000_000,
      temperature: 20,
      humidity: 120,
      windSpeed: 5,
      windDirection: 90,
      precipitation: 1,
      light: 1000,
    })

    const result = await getLatestWeather()

    expect(result.date).toEqual(new Date(1_700_000_000 * 1000))
    expect(result.humidity).toBe(100)
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/getLatestWeather"))
  })

  it("fetches prediction next 24 hours with model name", async () => {
    mockFetch({
      predictedTime: 1_700_000_000,
      predictionOffset: 24,
      temperature: 20,
      humidity: 120,
      windSpeed: 5,
      windDirection: 90,
      precipitation: -1,
      light: 1000,
    })

    const result = await getPredictionNext24Hours("VIA")

    expect(result.predictedDate).toEqual(new Date(1_700_000_000 * 1000))
    expect(result.humidity).toBe(100)
    expect(result.precipitation).toBe(0)
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/getPredictionNext24Hours?modelName=VIA"),
    )
  })

  it("fetches predictions for next hours", async () => {
    mockFetch([
      {
        predictedTime: 1_700_000_000,
        predictionOffset: 1,
        temperature: 20,
        humidity: 80,
        windSpeed: 5,
        windDirection: 90,
        precipitation: 1,
        light: 1000,
      },
    ])

    const result = await getPredictions(12, "DMI")

    expect(result).toHaveLength(1)
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(
        "/getPredictionsNextHours?hoursFromNow=12&modelName=DMI",
      ),
    )
  })

  it("fetches predictions in range", async () => {
    mockFetch([])

    await getPredictionsInRange(100, 200, "VIA")

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(
        "/getPredictionsInRange?startTime=100&endTime=200&modelName=VIA",
      ),
    )
  })

  it("converts dates to unix seconds for prediction range", async () => {
    mockFetch([])

    await getPredictionsInRangeUsingDates(
      new Date("2026-05-20T10:00:00Z"),
      new Date("2026-05-20T12:00:00Z"),
      "DMI",
    )

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("startTime=1779271200&endTime=1779278400"),
    )
  })

  it("fetches historical data in range", async () => {
    mockFetch([])

    await getHistoricalDataInRange(100, 200)

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/getWeatherInRange?startTime=100&endTime=200"),
    )
  })

  it("converts dates to unix seconds for historical range", async () => {
    mockFetch([])

    await getHistoricalDataInRangeUsingDates(
      new Date("2026-05-20T10:00:00Z"),
      new Date("2026-05-20T12:00:00Z"),
    )

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("startTime=1779271200&endTime=1779278400"),
    )
  })

  it("fetches last 24 hours based on current time", async () => {
    mockFetch([])

    await getLast24Hours()

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("startTime=1779184800&endTime=1779271200"),
    )
  })

  it("fetches predictions last and next 24 hours", async () => {
    mockFetch([])

    await getPredictionsLastAndNext24Hours("VIA")

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(
        "/getPredictionsLastAndNext24Hours?modelName=VIA",
      ),
    )
  })

  it("throws error when latest weather request fails", async () => {
    mockFetch({}, false, "Internal Server Error")

    await expect(getLatestWeather()).rejects.toThrow(
      "Failed to fetch latest weather data: Internal Server Error",
    )
  })

  it("throws error when prediction request fails", async () => {
    mockFetch({}, false, "Internal Server Error")

    await expect(getPredictionNext24Hours()).rejects.toThrow(
      "Failed to fetch weather prediction: Internal Server Error",
    )
  })

  it("throws error when historical range request fails", async () => {
    mockFetch({}, false, "Internal Server Error")

    await expect(getHistoricalDataInRange(100, 200)).rejects.toThrow(
      "Failed to fetch historical weather data: Internal Server Error",
    )
  })
})