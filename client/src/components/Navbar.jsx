import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg"; // adjust path if needed


function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b">
      
      {/* Left section: Logo + Brand */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src={logo}
          alt="CarbonCred Logo"
          className="h-12 w-12 object-contain"
        />
        <h1 className="text-xl font-bold text-green-700">
          CarbonCred
        </h1>
      </div>

    </nav>
  );
}

export default Navbar;

