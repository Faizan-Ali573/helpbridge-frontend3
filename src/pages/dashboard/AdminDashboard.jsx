import React, { useEffect, useState } from 'react';
import * as adminService from '../../services/adminService.js';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import toast from 'react-hot-toast';

const AnalyticsCards = ({ analytics }) => {
  const cards = [
    {
      title: 'Total Requests',
      value: analytics.totalRequests,
    },
    {
      title: 'Completed %',
      value: `${analytics.completedPercentage?.toFixed(1) || 0}%`,
    },
    {
      title: 'Active Volunteers',
      value: analytics.activeVolunteers,
    },
    {
      title: 'Avg Trust Score',
      value: analytics.averageTrustScore?.toFixed(1) || 0,
    },
  ];

  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-md shadow-slate-950/60"
        >
          <h4 className="text-xs font-medium uppercase tracking-wide text-slate-400">
            {card.title}
          </h4>
          <p className="mt-2 text-xl font-semibold text-slate-50">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState({});
  const [reports, setReports] = useState([]);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);
  const [loadingReports, setLoadingReports] = useState(true);

  const loadAnalytics = async () => {
    setLoadingAnalytics(true);
    try {
      const data = await adminService.getAnalytics();
      setAnalytics(data);
    } catch (err) {
      // handled
    } finally {
      setLoadingAnalytics(false);
    }
  };

  const loadReports = async () => {
    setLoadingReports(true);
    try {
      const data = await adminService.getReports();
      setReports(data || []);
    } catch (err) {
      // handled
    } finally {
      setLoadingReports(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
    loadReports();
  }, []);

  const handleBlockToggle = async (rep) => {
    const user = rep.reportedUser || rep.user;
    const currentlyBlocked = user?.blocked || user?.isBlocked || rep.blocked;
    try {
      if (currentlyBlocked) {
        await adminService.unblockUser(rep._id);
        toast.success('User unblocked');
      } else {
        await adminService.blockUser(rep._id);
        toast.success('User blocked');
      }
      loadReports();
    } catch (err) {
      // handled
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-white">Admin Dashboard</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Monitor platform health, user safety, and engagement.
          </p>
        </div>
      </div>

      {loadingAnalytics ? <LoadingSpinner /> : <AnalyticsCards analytics={analytics} />}

      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-md shadow-slate-950/60">
        <h3 className="mb-3 text-sm sm:text-base font-semibold text-white">Reports</h3>
        {loadingReports ? (
          <LoadingSpinner />
        ) : (
          <div className="flex flex-col gap-3">
            {reports.map((rep) => {
              const user = rep.reportedUser || rep.user;
              const blocked = user?.blocked || rep.blocked;
              return (
                <div
                  key={rep._id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-3 text-xs sm:text-sm text-slate-100 shadow-sm"
                >
                  <div>
                    <p className="font-semibold text-slate-50">
                      {user?.name || 'Unknown user'}
                    </p>
                    <p className="text-[11px] text-slate-400">Reason: {rep.reason}</p>
                  </div>
                  <button
                    onClick={() => handleBlockToggle(rep)}
                    className={`rounded-md px-3 py-1 text-xs font-semibold text-white shadow-sm ${blocked
                        ? 'bg-emerald-500 hover:bg-emerald-600'
                        : 'bg-rose-500 hover:bg-rose-600'
                      }`}
                  >
                    {blocked ? 'Unblock' : 'Block'}
                  </button>
                </div>
              );
            })}
            {reports.length === 0 && (
              <p className="text-xs sm:text-sm text-slate-400">No reports.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;


