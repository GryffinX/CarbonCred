import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Leaf, BarChart3, Coins, Shield, ArrowRight, Building2, ShoppingCart } from 'lucide-react';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
            <Leaf className="h-4 w-4" />
            Sustainable Future Starts Here
          </div>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Micro Carbon Credits for{' '}
            <span className="text-emerald-600">Small Businesses</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-gray-600">
            Track your emissions, earn micro carbon credits at the kilogram level, and trade transparently 
            in our marketplace. Join the movement towards a sustainable future.
          </p>
          
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={() => navigate("/login?role=SME")}
              className="group flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-emerald-700 hover:shadow-xl"
            >
              <Building2 className="h-5 w-5" />
              I'm an SME
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => navigate("/login?role=BUYER")}
              className="group flex items-center gap-2 rounded-xl border-2 border-emerald-600 bg-white px-8 py-4 text-lg font-semibold text-emerald-600 transition-all hover:bg-emerald-50"
            >
              <ShoppingCart className="h-5 w-5" />
              I'm a Buyer
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="text-center">
            <p className="text-4xl font-bold text-emerald-600">500+</p>
            <p className="mt-2 text-gray-600">SMEs Registered</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-emerald-600">12,500 kg</p>
            <p className="mt-2 text-gray-600">CO₂ Offset</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-emerald-600">$45K+</p>
            <p className="mt-2 text-gray-600">Credits Traded</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Simple, transparent, and effective carbon credit management
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:border-emerald-200 hover:shadow-lg">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                <BarChart3 className="h-7 w-7" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">Track Emissions</h3>
              <p className="mt-3 text-gray-600">
                Input your electricity, fuel, and transport usage. Our system calculates your carbon footprint accurately.
              </p>
            </div>

            <div className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:border-emerald-200 hover:shadow-lg">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                <Coins className="h-7 w-7" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">Earn Micro Credits</h3>
              <p className="mt-3 text-gray-600">
                Reduce emissions and earn credits at the kilogram level. Perfect for small businesses starting their sustainability journey.
              </p>
            </div>

            <div className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:border-emerald-200 hover:shadow-lg">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                <Shield className="h-7 w-7" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">Transparent Marketplace</h3>
              <p className="mt-3 text-gray-600">
                Buy and sell credits in our verified marketplace. Every transaction is tracked and certified.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-600 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Make a Difference?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-emerald-100">
            Join hundreds of businesses already trading micro carbon credits on our platform.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-emerald-600 shadow-lg transition-all hover:bg-emerald-50 hover:shadow-xl"
          >
            Get Started Today
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
                <Leaf className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-emerald-700">CarbonCred</span>
            </div>
            <p className="text-center text-sm text-gray-500">
              🌱 Building a sustainable future, one micro credit at a time.
            </p>
            <p className="text-sm text-gray-400">
              © 2026 CarbonCred. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;