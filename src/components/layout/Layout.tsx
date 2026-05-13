import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-5 py-5">
        <Outlet />
      </main>
    </div>
  )
}