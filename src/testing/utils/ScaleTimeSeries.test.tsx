import { describe, expect, it } from "vitest"
import { scaleTimeSeriesData } from "../../utils/scaleTimeSeries"

type TestPoint = {
  time: Date
  value: number
}

function createPoint(day: number, hour: number): TestPoint {
  return {
    time: new Date(2026, 0, day, hour),
    value: day * 100 + hour,
  }
}

describe("scaleTimeSeriesData", () => {
  it("returns empty array when no items are provided", () => {
    expect(scaleTimeSeriesData<TestPoint>([], item => item.time)).toEqual([])
  })

  it("sorts items by date", () => {
    const items = [createPoint(2, 0), createPoint(1, 0)]

    const result = scaleTimeSeriesData(items, item => item.time)

    expect(result[0].value).toBe(100)
    expect(result[1].value).toBe(200)
  })

  it("returns all items when amount is below max points", () => {
    const items = [createPoint(1, 0), createPoint(1, 1)]

    const result = scaleTimeSeriesData(items, item => item.time, 28)

    expect(result).toHaveLength(2)
  })

  it("reduces large datasets", () => {
    const items = Array.from({ length: 72 }, (_, index) =>
      createPoint(1 + Math.floor(index / 24), index % 24),
    )

    const result = scaleTimeSeriesData(items, item => item.time, 6)

    expect(result.length).toBeLessThan(items.length)
    expect(result.length).toBeGreaterThan(0)
  })
})