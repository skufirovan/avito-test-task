import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { AdPage, AdsPage, NotFoundPage } from "./pages"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/ads" />} />
        <Route path="/ads" element={<AdsPage />} />
        <Route path="/ads/:id" element={<AdPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
