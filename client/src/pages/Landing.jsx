import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Landing() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />

      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 bg-green-50">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Micro Carbon Credits for{" "}
          <span className="text-green-700">Small Businesses</span>
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mb-8">
          Track emissions, earn micro carbon credits for small reductions,
          and trade them transparently in a trusted marketplace.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login?role=SME")}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            I’m an SME
          </button>

          <button
            onClick={() => navigate("/login?role=BUYER")}
            className="px-6 py-3 border border-green-600 text-green-700 rounded-lg hover:bg-green-100"
          >
            I’m a Buyer
          </button>
        </div>
      </section>
    </div>
  );
}

export default Landing;
