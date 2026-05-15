import Sun from "../assets/weather-icons/animated/day.svg"
import Night from "../assets/weather-icons/animated/night.svg"
import CloudyDay from "../assets/weather-icons/animated/cloudy-day-2.svg"
import CloudyNight from "../assets/weather-icons/animated/cloudy-night-2.svg"
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
  const isNight = 0 < data.light && data.light < 100 // 0 indicates no data, default to day
  const isFreezing = data.temperature <= 0
  const isHeavyRain = data.precipitation > 8
  const isRain = data.precipitation > 1
  const isSunnyShower = data.precipitation > 2 && data.light > 15000
  const isHumid = data.humidity > 85
  const isDimDay = data.light < 8000
  const isBrightDay = data.light > 25000

  if (isFreezing && data.precipitation > 0) return Snow
  if (isHeavyRain) return HeavyRain

  if (isRain) {
    if (!isNight && isSunnyShower) return SunAndRain
    return Rain
  }

  if (isNight) return isHumid ? CloudyNight : Night
  if (isHumid || isDimDay) return HeavyCloudy
  if (isBrightDay) return Sun

  return CloudyDay
}
