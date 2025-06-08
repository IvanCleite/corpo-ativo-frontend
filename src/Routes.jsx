import { Routes, Route } from "react-router-dom";
import {
  LoginPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  HomePage,
} from "./pages";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}

export default AppRoutes;
