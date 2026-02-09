import LoginPage from "@/pages/LoginPage";
import { SignupPage } from "@/pages/SignupPage";
import { Route, Routes } from "react-router-dom";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
    </Routes>
  );
};

export default AuthRoutes;
