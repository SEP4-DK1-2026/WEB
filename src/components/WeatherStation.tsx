import { useEffect, useState } from "react"
import {
  getCurrentWeather,
  getPrediction24Hours,
} from "../features/fetch-weather-data/api/weatherApi"
import type { PredictionData, WeatherData } from "../types/weatherData"

/* Weather icons */
import Sun from "../assets/Sun.png"
import Cloudy from "../assets/Cloudy.png"
import Rain from "../assets/Rain.png"
import HeavyRain from "../assets/Heavy rain.png"
import HeavyCloudy from "../assets/Heavy cloudy.png"
import SunAndRain from "../assets/Sun and rain.png"
import Snow from "../assets/Snow.png"
import Haze from "../assets/Haze.png"

type WeatherMetricData = Omit<WeatherData, "date">

interface WeatherBoxProps {
  title: string
  data: WeatherMetricData
  displayDate: Date
}

function formatWindDirection(degrees: number) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
  return directions[Math.round(degrees / 45) % 8]
}

function formatDate(date: Date) {
  return date.toLocaleString("da-DK", {
    dateStyle: "short",
    timeStyle: "short",
  })
}

function formatWholeNumber(value: number) {
  return Math.round(value).toString()
}

function formatOneDecimal(value: number) {
  return value.toFixed(1)
}

function getWeatherIcon(data: WeatherMetricData) {
  if (data.temperature <= 0 && data.precipitation > 0) {
    return Snow
  }

  if (data.precipitation > 8) {
    return HeavyRain
  }

  if (data.precipitation > 2 && data.light > 15000) {
    return SunAndRain
  }

  if (data.precipitation > 1) {
    return Rain
  }

  if (data.humidity > 85 && data.light < 5000) {
    return Haze
  }

  if (data.light > 25000) {
    return Sun
  }

  if (data.light < 8000) {
    return HeavyCloudy
  }

  return Cloudy
}

const WeatherBox = ({ title, data, displayDate }: WeatherBoxProps) => {
  const weatherIcon = getWeatherIcon(data)

  return (
    <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-8 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">{title}</h2>
          <p className="mt-2 text-sm text-gray-600">
            {formatDate(displayDate)}
          </p>
        </div>

        <img
          src={weatherIcon}
          alt="Weather icon"
          className="h-20 w-20 object-contain"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-lg bg-white p-4 shadow-md">
          <p className="text-sm font-semibold text-gray-600">Temperatur</p>
          <p className="mt-2 text-3xl font-bold text-orange-500">
            {formatWholeNumber(data.temperature)}°C
          </p>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-md">
          <p className="text-sm font-semibold text-gray-600">Luftfugtighed</p>
          <p className="mt-2 text-3xl font-bold text-blue-500">
            {formatWholeNumber(data.humidity)}%
          </p>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-md">
          <p className="text-sm font-semibold text-gray-600">Nedbør</p>
          <p className="mt-2 text-3xl font-bold text-cyan-500">
            {formatOneDecimal(data.precipitation)} mm
          </p>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-md">
          <p className="text-sm font-semibold text-gray-600">Vindhastighed</p>
          <p className="mt-2 text-3xl font-bold text-indigo-500">
            {formatOneDecimal(data.windSpeed)} m/s
          </p>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-md">
          <p className="text-sm font-semibold text-gray-600">Vindretning</p>

          <div className="mt-2 flex items-center gap-3">
            <p className="text-3xl font-bold text-purple-500">
              {formatWindDirection(data.windDirection)}
            </p>

            <span
              className="text-3xl transition-transform"
              style={{
                display: "inline-block",
                transform: `rotate(${Math.round(data.windDirection)}deg)`,
              }}
            >
              ➜
            </span>
          </div>
        </div>
        <div className="rounded-lg bg-white p-4 shadow-md">
          <p className="text-sm font-semibold text-gray-600">Lys</p>
          <p className="mt-2 text-3xl font-bold text-yellow-500">
            {formatWholeNumber(data.light)} lx
          </p>
        </div>
      </div>
    </div>
  )
}

export default function WeatherStation() {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null)
  const [predictedWeather, setPredictedWeather] =
    useState<PredictionData | null>(null)

  useEffect(() => {
    async function loadWeather() {
      const [currentData, predictionData] = await Promise.all([
        getCurrentWeather(),
        getPrediction24Hours(),
      ])

      setCurrentWeather(currentData)
      setPredictedWeather(predictionData)
    }

    void loadWeather()
  }, [])

  if (!currentWeather || !predictedWeather) {
    return <p className="text-gray-600">Indlæser vejrdata...</p>
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-gray-800">Vejrudsigt</h1>
        <p className="text-gray-600">Her ses nuværende og fremtidig vejr</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <WeatherBox
          title="Nuværende vejr"
          data={currentWeather}
          displayDate={currentWeather.date}
        />
        <WeatherBox
          title="Forventet vejr"
          data={predictedWeather}
          displayDate={predictedWeather.predictedDate}
        />
      </div>
    </div>
  )
}
