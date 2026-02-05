import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Leaf, Mail, Lock, Building2, ShoppingCart } from 'lucide-react';

function Login() {
  const navigate = useNavigate();
  
  // Read role from URL
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get("role") || "SME";
  
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState(initialRole.toLowerCase());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Navigate based on role selection
    if (role === 'sme') {
      navigate('/sme');
    } else {
      navigate('/buyer');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-50 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-emerald-700">CarbonCred</span>
        </Link>

        {/* Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="mt-2 text-gray-600">
              {isLogin 
                ? 'Sign in to access your dashboard' 
                : 'Start your sustainability journey today'}
            </p>
          </div>

          {/* Role Selector */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              I am a...
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('sme')}
                className={`flex items-center justify-center gap-2 rounded-xl border-2 p-4 text-sm font-medium transition-all ${
                  role === 'sme'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 text-gray-600 hover:border-emerald-300'
                }`}
              >
                <Building2 className="h-5 w-5" />
                SME
              </button>
              <button
                type="button"
                onClick={() => setRole('buyer')}
                className={`flex items-center justify-center gap-2 rounded-xl border-2 p-4 text-sm font-medium transition-all ${
                  role === 'buyer'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 text-gray-600 hover:border-emerald-300'
                }`}
              >
                <ShoppingCart className="h-5 w-5" />
                Buyer
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-gray-900 placeholder-gray-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-gray-900 placeholder-gray-400 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-600 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-emerald-700 hover:shadow-xl"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Toggle */}
          <p className="mt-6 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-emerald-600 hover:text-emerald-700"
            >
              {isLogin ? 'Create account' : 'Sign in'}
            </button>
          </p>
        </div>

        {/* Back to Home */}
        <p className="mt-6 text-center text-sm text-gray-500">
          <Link to="/" className="hover:text-emerald-600">
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;