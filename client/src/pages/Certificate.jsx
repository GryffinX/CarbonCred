import Navbar from "../components/Navbar";
import { Leaf, Download, Award, CheckCircle2 } from 'lucide-react';
import logo from "../assets/logo.jpeg";

function Certificate() {
  const companyName =
    localStorage.getItem("companyName") || "Company Name";

  // Certificate data with enhanced formatting
  const certificate = {
    companyName: companyName,
    certificateId: `CC-2026-${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`,
    issueDate: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    issueTime: new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    creditsRetired: 80,
    co2Offset: '80 kg',
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Certificate */}
        <div className="overflow-hidden rounded-2xl border-4 border-emerald-600 bg-white shadow-2xl print:border-2 print:shadow-none">
          {/* Certificate Header */}
          <div className="border-b-4 border-emerald-600 bg-gradient-to-r from-emerald-600 to-emerald-700 px-8 py-6 print:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                  <img
                            src={logo}
                            alt="CarbonCred Logo"
                            className="h-12 w-12 object-contain"
                          />
                </div>
                <span className="text-2xl font-bold text-white">CarbonCred</span>
              </div>
              <div className="text-right text-white">
                <p className="text-sm opacity-80">Issue Date</p>
                <p className="font-semibold">{certificate.issueDate}</p>
                <p className="text-sm opacity-80">{certificate.issueTime}</p>
              </div>
            </div>
          </div>

          {/* Certificate Body */}
          <div className="px-8 py-10 text-center print:py-6">
            {/* Award Icon */}
            <div className="mb-6 inline-flex items-center justify-center rounded-full bg-emerald-100 p-4">
              <Award className="h-12 w-12 text-emerald-600" />
            </div>

            {/* Title */}
            <h1 className="mb-2 text-3xl font-bold text-gray-900 print:text-2xl">
              Certificate of Carbon Credit Issuance
            </h1>
            <p className="mb-8 text-gray-600">
              This certificate verifies the retirement of carbon credits
            </p>

            {/* Divider */}
            <div className="mx-auto mb-8 h-1 w-24 rounded-full bg-emerald-600" />

            {/* Company Name */}
            <p className="mb-2 text-sm uppercase tracking-wider text-gray-500">
              This certifies that
            </p>
            <h2 className="mb-8 text-4xl font-bold text-emerald-700 print:text-3xl">
              {certificate.companyName}
            </h2>

            {/* Credits Info */}
            <div className="mb-8 inline-flex flex-col items-center rounded-2xl border-2 border-emerald-200 bg-emerald-50 px-12 py-6">
              <p className="text-sm uppercase tracking-wider text-emerald-700">
                Has Successfully Offset
              </p>
              <p className="my-2 text-5xl font-bold text-emerald-700 print:text-4xl">
                {certificate.co2Offset}
              </p>
              <p className="text-sm text-emerald-600">of Carbon Dioxide Emissions</p>
            </div>

            {/* Certificate ID */}
            <div className="mb-8">
              <p className="text-sm text-gray-500">Certificate ID</p>
              <p className="font-mono text-lg font-semibold text-gray-900">
                {certificate.certificateId}
              </p>
            </div>

            {/* Verification Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
              Verified & Recorded on Blockchain
            </div>
          </div>

          {/* Certificate Footer */}
          <div className="border-t-2 border-emerald-100 bg-gray-50 px-8 py-4 print:hidden">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <p className="text-xs text-gray-500">
                This certificate is digitally issued by CarbonCred and is valid for sustainability reporting.
              </p>
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-medium text-emerald-600">
                  Powered by CarbonCred
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 print:hidden sm:flex-row">
          <button
            onClick={handlePrint}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:bg-emerald-700 hover:shadow-xl sm:w-auto"
          >
            <Download className="h-5 w-5" />
            Download / Print Certificate
          </button>
        </div>

        {/* Info Note */}
        <p className="mt-8 text-center text-sm text-gray-500 print:hidden">
          Save this certificate for your records. It can be used for sustainability reporting and compliance documentation.
        </p>
      </div>
    </div>
  );
}

export default Certificate;