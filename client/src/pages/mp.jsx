import Navbar from "../components/Navbar";

const listings = [
  {
    id: 1,
    sme: "GreenBrew Cafe",
    credits: 120,
    price: 5,
  },
  {
    id: 2,
    sme: "EcoPrint Solutions",
    credits: 200,
    price: 4,
  },
  {
    id: 3,
    sme: "CleanMove Logistics",
    credits: 90,
    price: 6,
  },
];

function Marketplace() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-2">
          Carbon Credit Marketplace
        </h1>
        <p className="text-gray-600 mb-8">
          Buy verified micro carbon credits directly from small businesses.
        </p>

        {/* LISTINGS */}
        <div className="grid md:grid-cols-3 gap-6">
          {listings.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">
                {item.sme}
              </h2>

              <p className="text-gray-600 mb-1">
                Credits Available:
                <span className="font-medium"> {item.credits} kg</span>
              </p>

              <p className="text-gray-600 mb-4">
                Price:
                <span className="font-medium"> ₹{item.price} / kg</span>
              </p>

              <button
                onClick={() =>
                  alert(
                    `Purchased credits from ${item.sme}`
                  )
                }
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Buy Credits
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Marketplace;
