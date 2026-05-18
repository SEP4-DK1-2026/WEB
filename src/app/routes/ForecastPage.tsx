import { useEffect, useMemo, useState } from "react"
import WeatherRangeFilter from "../../components/weather/WeatherRangeFilter"
import PredictionChart from "../../components/weather/PredictionChart"
import { useWeatherRangeData } from "../../hooks/useWeatherRangeData"
import { formatDateLong } from "../../utils/dateFormat"

function toInputDate(date: Date) {
  return date.toISOString().split("T")[0]
}

function addDays(date: Date, days: number) {
  const copy = new Date(date)
  copy.setDate(copy.getDate() + days)
  return copy
}

export default function ForecastPage() {
  const {
    initialStartDate,
    initialEndDate,
    minPredictionDate,
    maxPredictionDate,
  } = useMemo(() => {
    const today = new Date()
    const maxDate = addDays(today, 7)

    return {
      initialStartDate: today,
      initialEndDate: maxDate,
      minPredictionDate: today,
      maxPredictionDate: maxDate,
    }
  }, [])

  const [startDate, setStartDate] = useState(() =>
    toInputDate(initialStartDate),
  )
  const [endDate, setEndDate] = useState(() => toInputDate(initialEndDate))

  const selectedRangeLabel = `${formatDateLong(new Date(startDate))} - ${formatDateLong(
    new Date(endDate),
  )}`

  const { predictionData, loading, error, loadRange } =
    useWeatherRangeData("prediction")

  useEffect(() => {
    void loadRange(initialStartDate, initialEndDate)
  }, [loadRange, initialStartDate, initialEndDate])

  function handleSubmit() {
    void loadRange(new Date(startDate), new Date(endDate))
  }

  return (
    <div className="space-y-8">
      <WeatherRangeFilter
        startDate={startDate}
        endDate={endDate}
        minDate={toInputDate(minPredictionDate)}
        maxDate={toInputDate(maxPredictionDate)}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onSubmit={handleSubmit}
      />

      {error && <p className="text-red-600">{error}</p>}

      <div className="rounded-xl border border-blue-200 bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-blue-900">
          {loading ? "Indlæser vejrudsigt..." : `Vejrudsigt for ${selectedRangeLabel}`}
        </h2>

        <PredictionChart data={predictionData} />
      </div>
    </div>
  )
}
