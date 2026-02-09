import DashboardPage from "@/pages/DashboardPage";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import TripPage from "@/pages/TripPage";

export default function DashboardRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route index element={<DashboardPage />} />
        <Route path="/trip/:tripId" element={<TripPage />} />
      </Route>
    </Routes>
  );
}
