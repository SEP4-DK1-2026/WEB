import { describe, expect, it } from "vitest"
import {
  formatWeatherTooltipLabel,
  formatWeatherTooltipValue,
  formatWeatherAxisTick,
  formatWeatherAxisTickWhole,
  weatherTooltipKeys,
} from "../../utils/chartTooltip"

describe("chartTooltip", () => {
  it("contains weather tooltip keys", () => {
    expect(weatherTooltipKeys).toContain("temperature")
    expect(weatherTooltipKeys).toContain("humidity")
    expect(weatherTooltipKeys).toContain("windSpeed")
  })

  it("formats tooltip label from date", () => {
    const result = formatWeatherTooltipLabel(new Date("2026-05-20T10:30:00"))

    expect(result).toContain("2026")
  })

  it("returns empty label for invalid value", () => {
    expect(formatWeatherTooltipLabel({})).toBe("")
    expect(formatWeatherTooltipLabel(null)).toBe("")
  })

  it("formats known tooltip value", () => {
    expect(formatWeatherTooltipValue(21.456, "temperature")).toEqual([
      "21.5°C",
      "Temperatur",
    ])
  })

  it("formats wind direction tooltip value", () => {
    expect(formatWeatherTooltipValue(90, "windDirection")).toEqual([
      "E",
      "Vindretning",
    ])
  })

  it("falls back for unknown tooltip key", () => {
    expect(formatWeatherTooltipValue(10, "unknown")).toEqual(["10", "unknown"])
  })

  it("falls back for non-numeric tooltip value", () => {
    expect(formatWeatherTooltipValue("abc", "temperature")).toEqual([
      "abc",
      "temperature",
    ])
  })

  it("formats axis tick", () => {
    expect(formatWeatherAxisTick(20.55, "temperature")).toBe("20.6°C")
  })

  it("formats whole axis tick", () => {
    expect(formatWeatherAxisTickWhole(20.55, "temperature")).toBe("21°C")
  })

  it("falls back for invalid axis tick", () => {
    expect(formatWeatherAxisTick("abc", "temperature")).toBe("abc")
    expect(formatWeatherAxisTickWhole("abc", "temperature")).toBe("abc")
  })
})