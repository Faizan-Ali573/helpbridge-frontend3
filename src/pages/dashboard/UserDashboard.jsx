import React, { useEffect, useState } from 'react';
import * as helpRequestService from '../../services/helpRequestService.js';
import { useAuth } from '../../context/AuthContext.jsx';
import RequestCard from '../../components/ui/RequestCard.jsx';
import Pagination from '../../components/common/Pagination.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import VolunteerCard from '../../components/ui/VolunteerCard.jsx';
import toast from 'react-hot-toast';

const PAGE_SIZE = 5;

const UserDashboard = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'Assistance',
    category: 'Medical',
    locationName: '',
    latitude: 24.8607,
    longitude: 67.0011,
  });
  const [requests, setRequests] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1 });
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [suggestedVolunteers, setSuggestedVolunteers] = useState([]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setForm(prev => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }));
      }, (error) => {
        console.warn('Geolocation error:', error);
      });
    }
  }, []);

  const loadRequests = async (page = 1) => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await helpRequestService.getHelpRequests({
        page,
        pageSize: PAGE_SIZE,
        createdBy: user.id,
      });
      const items = data.data || data.items || data.results || [];
      setRequests(items);
      setPagination({
        total: data.total || data.count || items.length,
        page: data.page || page,
      });
    } catch (err) {
      // errors via interceptor
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadRequests(1);
    }
  }, [user]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBlurDescription = async () => {
    if (!form.description) return;
    try {
      const { detectedCategory } = await helpRequestService.detectCategory(form.description);
      const validCategories = ['Medical', 'Grocery', 'Education', 'Emergency'];
      if (detectedCategory && validCategories.includes(detectedCategory)) {
        setForm((prev) => ({ ...prev, category: detectedCategory }));
        toast.success(`Suggested category: ${detectedCategory}`);
      }
    } catch (err) {
      // quiet
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      await helpRequestService.createHelpRequest(form);
      toast.success('Help request created');
      setForm((prev) => ({
        ...prev,
        title: '',
        description: '',
        category: 'Medical',
        type: 'Assistance',
        locationName: ''
      }));
      loadRequests(1);
    } catch (err) {
      // handled
    } finally {
      setCreating(false);
    }
  };

  const handleSelectRequest = async (request) => {
    setSelectedRequest(request);
    try {
      const { suggestions } = await helpRequestService.getVolunteerSuggestions(request.id);
      setSuggestedVolunteers(suggestions || []);
    } catch (err) {
      setSuggestedVolunteers([]);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1.4fr]">
      <section className="space-y-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-md shadow-slate-950/60">
          <h2 className="mb-3 text-base sm:text-lg font-semibold text-white">
            Create Help Request
          </h2>
          <form onSubmit={handleCreate} className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold ml-1">Request Type</label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none ring-hb-primary/40 focus:border-hb-primary focus:ring-1"
                >
                  <option value="Assistance">Assistance</option>
                  <option value="Support">Support</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold ml-1">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none ring-hb-primary/40 focus:border-hb-primary focus:ring-1"
                >
                  <option value="Medical">Medical</option>
                  <option value="Grocery">Grocery</option>
                  <option value="Education">Education</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <input
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none ring-hb-primary/40 focus:border-hb-primary focus:ring-1"
              />
            </div>
            <div className="space-y-1.5">
              <textarea
                name="description"
                placeholder="Describe your situation"
                value={form.description}
                onChange={handleChange}
                onBlur={handleBlurDescription}
                required
                className="min-h-[80px] w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none ring-hb-primary/40 focus:border-hb-primary focus:ring-1"
              />
            </div>
            <div className="space-y-1.5">
              <input
                name="locationName"
                placeholder="Location (e.g. Karachi, Saddar)"
                value={form.locationName}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none ring-hb-primary/40 focus:border-hb-primary focus:ring-1"
              />
            </div>
            <button
              type="submit"
              disabled={creating}
              className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-hb-primary px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-900/40 hover:bg-blue-600 disabled:opacity-60 transition-colors"
            >
              {creating ? 'Submitting...' : 'Submit request'}
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-md shadow-slate-950/60">
          <h2 className="mb-3 text-base sm:text-lg font-semibold text-white">My Requests</h2>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className="flex flex-col gap-3">
                {requests.map((req) => (
                  <button
                    key={req.id}
                    type="button"
                    onClick={() => handleSelectRequest(req)}
                    className="text-left"
                  >
                    <RequestCard request={req} isUserView />
                  </button>
                ))}
                {requests.length === 0 && (
                  <p className="text-sm text-slate-400">No requests yet.</p>
                )}
              </div>
              <Pagination
                page={pagination.page}
                total={pagination.total}
                pageSize={PAGE_SIZE}
                onPageChange={loadRequests}
              />
            </>
          )}
        </div>
      </section>

      <section className="space-y-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-md shadow-slate-950/60">
          <h2 className="mb-3 text-base sm:text-lg font-semibold text-white">
            Suggested Volunteers
          </h2>
          {selectedRequest ? (
            <>
              <p className="mb-3 text-xs sm:text-sm text-slate-300">
                Based on request:{' '}
                <span className="font-semibold text-slate-50">
                  {selectedRequest.title || selectedRequest.category}
                </span>
              </p>
              <div className="flex flex-col gap-3">
                {suggestedVolunteers.map((v) => (
                  <VolunteerCard key={v.id || v._id} volunteer={v} />
                ))}
                {suggestedVolunteers.length === 0 && (
                  <p className="text-sm text-slate-400">
                    No suggestions yet. Volunteers may update their availability soon.
                  </p>
                )}
              </div>
            </>
          ) : (
            <p className="text-sm text-slate-400">
              Select a request to see the top 3 suggested volunteers.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;


