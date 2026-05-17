import { NavLink } from "react-router-dom"
import { useWeatherModel } from "../../context/WeatherModelContext"

export default function Navbar() {
  const { modelName, setModelName } = useWeatherModel()

  const baseClass =
    "rounded-lg px-4 py-2 text-sm font-medium transition-colors"

  const activeClass = "bg-blue-600 text-white"
  const inactiveClass = "text-gray-700 hover:bg-blue-100 hover:text-blue-700"

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2">
        <span className="text-xl font-bold text-gray-800">
          Vejrstation
        </span>

        <nav className="flex items-center gap-3">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Hjem
          </NavLink>

          <NavLink
            to="/forecast"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Vejrudsigt
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Historik
          </NavLink>

          <select
            value={modelName}
            onChange={(event) =>
              setModelName(event.target.value as "DMI" | "VIA")
            }
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700"
          >
            <option value="DMI">DMI</option>
            <option value="VIA">VIA</option>
          </select>
        </nav>
      </div>
    </header>
  )
}