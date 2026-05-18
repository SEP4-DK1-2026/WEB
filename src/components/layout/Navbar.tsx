import { NavLink } from "react-router-dom"
import { useWeatherModel } from "../../context/WeatherModelContext"

export default function Navbar() {
  const { modelName, setModelName } = useWeatherModel()

  const baseClass = "rounded-lg px-4 py-2 text-sm font-medium transition-colors"

  const activeClass = "bg-blue-600 text-white"
  const inactiveClass = "text-gray-700 hover:bg-blue-100 hover:text-blue-700"

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2">
        <span className="text-xl font-bold text-gray-800">Vejrstation</span>

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

          <div className="relative group">
            <div className="flex items-center">
              <span className="rounded-l-lg border border-blue-200 bg-blue-50 px-2 py-2 text-[10px] font-semibold uppercase tracking-wide text-blue-700">
                Model
              </span>
              <select
                value={modelName}
                onChange={(event) =>
                  setModelName(event.target.value as "DMI" | "VIA")
                }
                className="-ml-px rounded-r-lg border border-blue-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="DMI">DMI</option>
                <option value="VIA">VIA</option>
              </select>
            </div>
            <span className="pointer-events-none absolute right-0 top-full mt-2 w-56 rounded-md border border-gray-200 bg-white px-3 py-2 text-[11px] leading-4 text-gray-600 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
              Vælg hvilken machine learning model der bruges til vejrforudsigelser; en der er trænet på DMI's data eller en der er trænet på vores egen data. 
            </span>
          </div>
        </nav>
      </div>
    </header>
  )
}
