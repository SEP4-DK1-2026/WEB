import { describe, expect, it } from "vitest"
import {
  formatWindDirection,
  formatWholeNumber,
  formatOneDecimal,
} from "../../utils/weatherFormatting"

describe("weatherFormatting", () => {
  it("formats wind direction from degrees to compass direction", () => {
    expect(formatWindDirection(0)).toBe("N")
    expect(formatWindDirection(45)).toBe("NE")
    expect(formatWindDirection(90)).toBe("E")
    expect(formatWindDirection(180)).toBe("S")
    expect(formatWindDirection(270)).toBe("W")
  })

  it("rounds whole numbers", () => {
    expect(formatWholeNumber(12.4)).toBe("12")
    expect(formatWholeNumber(12.5)).toBe("13")
  })

  it("formats one decimal", () => {
    expect(formatOneDecimal(12)).toBe("12.0")
    expect(formatOneDecimal(12.345)).toBe("12.3")
  })
})