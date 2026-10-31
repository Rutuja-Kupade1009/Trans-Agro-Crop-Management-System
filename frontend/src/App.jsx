import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Farmers from "./pages/Farmers";
import Crops from "./pages/Crops";
import Reports from "./pages/Reports";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
        <main className="main-area">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/farmers" element={<Farmers />} />
            <Route path="/crops" element={<Crops />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <footer className="footer">© 2026 Trans-Agro · Crop Management System</footer>
        </main>
      </div>
    </BrowserRouter>
  );
}
