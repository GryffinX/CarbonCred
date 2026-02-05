import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { 
  Search, 
  Filter,
  Leaf,
  Building2,
  ShoppingCart,
  SlidersHorizontal
} from 'lucide-react';

// Sample marketplace listings
const listings = [
  { id: 1, sme: 'GreenBrew Cafe', credits: 120, price: 5, verified: true, location: 'Mumbai, India' },
  { id: 2, sme: 'EcoPrint Solutions', credits: 200, price: 4, verified: true, location: 'Delhi, India' },
  { id: 3, sme: 'CleanMove Logistics', credits: 90, price: 6, verified: true, location: 'Bangalore, India' },
  { id: 4, sme: 'GreenTech Co.', credits: 150, price: 4.5, verified: true, location: 'Chennai, India' },
  { id: 5, sme: 'EcoSolutions Ltd.', credits: 180, price: 5.5, verified: false, location: 'Pune, India' },
  { id: 6, sme: 'CleanAir Inc.', credits: 75, price: 6.5, verified: true, location: 'Hyderabad, India' },
];

function Marketplace() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredListings = listings.filter((listing) => {
    const matchesSearch = listing.sme.toLowerCase().includes(searchTerm.toLowerCase());
    let matchesPrice = true;
    
    if (priceFilter === 'low') matchesPrice = listing.price < 5;
    if (priceFilter === 'medium') matchesPrice = listing.price >= 5 && listing.price <= 6;
    if (priceFilter === 'high') matchesPrice = listing.price > 6;
    
    return matchesSearch && matchesPrice;
  });

  const handlePurchase = (sme) => {
    alert(`Purchased credits from ${sme}`);
    // Optionally navigate to buyer dashboard after purchase
    // navigate('/buyer');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Carbon Credit Marketplace</h1>
          <p className="mt-2 text-gray-600">Buy verified micro carbon credits directly from small businesses</p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by SME name..."
              className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-gray-900 placeholder-gray-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mb-8 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-emerald-600" />
              <h3 className="font-semibold text-gray-900">Filter by Price</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { value: 'all', label: 'All Prices' },
                { value: 'low', label: 'Under ₹5/kg' },
                { value: 'medium', label: '₹5 - ₹6/kg' },
                { value: 'high', label: 'Above ₹6/kg' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setPriceFilter(option.value)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                    priceFilter === option.value
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Count */}
        <p className="mb-6 text-sm text-gray-600">
          Showing {filteredListings.length} of {listings.length} listings
        </p>

        {/* Listings Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredListings.map((listing) => (
            <div
              key={listing.id}
              className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-emerald-200 hover:shadow-lg"
            >
              {/* Header */}
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                  <Building2 className="h-6 w-6" />
                </div>
                {listing.verified && (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                    <Leaf className="h-3 w-3" />
                    Verified
                  </span>
                )}
              </div>

              {/* SME Info */}
              <h3 className="mb-1 text-lg font-semibold text-gray-900 group-hover:text-emerald-600">
                {listing.sme}
              </h3>
              <p className="mb-4 text-sm text-gray-500">{listing.location}</p>

              {/* Stats */}
              <div className="mb-4 flex items-center justify-between border-t border-gray-100 pt-4">
                <div>
                  <p className="text-xs text-gray-500">Available</p>
                  <p className="text-lg font-bold text-gray-900">{listing.credits} kg</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Price</p>
                  <p className="text-lg font-bold text-emerald-600">₹{listing.price.toFixed(2)}/kg</p>
                </div>
              </div>

              {/* Buy Button */}
              <button
                onClick={() => handlePurchase(listing.sme)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 font-semibold text-white shadow-lg transition-all hover:bg-emerald-700 hover:shadow-xl"
              >
                <ShoppingCart className="h-4 w-4" />
                Buy Credits
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredListings.length === 0 && (
          <div className="rounded-2xl border border-gray-100 bg-white py-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">No listings found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Marketplace;