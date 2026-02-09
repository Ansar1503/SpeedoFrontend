import { Route, Routes } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import DashboardRoutes from "./routes/DashboardRoutes";
import PublicRoute from "./routes/PublicRoutes";

const App = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/*" element={<AuthRoutes />} />
      </Route>
      <Route path="/dashboard/*" element={<DashboardRoutes />} />
    </Routes>
  );
};

export default App;
