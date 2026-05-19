import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Navbar from "./Navbar"

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-linear-to-b from-gray-50 to-blue-50">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-3 py-4 sm:px-5 sm:py-5">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
