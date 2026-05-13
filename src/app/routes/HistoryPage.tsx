import { useState } from "react"
import WeatherRangeFilter from "../../components/weather/WeatherRangeFilter"
import TemperatureLineChart from "../../components/weather/TemperatureLineChart"
import { useWeatherRangeData } from "../../hooks/useWeatherRangeData"

function toInputDate(date: Date) {
  return date.toISOString().split("T")[0]
}

function addDays(date: Date, days: number) {
  const copy = new Date(date)
  copy.setDate(copy.getDate() + days)
  return copy
}

function getHistoricalMaxEndDate(startDate: string) {
  const today = new Date()
  const maxFromStart = addDays(new Date(startDate), 28)

  return toInputDate(maxFromStart > today ? today : maxFromStart)
}

export default function HistoryPage() {
  const today = new Date()

  const defaultStartDate = addDays(today, -7)

  const [startDate, setStartDate] = useState(toInputDate(defaultStartDate))
  const [endDate, setEndDate] = useState(toInputDate(today))

  const { data, loading, error, loadRange } =
    useWeatherRangeData("historical")

  const maxEndDate = getHistoricalMaxEndDate(startDate)

  function handleStartDateChange(value: string) {
    setStartDate(value)

    const newMaxEndDate = getHistoricalMaxEndDate(value)

    if (endDate > newMaxEndDate) {
      setEndDate(newMaxEndDate)
    }

    if (endDate < value) {
      setEndDate(value)
    }
  }

  function handleEndDateChange(value: string) {
    setEndDate(value)
  }

  function handleSubmit() {
    void loadRange(new Date(startDate), new Date(endDate))
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-4xl font-bold text-gray-800">Historik</h1>
        <p className="text-gray-600">
          Se historiske vejrdata for en valgt periode.
        </p>
      </div>

      <WeatherRangeFilter
        startDate={startDate}
        endDate={endDate}
        maxDate={toInputDate(today)}
        endDateMax={maxEndDate}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        onSubmit={handleSubmit}
      />

      {loading && <p>Indlæser historiske data...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="rounded-xl border border-blue-200 bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-blue-900">
          Historisk temperatur
        </h2>

        <TemperatureLineChart data={data} />
      </div>
    </div>
  )
}