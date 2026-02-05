import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  // ✅ READ ROLE FROM URL
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get("role") || "SME";
  const [role, setRole] = useState(initialRole);

  const handleSubmit = (e) => {
    e.preventDefault();

    // TEMP DEMO NAVIGATION
    if (role === "SME") {
      navigate("/sme");
    } else {
      navigate("/buyer");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignup ? "Create an Account" : "Login to CarbonCred"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          {/* Role Selector */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Select Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="SME">Small Business (SME)</option>
              <option value="BUYER">Buyer</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Toggle Login / Signup */}
        <p className="text-center text-sm mt-4">
          {isSignup ? "Already have an account?" : "New here?"}{" "}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-green-600 font-medium"
          >
            {isSignup ? "Login" : "Create one"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
