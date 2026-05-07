import Sun from "../assets/sun.png"
import Cloudy from "../assets/cloudy.png"
import Rain from "../assets/rain.png"
import HeavyRain from "../assets/heavy_rain.png"
import HeavyCloudy from "../assets/heavy_cloudy.png"
import SunAndRain from "../assets/sun_and_rain.png"
import Snow from "../assets/snow.png"
import Haze from "../assets/haze.png"

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
  if (data.humidity > 85 && data.light < 5000) return Haze
  if (data.light > 25000) return Sun
  if (data.light < 8000) return HeavyCloudy

  return Cloudy
}