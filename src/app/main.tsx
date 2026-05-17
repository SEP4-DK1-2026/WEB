import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App"
import { WeatherModelProvider } from "../context/WeatherModelContext"

createRoot(document.getElementById("root") as HTMLElement).render(
  <WeatherModelProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </WeatherModelProvider>,
)