import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "../components/Layout"
import HomePage from "./routes/HomePage"
import ForecastPage from "./routes/ForecastPage"
import HistoryPage from "./routes/HistoryPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="forecast" element={<ForecastPage />} />
          <Route path="history" element={<HistoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
