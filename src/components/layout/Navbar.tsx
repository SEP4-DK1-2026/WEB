import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const baseClasses =
    'rounded-lg px-4 py-2 text-sm font-medium transition-colors';
  const inactiveClasses =
    'text-gray-700 hover:bg-blue-100 hover:text-blue-700';
  const activeClasses =
    'bg-blue-600 text-white';

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="text-xl font-bold text-gray-800">Vejrstation</div>

        <nav className="flex items-center gap-3">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
            }
          >
            Hjem
          </NavLink>

          <NavLink
            to="/forecast"
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
            }
          >
            Vejrudsigt
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
            }
          >
            Historik
          </NavLink>
        </nav>
      </div>
    </header>
  );
}