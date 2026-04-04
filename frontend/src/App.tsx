import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { AdEditPage, AdPage, AdsPage, NotFoundPage } from "./pages"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/ads" />} />
        <Route path="/ads" element={<AdsPage />} />
        <Route path="/ads/:id" element={<AdPage />} />
        <Route path="/ads/:id/edit" element={<AdEditPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
