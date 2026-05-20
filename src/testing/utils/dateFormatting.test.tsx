import { describe, expect, it } from "vitest"
import {
  formatTime,
  formatDate,
  formatDateLong,
  formatDateNoYear,
} from "../../utils/dateFormat"

describe("dateFormat", () => {
  const date = new Date("2026-05-20T10:30:00")

  it("formats time", () => {
    expect(formatTime(date)).toContain("10")
    expect(formatTime(date)).toContain("30")
  })

  it("formats date", () => {
    expect(formatDate(date)).toContain("2026")
  })

  it("formats long date", () => {
    expect(formatDateLong(date)).toContain("2026")
  })

  it("formats date without year", () => {
    expect(formatDateNoYear(date)).not.toContain("2026")
  })

  it("accepts string and number values", () => {
    expect(formatTime(date.toISOString())).toContain("10")
    expect(formatTime(date.getTime())).toContain("10")
  })
})