import LoginPage from "@/pages/LoginPage";
import { Route, Routes } from "react-router-dom";
// import Login from "../pages/auth/Login";
// import Signup from "../pages/auth/Signup";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      {/* <Route path="/signup" element={<Signup />} /> */}
    </Routes>
  );
};

export default AuthRoutes;
