import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import EventOverviewPage from "./pages/EventOverview/EventOverviewPage";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/calendar" replace />} />
        <Route path="/calendar" element={<DashboardPage />} />
        <Route path="/events" element={<EventOverviewPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
