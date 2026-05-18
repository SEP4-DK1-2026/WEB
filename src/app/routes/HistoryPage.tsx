import { useEffect, useMemo, useState } from "react"
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

function getHistoricalMaxEndDate(startDate: string) {
  const today = new Date()
  const maxFromStart = addDays(new Date(startDate), 28)

  return toInputDate(maxFromStart > today ? today : maxFromStart)
}

export default function HistoryPage() {
  const { initialStartDate, initialEndDate, maxHistoryDate } = useMemo(() => {
    const today = new Date()

    return {
      initialStartDate: addDays(today, -7),
      initialEndDate: today,
      maxHistoryDate: today,
    }
  }, [])

  const [startDate, setStartDate] = useState(() =>
    toInputDate(initialStartDate),
  )

  const [endDate, setEndDate] = useState(() => toInputDate(initialEndDate))

  const endDateMax = getHistoricalMaxEndDate(startDate)

  const selectedRangeLabel = `${formatDateLong(
    new Date(startDate),
  )} - ${formatDateLong(new Date(endDate))}`

  const { data, loading, error, loadRange } = useWeatherRangeData("historical")

  useEffect(() => {
    void loadRange(initialStartDate, initialEndDate)
  }, [loadRange, initialStartDate, initialEndDate])

  function handleStartDateChange(value: string) {
    const maxAllowedEndDate = getHistoricalMaxEndDate(value)

    setStartDate(value)

    setEndDate((previousEndDate) => {
      if (previousEndDate < value) {
        return value
      }

      if (previousEndDate > maxAllowedEndDate) {
        return maxAllowedEndDate
      }

      return previousEndDate
    })
  }

  function handleEndDateChange(value: string) {
    const maxAllowedEndDate = getHistoricalMaxEndDate(startDate)

    if (value < startDate) {
      setEndDate(startDate)
      return
    }

    if (value > maxAllowedEndDate) {
      setEndDate(maxAllowedEndDate)
      return
    }

    setEndDate(value)
  }

  function handleSubmit() {
    void loadRange(new Date(startDate), new Date(endDate))
  }

  return (
    <div className="space-y-8">
      <WeatherRangeFilter
        startDate={startDate}
        endDate={endDate}
        maxDate={toInputDate(maxHistoryDate)}
        endDateMax={endDateMax}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        onSubmit={handleSubmit}
      />

      {error && <p className="text-red-600">{error}</p>}

      <div className="rounded-xl border border-blue-200 bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-blue-900">
          {loading ? "Indlæser historiske data..." : `Historisk vejrdata for ${selectedRangeLabel}`}
        </h2>

        <HistoricalChart data={data} />
      </div>
    </div>
  )
}
