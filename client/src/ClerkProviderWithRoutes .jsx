import { ClerkProvider } from "@clerk/clerk-react";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { CONFIG } from "./config";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";

const ClerkProviderWithRoutes = () => {
  const navigate = useNavigate();
  return (
    <ClerkProvider
      navigate={(to) => navigate(to)}
      publishableKey={CONFIG.REACT_APP_CLERK_PUBLISHABLE_KEY}
    >
      <Routes>
        <Route path="/login/*" name="Login" element={<LoginPage />} />
        <Route path="/register/*" name="Register" element={<RegisterPage />} />
        <Route path="/" name="Home" element={<HomePage />} />
      </Routes>
    </ClerkProvider>
  );
};

export default ClerkProviderWithRoutes;
