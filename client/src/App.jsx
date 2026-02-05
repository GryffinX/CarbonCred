import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SmeDashboard from "./pages/SmeDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sme" element={<SmeDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
