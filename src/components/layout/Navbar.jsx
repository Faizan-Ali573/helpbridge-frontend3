import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between border-b border-slate-800 bg-slate-900/70 px-4 py-3 backdrop-blur">
      <Link to="/" className="text-lg font-semibold tracking-tight text-white">
        HelpBridge
      </Link>
      <div className="flex items-center gap-4">
        {user && (
          <span className="text-xs sm:text-sm text-slate-300">
            {user.name} <span className="text-slate-500">({user.role})</span>
          </span>
        )}
        {user && (
          <button
            onClick={logout}
            className="rounded-full bg-red-500 px-3 py-1 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-red-600 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;



