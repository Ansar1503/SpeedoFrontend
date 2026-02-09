import DashboardPage from "@/pages/DashboardPage";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";

export default function DashboardRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route index element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}
