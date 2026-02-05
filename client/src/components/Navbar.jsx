import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b">
      <h1 className="text-xl font-bold text-green-700">CarbonCred</h1>

      
    </nav>
  );
}

export default Navbar;
