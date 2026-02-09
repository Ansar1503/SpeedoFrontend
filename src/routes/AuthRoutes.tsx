import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import { SignupPage } from "@/pages/SignupPage";
import { useAuth } from "@/hooks/useAuth";

const AuthRoutes = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
    </Routes>
  );
};

export default AuthRoutes;
