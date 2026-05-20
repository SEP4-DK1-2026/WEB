import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import WeatherRangeFilter from "../../components/weather/WeatherRangeFilter"

describe("WeatherRangeFilter", () => {
  it("renders date inputs and submit button", () => {
    render(
      <WeatherRangeFilter
        startDate="2026-05-01"
        endDate="2026-05-10"
        minDate="2026-04-01"
        maxDate="2026-05-20"
        onStartDateChange={vi.fn()}
        onEndDateChange={vi.fn()}
        onSubmit={vi.fn()}
      />,
    )

    expect(screen.getByText("Vælg periode")).toBeInTheDocument()
    expect(screen.getByLabelText("Fra dato")).toBeInTheDocument()
    expect(screen.getByLabelText("Til dato")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Vis data" })).toBeInTheDocument()
  })

  it("calls change handlers when dates change", () => {
    const onStartDateChange = vi.fn()
    const onEndDateChange = vi.fn()

    render(
      <WeatherRangeFilter
        startDate="2026-05-01"
        endDate="2026-05-10"
        maxDate="2026-05-20"
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
        onSubmit={vi.fn()}
      />,
    )

    fireEvent.change(screen.getByLabelText("Fra dato"), {
      target: { value: "2026-05-02" },
    })

    fireEvent.change(screen.getByLabelText("Til dato"), {
      target: { value: "2026-05-11" },
    })

    expect(onStartDateChange).toHaveBeenCalledWith("2026-05-02")
    expect(onEndDateChange).toHaveBeenCalledWith("2026-05-11")
  })

  it("calls onSubmit when range is valid", () => {
    const onSubmit = vi.fn()

    render(
      <WeatherRangeFilter
        startDate="2026-05-01"
        endDate="2026-05-10"
        maxDate="2026-05-20"
        onStartDateChange={vi.fn()}
        onEndDateChange={vi.fn()}
        onSubmit={onSubmit}
      />,
    )

    fireEvent.click(screen.getByRole("button", { name: "Vis data" }))

    expect(onSubmit).toHaveBeenCalled()
  })

  it("disables submit button when start date is after end date", () => {
    render(
      <WeatherRangeFilter
        startDate="2026-05-10"
        endDate="2026-05-01"
        maxDate="2026-05-20"
        onStartDateChange={vi.fn()}
        onEndDateChange={vi.fn()}
        onSubmit={vi.fn()}
      />,
    )

    expect(screen.getByRole("button", { name: "Vis data" })).toBeDisabled()
  })
})