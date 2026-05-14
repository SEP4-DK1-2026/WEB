import { useState } from "react"
import WeatherRangeFilter from "../../components/weather/WeatherRangeFilter"
import { useWeatherRangeData } from "../../hooks/useWeatherRangeData"
import HistoricalChart from "../../components/weather/HistoricalChart"
import { formatDateLong } from "../../utils/dateFormat"

function toInputDate(date: Date) {
  return date.toISOString().split("T")[0]
}

function addDays(date: Date, days: number) {
  const copy = new Date(date)
  copy.setDate(copy.getDate() + days)
  return copy
}

export default function HistoryPage() {
  const today = new Date()

  const minHistoryDate = addDays(today, -24)
  const maxHistoryDate = today

  const [startDate, setStartDate] = useState(toInputDate(minHistoryDate))
  const [endDate, setEndDate] = useState(toInputDate(today))

  const selectedRangeLabel = `${formatDateLong(new Date(startDate))} - ${formatDateLong(
    new Date(endDate),
  )}`

  const { data, loading, error, loadRange } = useWeatherRangeData("historical")

  function handleSubmit() {
    void loadRange(new Date(startDate), new Date(endDate))
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-4xl font-bold text-gray-800">Historik</h1>
        <p className="text-gray-600">
          Se historiske vejrdata for en given periode
        </p>
      </div>

      <WeatherRangeFilter
        startDate={startDate}
        endDate={endDate}
        minDate={toInputDate(minHistoryDate)}
        maxDate={toInputDate(maxHistoryDate)}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onSubmit={handleSubmit}
      />

      {loading && <p>indlæser historiske data...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="rounded-xl border border-blue-200 bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-blue-900">
          {selectedRangeLabel}
        </h2>

        <HistoricalChart data={data} />
      </div>
    </div>
  )
}
