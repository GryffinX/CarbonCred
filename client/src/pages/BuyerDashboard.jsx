import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { 
  ShoppingCart, 
  Leaf, 
  Wallet,
  Award,
  ArrowRight
} from 'lucide-react';

// Sample purchase history data
const purchaseHistory = [
  { id: 1, date: '2026-02-01', credits: 50, status: 'Available', sme: 'GreenTech Co.' },
  { id: 2, date: '2026-01-28', credits: 75, status: 'Retired', sme: 'EcoSolutions Ltd.' },
  { id: 3, date: '2026-01-15', credits: 30, status: 'Available', sme: 'CleanAir Inc.' },
  { id: 4, date: '2026-01-10', credits: 100, status: 'Retired', sme: 'SustainaBiz' },
  { id: 5, date: '2025-12-20', credits: 45, status: 'Retired', sme: 'GreenTech Co.' },
];

function BuyerDashboard() {
  const navigate = useNavigate();

  // Calculate totals
  const totalPurchased = purchaseHistory.reduce((sum, p) => sum + p.credits, 0);
  const availableCredits = purchaseHistory
    .filter(p => p.status === 'Available')
    .reduce((sum, p) => sum + p.credits, 0);
  const retiredCredits = purchaseHistory
    .filter(p => p.status === 'Retired')
    .reduce((sum, p) => sum + p.credits, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Buyer Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your carbon credit portfolio</p>
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Purchased */}
          <div className="flex flex-col rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-blue-100 p-6 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <ShoppingCart className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-sm font-medium text-blue-700">Total Purchased</p>
            <p className="mt-1 text-3xl font-bold text-blue-900">{totalPurchased} kg</p>
            <p className="mt-1 text-sm text-blue-600">All time</p>
          </div>

          {/* CO₂ Offset */}
          <div className="flex flex-col rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <Leaf className="h-8 w-8 text-emerald-600" />
            </div>
            <p className="text-sm font-medium text-emerald-700">CO₂ Offset</p>
            <p className="mt-1 text-3xl font-bold text-emerald-900">{retiredCredits} kg</p>
            <p className="mt-1 text-sm text-emerald-600">Retired credits</p>
          </div>

          {/* Available */}
          <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <Wallet className="h-8 w-8 text-gray-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Available</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">{availableCredits} kg</p>
            <p className="mt-1 text-sm text-gray-600">Ready to retire</p>
          </div>

          {/* Retire Credits CTA */}
          <div className="flex flex-col justify-between rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 shadow-sm">
            <div>
              <p className="text-sm font-medium text-emerald-700">Ready to Offset?</p>
              <p className="mt-1 text-sm text-emerald-600">
                Retire your credits and get a certificate
              </p>
            </div>
            <button 
              onClick={() => {
                localStorage.setItem("companyName", "GreenBrew Cafe");
                navigate("/certificate");
              }}
              className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 font-semibold text-white shadow-lg transition-all hover:bg-emerald-700 hover:shadow-xl"
            >
              <Award className="h-5 w-5" />
              Retire Credits
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Purchase History */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">Purchase History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    SME
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Credits (kg)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {purchaseHistory.map((purchase) => (
                  <tr key={purchase.id} className="transition-colors hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {new Date(purchase.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                      {purchase.sme}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {purchase.credits} kg
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          purchase.status === 'Available'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {purchase.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/marketplace")}
            className="flex items-center gap-2 rounded-xl border border-emerald-600 bg-white px-6 py-3 font-semibold text-emerald-600 transition-all hover:bg-emerald-50"
          >
            <ShoppingCart className="h-5 w-5" />
            Browse Marketplace
          </button>
        </div>
      </main>
    </div>
  );
}

export default BuyerDashboard;