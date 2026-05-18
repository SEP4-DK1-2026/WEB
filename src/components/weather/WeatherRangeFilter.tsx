import { useState } from "react"
import searchIcon from "../../assets/search-icon.svg"

type WeatherRangeFilterProps = {
  startDate: string
  endDate: string
  maxDate: string
  minDate?: string
  endDateMax?: string
  onStartDateChange: (value: string) => void
  onEndDateChange: (value: string) => void
  onSubmit: () => void
}

export default function WeatherRangeFilter({
  startDate,
  endDate,
  minDate,
  maxDate,
  endDateMax,
  onStartDateChange,
  onEndDateChange,
  onSubmit,
}: WeatherRangeFilterProps) {
  const isInvalidRange = startDate > endDate
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="rounded-xl border border-blue-200 bg-white px-3 py-4 shadow-sm sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg sm:text-2xl font-bold text-blue-900">
          Vælg periode
        </h2>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-blue-200 px-3 py-2 text-sm font-semibold text-blue-900 transition hover:bg-blue-50 md:hidden"
          aria-expanded={isOpen}
          aria-controls="weather-range-filter"
          aria-label={isOpen ? "Skjul filtre" : "Vis filtre"}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <img src={searchIcon} alt="" className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div
        id="weather-range-filter"
        className={`${isOpen ? "block" : "hidden"} mt-3 md:block sm:mt-4`}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <label className="flex flex-col gap-2 text-sm font-semibold text-gray-700">
            Fra dato
            <input
              type="date"
              value={startDate}
              min={minDate}
              max={maxDate}
              onChange={(event) => onStartDateChange(event.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-semibold text-gray-700">
            Til dato
            <input
              type="date"
              value={endDate}
              min={startDate}
              max={endDateMax ?? maxDate}
              onChange={(event) => onEndDateChange(event.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2"
            />
          </label>

          <button
            type="button"
            disabled={isInvalidRange}
            onClick={onSubmit}
            className="self-end rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            Vis data
          </button>
        </div>
      </div>
    </div>
  )
}
