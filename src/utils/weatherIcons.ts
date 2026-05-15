import Sun from "../assets/weather-icons/animated/day.svg"
import Cloudy from "../assets/weather-icons/animated/cloudy-day-2.svg"
import Rain from "../assets/weather-icons/animated/rainy-4.svg"
import HeavyRain from "../assets/weather-icons/animated/rainy-6.svg"
import HeavyCloudy from "../assets/weather-icons/animated/cloudy.svg"
import SunAndRain from "../assets/weather-icons/animated/rainy-1.svg"
import Snow from "../assets/weather-icons/animated/snowy-6.svg"

type WeatherIconData = {
  temperature: number
  precipitation: number
  humidity: number
  light: number
}

export function getWeatherIcon(data: WeatherIconData) {
  if (data.temperature <= 0 && data.precipitation > 0) return Snow
  if (data.precipitation > 8) return HeavyRain
  if (data.precipitation > 2 && data.light > 15000) return SunAndRain
  if (data.precipitation > 1) return Rain
  if (data.humidity > 85 && data.light < 5000) return HeavyCloudy
  if (data.light > 25000) return Sun
  if (data.light < 8000) return HeavyCloudy

  return Cloudy
}