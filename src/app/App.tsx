import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "../components/layout/Layout"
import HomePage from "./routes/HomePage"
import ForecastPage from "./routes/ForecastPage"
import HistoryPage from "./routes/HistoryPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/forecast" element={<ForecastPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}