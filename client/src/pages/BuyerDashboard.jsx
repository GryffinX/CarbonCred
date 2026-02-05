import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";


function BuyerDashboard() {
    const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">
          Buyer Dashboard
        </h1>

        {/* SUMMARY CARDS */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">Total Credits Purchased</h3>
            <p className="text-2xl font-bold text-green-600">
              120 kg
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">CO₂ Offset</h3>
            <p className="text-2xl font-bold">
              120 kg
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">Credits Available</h3>
            <p className="text-2xl font-bold">
              40 kg
            </p>
          </div>
        </div>

        {/* ACTION SECTION */}
        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <h2 className="text-xl font-semibold mb-4">
            Offset Your Emissions
          </h2>

          <p className="text-gray-600 mb-4">
            Retire carbon credits to offset your organization’s emissions
            and receive a verified carbon offset certificate.
          </p>

          <button
  onClick={() => {
    localStorage.setItem("companyName", "GreenBrew Cafe");
    navigate("/certificate");
  }}
  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
>
  Retire Credits
</button>


        </div>

        {/* PURCHASE HISTORY */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Purchase History
          </h2>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2">Date</th>
                <th>Credits (kg)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">12 Jan 2026</td>
                <td>50</td>
                <td className="text-green-600">Retired</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">28 Jan 2026</td>
                <td>70</td>
                <td className="text-yellow-600">Available</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BuyerDashboard;
