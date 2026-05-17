import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react"

type WeatherModel = "DMI" | "VIA"

type WeatherModelContextValue = {
  modelName: WeatherModel
  setModelName: (modelName: WeatherModel) => void
}

const WeatherModelContext = createContext<WeatherModelContextValue | null>(null)

export function WeatherModelProvider({ children }: { children: ReactNode }) {
  const [modelName, setModelNameState] = useState<WeatherModel>(() => {
    const savedModelName = localStorage.getItem("weatherModel")

    if (savedModelName === "DMI" || savedModelName === "VIA") {
      return savedModelName
    }

    return "DMI"
  })

  function setModelName(modelName: WeatherModel) {
    localStorage.setItem("weatherModel", modelName)
    setModelNameState(modelName)
  }

  return (
    <WeatherModelContext.Provider value={{ modelName, setModelName }}>
      {children}
    </WeatherModelContext.Provider>
  )
}

export function useWeatherModel() {
  const context = useContext(WeatherModelContext)

  if (!context) {
    throw new Error("useWeatherModel must be used inside WeatherModelProvider")
  }

  return context
}