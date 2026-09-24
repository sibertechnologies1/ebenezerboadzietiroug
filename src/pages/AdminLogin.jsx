import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiLockAlt, BiEnvelope, BiErrorCircle } from 'react-icons/bi';
import { supabase } from '../supabaseClient';

function AdminLogin() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  console.log("Submitting with:", credentials);

  const { data, error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });

  console.log("Supabase response data:", data);
  console.log("Supabase error:", error);

  setLoading(false);

  if (error) {
    setError(error.message);
    return;
  }

  if (data?.session) {
    console.log("Session found, navigating to /admin...");
    navigate('/admin', { replace: true });
  } else {
    setError("Login succeeded, but no active session was returned. Check if email confirmation is required.");
  }
};

  return (
    <div className="min-h-screen bg-[#070a13]  flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
        <div className="text-center space-y-2 mb-8">
          <div className="w-12 h-12 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto text-blue-400 text-2xl">
            <BiLockAlt />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
          <p className="text-xs text-slate-400 text-white">Sign in to manage your portfolio</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border  border-red-500/20 rounded-xl flex items-center gap-2 text-xs text-red-400">
            <BiErrorCircle className="text-base flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300  text-white">Email</span>
            <div className="relative">
              <BiEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-base" />
             <input
                name="email"
                type="email"
                value={credentials.email}
                onChange={handleChange}
                required
                className="w-full  border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm  placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition duration-200"
                placeholder="admin@example.com"
         />
            </div>
          </label>

          <label className="flex flex-col gap-1.5 ">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 text-white">Password</span>
            <div className="relative">
              <BiLockAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-base" />
               <input
                  name="password"
                  type="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm  placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition duration-200"
                  placeholder="••••••••"
                />
            </div>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition duration-200 text-sm shadow-lg shadow-blue-600/20 mt-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;