import { Routes, Route } from "react-router-dom";
import { LoginPage, ForgotPasswordPage, ResetPasswordPage } from "./pages";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
    </Routes>
  );
}

export default AppRoutes;
