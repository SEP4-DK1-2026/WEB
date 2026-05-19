import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import weatherIcon from "../../assets/weather-icons/animated/rainy-1.svg"
import menuIcon from "../../assets/menu-icon.svg"
import { useWeatherModel } from "../../context/WeatherModelContext"

export default function Navbar() {
  const { modelName, setModelName } = useWeatherModel()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const baseClass = "rounded-lg px-4 py-2 text-sm font-medium transition-colors"

  const activeClass = "bg-blue-600 text-white"
  const inactiveClass = "text-gray-700 hover:bg-blue-100 hover:text-blue-700"

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={weatherIcon}
            alt="Animated weather icon"
            className="h-10 w-10"
          />
          <span className="text-xl font-bold">
            <span className="bg-linear-to-r from-sky-600 via-blue-600 to-amber-500 bg-clip-text text-transparent">
              <span className="hidden sm:inline">
                VIAs Meteorologiske Institut
              </span>
              <span className="sm:hidden">VMI</span>
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-3 md:flex">
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
            <span className="pointer-events-none absolute right-0 top-full mt-2 w-56 rounded-md border border-gray-200 bg-white px-3 py-2 text-[11px] leading-4 text-gray-600 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 hidden md:block">
              Vælg hvilken machine learning model der bruges til
              vejrforudsigelser; en der er trænet på DMI's data eller en der er
              trænet på vores egen data.
            </span>
          </div>
        </nav>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 md:hidden"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <span className="sr-only">Toggle navigation</span>
          <img src={menuIcon} alt="" className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      <div
        id="mobile-nav"
        className={`${isMobileMenuOpen ? "block" : "hidden"} border-t border-gray-200 bg-white/95 px-3 py-3 shadow-sm md:hidden`}
      >
        <div className="flex flex-col gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Hjem
          </NavLink>

          <NavLink
            to="/forecast"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Vejrudsigt
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) =>
              `${baseClass} ${isActive ? activeClass : inactiveClass}`
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Historik
          </NavLink>

          <div className="relative">
            <div className="flex items-stretch">
              <span className="flex-1 rounded-l-lg border border-blue-200 bg-blue-50 px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-blue-700">
                Machine Learning Model til vejrforudsigelser
              </span>
              <select
                value={modelName}
                onChange={(event) =>
                  setModelName(event.target.value as "DMI" | "VIA")
                }
                className="-ml-px shrink-0 rounded-r-lg border border-blue-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="DMI">DMI</option>
                <option value="VIA">VIA</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
