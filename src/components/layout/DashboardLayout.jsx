import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Navbar from './Navbar.jsx';

const DashboardLayout = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const role = user?.role || 'USER';

  const dashboardPath =
    role === 'ADMIN'
      ? '/dashboard/admin'
      : role === 'VOLUNTEER'
        ? '/dashboard/volunteer'
        : '/dashboard/user';

  const navItems = [
    { label: 'Dashboard', path: dashboardPath },
    { label: 'Requests', path: dashboardPath },
    { label: 'Messages', path: dashboardPath },
    { label: 'Profile', path: dashboardPath },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <Navbar />
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-60 flex-col border-r border-slate-800 bg-slate-950/60 px-4 py-6 md:flex">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => navigate(item.path)}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
          <div className="mt-auto pt-6 text-xs text-slate-500">
            <p>HelpBridge Dashboard</p>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 px-3 py-4 sm:px-6 sm:py-6">
          <div className="mx-auto max-w-6xl">
            {/* Mobile pills nav */}
            <div className="mb-4 flex gap-2 overflow-x-auto md:hidden">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => navigate(item.path)}
                  className="whitespace-nowrap rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs text-slate-200 hover:bg-slate-800"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
