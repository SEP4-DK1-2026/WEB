import { useState } from "react";
import WeatherRangeFilter from "../../components/weather/WeatherRangeFilter";
import TemperatureLineChart from "../../components/weather/TemperatureLineChart";
import { useWeatherRangeData } from "../../hooks/useWeatherRangeData";

function toInputDate(date: Date) {
  return date.toISOString().split("T")[0];
}

function addDays(date: Date, days: number) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

export default function ForecastPage() {
  const today = new Date();

  const minPredictionDate = today;
  const maxPredictionDate = addDays(today, 7);

  const tomorrow = addDays(today, 1);

  const [startDate, setStartDate] = useState(toInputDate(today));
  const [endDate, setEndDate] = useState(toInputDate(tomorrow));

  const { data, loading, error, loadRange } = useWeatherRangeData("prediction");

  function handleSubmit() {
    void loadRange(new Date(startDate), new Date(endDate));
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-4xl font-bold text-gray-800">Vejrudsigt</h1>
        <p className="text-gray-600">
          Se forudsagt vejrdata for en valgt periode.
        </p>
      </div>

      <WeatherRangeFilter
        startDate={startDate}
        endDate={endDate}
        minDate={toInputDate(minPredictionDate)}
        maxDate={toInputDate(maxPredictionDate)}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onSubmit={handleSubmit}
      />

      {loading && <p>Indlæser forudsigelser...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="rounded-xl border border-blue-200 bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-blue-900">
          Forudsagt temperatur
        </h2>

        <TemperatureLineChart data={data} />
      </div>
    </div>
  );
}
