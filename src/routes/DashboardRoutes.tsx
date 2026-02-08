import DashboardPage from "@/pages/DashboardPage";
import { Route, Routes } from "react-router-dom";

export default function DashboardRoutes() {
  return (
    <Routes>
      <Route index element={<DashboardPage />} />
    </Routes>
  );
}
