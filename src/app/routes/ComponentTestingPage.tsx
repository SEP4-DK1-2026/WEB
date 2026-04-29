import { useEffect, useState } from "react"
import {
  getCurrentWeather,
  getLast24Hours,
  getPrediction,
} from "../../features/fetch-weather-data/api/weatherApi"
import TemperatureLineChart from "../../components/TemperatureLineChart"

export default function ComponentTestingPage() {
  const [next24HoursWeather, setNext24HoursWeather] = useState<Awaited<
    ReturnType<typeof getPrediction>
  > | null>(null)
  const [last24HoursWeather, setLast24HoursWeather] = useState<Awaited<
    ReturnType<typeof getLast24Hours>
  > | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPrediction = async () => {
      try {
        const data = await getPrediction(24)
        setNext24HoursWeather(data)
      } catch {
        setError("Failed to load weather prediction")
      }
    }

    const loadHistoricalData = async () => {
      try {
        const data = await getLast24Hours()
        setLast24HoursWeather(data)
      } catch {
        setError("Failed to load last 24 hours")
      }
    }

    loadPrediction()
    loadHistoricalData()
  }, [])

  return (
    <>
      <div className="grid grid-cols-1 gap-6 rounded-xl border border-blue-200 bg-white p-8 shadow-sm md:grid-cols-2">
        <TemperatureLineChart data={last24HoursWeather ?? []} />
        <TemperatureLineChart data={next24HoursWeather ?? []} includeYticks={false} />
      </div>
    </>
  )
}
