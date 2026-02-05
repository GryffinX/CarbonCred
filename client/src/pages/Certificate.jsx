import Navbar from "../components/Navbar";

function Certificate() {
  const companyName =
    localStorage.getItem("companyName") || "Company Name";

  const issuedAt = new Date().toLocaleString();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white border-8 border-green-600 rounded-lg shadow-lg p-10 relative">

          {/* Top Bar */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-600 rounded-full" />
              <h1 className="text-lg font-bold text-green-800 tracking-wide">
                CARBON CRED
              </h1>
            </div>

            <div className="text-sm text-green-700 font-medium">
              Issued on: {issuedAt}
            </div>
          </div>

          {/* Certificate Title */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold tracking-wide text-green-800">
              CERTIFICATE
            </h2>
            <p className="text-lg tracking-widest text-green-700 mt-2">
              OF CARBON CREDIT ISSUANCE
            </p>
          </div>

          {/* Body */}
          <div className="text-center mb-10">
            <p className="text-gray-600 mb-4">
              Proudly presented to
            </p>

            <h3 className="text-4xl font-script text-green-600 mb-6">
              {companyName}
            </h3>

            <p className="max-w-3xl mx-auto text-gray-700 leading-relaxed">
              A massive congratulations to the team for successfully
              earning these carbon credits. This achievement is a
              testament to your genuine commitment to sustainability
              and the tangible steps you’ve taken to actively reduce
              your carbon footprint.
            </p>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center mt-16">
            <div className="text-sm text-gray-500">
              Certificate ID: CC-{Math.floor(Math.random() * 1000000)}
            </div>

            <div className="text-green-700 font-semibold">
              Verified by CarbonCred
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => window.print()}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Download / Print Certificate
          </button>
        </div>
      </div>
    </div>
  );
}

export default Certificate;
