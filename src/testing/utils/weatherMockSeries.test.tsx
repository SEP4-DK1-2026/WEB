import { describe, expect, it, vi } from "vitest"
import {
  generateHistoricalData,
  generatePredictionData,
  generateNextHoursPredictions,
  getCurrentWeatherMock,
} from "../../utils/weatherMockSeries"

describe("weatherMockSeries", () => {
  it("generates historical data every hour", () => {
    const start = 1_700_000_000
    const end = start + 2 * 3600

    const result = generateHistoricalData(start, end)

    expect(result).toHaveLength(3)
    expect(result[0].time).toBe(start)
    expect(result[2].time).toBe(end)
  })

  it("generates prediction data every hour", () => {
    const start = 1_700_000_000
    const end = start + 2 * 3600

    const result = generatePredictionData(start, end, 5)

    expect(result).toHaveLength(3)
    expect(result[0].predictedTime).toBe(start)
    expect(result[0].predictionOffset).toBe(5)
  })

  it("generates next hour predictions", () => {
    vi.setSystemTime(new Date("2026-05-20T10:00:00Z"))

    const result = generateNextHoursPredictions(3)

    expect(result).toHaveLength(3)
    expect(result[0].predictionOffset).toBe(0)
    expect(result[1].predictionOffset).toBe(1)

    vi.useRealTimers()
  })

  it("returns no predictions when hours is negative", () => {
    expect(generateNextHoursPredictions(-5)).toEqual([])
  })

  it("gets current weather mock", () => {
    vi.setSystemTime(new Date("2026-05-20T10:00:00Z"))

    const result = getCurrentWeatherMock()

    expect(result.time).toBe(Math.floor(Date.now() / 1000))
    expect(result.temperature).toBeGreaterThanOrEqual(5)
    expect(result.temperature).toBeLessThanOrEqual(25)

    vi.useRealTimers()
  })
})