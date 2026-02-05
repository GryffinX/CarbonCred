import { useState } from "react";
import Navbar from "../components/Navbar";
import EmissionChart from "../components/EmissionChart";
import { 
  Zap, 
  Fuel, 
  Car, 
  Calculator, 
  TrendingUp, 
  Coins,
  CheckCircle2,
  Leaf
} from 'lucide-react';

function SmeDashboard() {
  const [electricity, setElectricity] = useState("");
  const [fuel, setFuel] = useState("");
  const [transport, setTransport] = useState("");
  const [result, setResult] = useState(null);

  const calculateEmissions = (e) => {
    e.preventDefault();
    
    // Simple emission factors (demo)
    const electricityCO2 = electricity * 0.82;
    const fuelCO2 = fuel * 2.68;
    const transportCO2 = transport * 0.21;

    const totalCO2 = electricityCO2 + fuelCO2 + transportCO2;
    const creditsEarned = Math.max(0, Math.round(500 - totalCO2));

    setResult({
      totalCO2: totalCO2.toFixed(2),
      credits: creditsEarned,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">SME Dashboard</h1>
          <p className="mt-2 text-gray-600">Track your emissions and earn carbon credits</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Emission Input Card */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold text-gray-900">
                <Calculator className="h-5 w-5 text-emerald-600" />
                Calculate Emissions
              </h2>
              
              <form onSubmit={calculateEmissions} className="space-y-4">
                {/* Electricity */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Zap className="h-4 w-4 text-amber-500" />
                    Electricity (kWh)
                  </label>
                  <input
                    type="number"
                    value={electricity}
                    onChange={(e) => setElectricity(e.target.value)}
                    placeholder="e.g., 500"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    required
                  />
                </div>

                {/* Fuel */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Fuel className="h-4 w-4 text-orange-500" />
                    Fuel (liters)
                  </label>
                  <input
                    type="number"
                    value={fuel}
                    onChange={(e) => setFuel(e.target.value)}
                    placeholder="e.g., 100"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    required
                  />
                </div>

                {/* Transport */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Car className="h-4 w-4 text-blue-500" />
                    Transport (km)
                  </label>
                  <input
                    type="number"
                    value={transport}
                    onChange={(e) => setTransport(e.target.value)}
                    placeholder="e.g., 250"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white shadow-lg transition-all hover:bg-emerald-700 hover:shadow-xl"
                >
                  Calculate Emissions
                </button>
              </form>
            </div>
          </div>

          {/* Results & Stats */}
          <div className="lg:col-span-2">
            {/* Summary Cards */}
            <div className="mb-8 grid gap-4 sm:grid-cols-3">
              {/* Total CO2 Card */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total CO₂ Emitted</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">
                      {result ? result.totalCO2 : '0.00'} kg
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                    <TrendingUp className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </div>

              {/* Credits Earned Card */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Credits Earned</p>
                    <p className="mt-2 text-3xl font-bold text-emerald-600">
                      {result ? result.credits : '0'}
                    </p>
                    <p className="text-xs text-gray-500">This period</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                    <Coins className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
              </div>

              {/* Status Card */}
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Status</p>
                    <p className="mt-2 text-xl font-bold text-gray-900">
                      {result ? 'Active' : 'Pending'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {result ? 'Verified' : 'Enter data'}
                    </p>
                  </div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    result ? 'bg-emerald-100' : 'bg-gray-100'
                  }`}>
                    {result ? (
                      <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                    ) : (
                      <Leaf className="h-6 w-6 text-gray-600" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Chart */}
            {result && (
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-lg font-semibold text-gray-900">
                  Credits Overview
                </h2>
                <EmissionChart />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default SmeDashboard;