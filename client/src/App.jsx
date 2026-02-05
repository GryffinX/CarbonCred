import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SmeDashboard from "./pages/SmeDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import Marketplace from "./pages/mp";
import Certificate from "./pages/Certificate";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sme" element={<SmeDashboard />} />
        <Route path="/buyer" element={<BuyerDashboard />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/certificate" element={<Certificate />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
