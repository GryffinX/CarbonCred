import { useState } from "react";
import Navbar from "../components/Navbar";
import EmissionChart from "../components/EmissionChart";


function SmeDashboard() {
  const [electricity, setElectricity] = useState("");
  const [fuel, setFuel] = useState("");
  const [transport, setTransport] = useState("");
  const [result, setResult] = useState(null);

  const calculateEmissions = () => {
    // Simple emission factors (demo)
    const electricityCO2 = electricity * 0.82;
    const fuelCO2 = fuel * 2.68;
    const transportCO2 = transport * 0.21;

    const totalCO2 =
      electricityCO2 + fuelCO2 + transportCO2;

    const creditsEarned = Math.max(0, Math.round(500 - totalCO2));

    setResult({
      totalCO2: totalCO2.toFixed(2),
      credits: creditsEarned,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">
          SME Dashboard
        </h1>

        {/* INPUT FORM */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Monthly Emission Input
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="number"
              placeholder="Electricity (kWh)"
              value={electricity}
              onChange={(e) => setElectricity(e.target.value)}
              className="border p-3 rounded"
            />
            <input
              type="number"
              placeholder="Fuel (liters)"
              value={fuel}
              onChange={(e) => setFuel(e.target.value)}
              className="border p-3 rounded"
            />
            <input
              type="number"
              placeholder="Transport (km)"
              value={transport}
              onChange={(e) => setTransport(e.target.value)}
              className="border p-3 rounded"
            />
          </div>

          <button
            onClick={calculateEmissions}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Calculate Emissions
          </button>
        </div>

        {/* RESULTS */}
        {result && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-gray-500">Total CO₂</h3>
              <p className="text-2xl font-bold">
                {result.totalCO2} kg
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-gray-500">
                Credits Earned
              </h3>
              <p className="text-2xl font-bold text-green-600">
                {result.credits}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-gray-500">Status</h3>
              <p className="text-lg font-semibold">
                {result.credits > 0
                  ? "Emission Reduced 🎉"
                  : "No Reduction"}
              </p>
            </div>
          </div>
        )}
        {result && (
            <div className="mt-10">
                <EmissionChart />
            </div>
        )}

      </div>
    </div>
  );
}

export default SmeDashboard;
