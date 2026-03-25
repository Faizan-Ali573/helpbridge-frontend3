import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Navbar from './Navbar.jsx';

const DashboardLayout = ({ children }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-hb-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-400 font-medium tracking-wide">Authenticating...</p>
      </div>
    );
  }

  const role = user?.role || 'USER';

  const dashboardPath =
    role === 'ADMIN'
      ? '/admin-dashboard'
      : role === 'VOLUNTEER'
        ? '/volunteer-dashboard'
        : '/user-dashboard';

  const navItems = [
    { label: 'Dashboard', path: dashboardPath, icon: '📊' },
    { label: 'Requests', path: '/requests', icon: '📝' },
    { label: 'Messages', path: '/messages', icon: '💬' },
    { label: 'Profile', path: '/profile', icon: '👤' },
  ];

  const activeClass = "flex w-full items-center gap-3 rounded-xl bg-hb-primary/90 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_15px_rgba(14,165,233,0.3)] transition-all duration-200 border border-blue-400/20";
  const inactiveClass = "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition-all duration-200 hover:bg-slate-800 hover:text-white border border-transparent";

  // Get initials for avatar
  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : 'U';
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Desktop */}
        <aside className="hidden w-72 flex-col border-r border-slate-800/60 bg-slate-900/40 backdrop-blur-md md:flex z-10 relative">
          
          {/* User Profile Summary */}
          <div className="p-6 border-b border-slate-800/60">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-hb-primary to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-900/30 border border-slate-700">
                {getInitials(user?.name)}
              </div>
              <div className="overflow-hidden">
                <h3 className="font-bold text-slate-100 truncate w-full text-base tracking-tight">{user?.name || 'Loading...'}</h3>
                <p className="text-xs text-slate-400 truncate w-full mb-1">{user?.email}</p>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-slate-800 text-hb-secondary border border-slate-700 uppercase">
                  {role}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2 p-4 overflow-y-auto custom-scrollbar">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
                end={item.path === dashboardPath || item.path === '/requests' || item.path === '/messages' || item.path === '/profile'}
              >
                <span className="text-lg opacity-80">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
          
          <div className="p-6 border-t border-slate-800/60 bg-slate-900/20">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-xs">HelpBridge System</span>
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse ml-auto"></div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          {/* Decorative background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-hb-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 z-10 custom-scrollbar">
            <div className="mx-auto max-w-7xl">
              
              {/* Mobile Profile & Pills Nav */}
              <div className="md:hidden mb-6">
                 <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800 shadow-md">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-hb-primary to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                      {getInitials(user?.name)}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-100 text-sm">{user?.name}</h3>
                      <span className="text-[10px] inline-block mt-0.5 text-hb-secondary bg-slate-800 px-2 py-0.5 rounded-full uppercase tracking-widest">{role}</span>
                    </div>
                 </div>

                 <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.label}
                      to={item.path}
                      className={({ isActive }) =>
                        `snap-start whitespace-nowrap rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-2 ${isActive
                          ? 'border-hb-primary bg-hb-primary text-white shadow-lg shadow-blue-900/40'
                          : 'border-slate-800 bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                        }`
                      }
                      end={item.path === dashboardPath || item.path === '/requests' || item.path === '/messages' || item.path === '/profile'}
                    >
                      <span>{item.icon}</span> {item.label}
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* Page Content Injection */}
              <div className="animate-fade-in relative z-10">
                 {children}
              </div>
            </div>
          </main>

          {/* Professional Footer */}
          <footer className="border-t border-slate-800/60 bg-slate-950/80 backdrop-blur-md py-4 mt-auto z-10 relative">
            <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
                <p className="text-slate-500 text-xs font-medium tracking-wide">
                  &copy; 2026 HelpBridge. All rights reserved.
                </p>
                <p className="text-slate-600 text-xs flex items-center gap-1">
                  Built for community support <span className="text-red-500/80 text-[10px]">❤</span>
                </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
