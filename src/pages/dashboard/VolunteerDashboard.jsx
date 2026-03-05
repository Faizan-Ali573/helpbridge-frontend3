import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import * as userService from '../../services/userService.js';
import * as helpRequestService from '../../services/helpRequestService.js';
import * as reviewService from '../../services/reviewService.js';
import RequestCard from '../../components/ui/RequestCard.jsx';
import TrustScoreBadge from '../../components/ui/TrustScoreBadge.jsx';
import AvailabilityToggle from '../../components/ui/AvailabilityToggle.jsx';
import Pagination from '../../components/common/Pagination.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import toast from 'react-hot-toast';

const PAGE_SIZE = 5;

const VolunteerDashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [available, setAvailable] = useState(false);
  const [nearbyRequests, setNearbyRequests] = useState([]);
  const [nearbyPagination, setNearbyPagination] = useState({ total: 0, page: 1 });
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingNearby, setLoadingNearby] = useState(false);
  const [loadingAccepted, setLoadingAccepted] = useState(false);

  const loadProfile = async () => {
    if (!user) return;
    setLoadingProfile(true);
    try {
      const data = await userService.getVolunteerProfile(user.id);
      setProfile(data);
      setAvailable(data.available);
    } catch (err) {
      // handled
    } finally {
      setLoadingProfile(false);
    }
  };

  const loadNearby = async (page = 1) => {
    setLoadingNearby(true);
    try {
      const data = await helpRequestService.getHelpRequests({
        page,
        pageSize: PAGE_SIZE,
        nearby: true,
      });
      const items = data.data || data.items || data.results || [];
      setNearbyRequests(items);
      setNearbyPagination({
        total: data.total || data.count || items.length,
        page: data.page || page,
      });
    } catch (err) {
      // handled
    } finally {
      setLoadingNearby(false);
    }
  };

  const loadAccepted = async () => {
    if (!user) return;
    setLoadingAccepted(true);
    try {
      const data = await helpRequestService.getHelpRequests({
        acceptedBy: user.id,
      });
      const items = data.data || data.items || data.results || [];
      setAcceptedRequests(items);
    } catch (err) {
      // handled
    } finally {
      setLoadingAccepted(false);
    }
  };

  const loadReviews = async () => {
    if (!user) return;
    try {
      const data = await reviewService.getReviewsForVolunteer(user.id);
      setReviews(data || []);
    } catch (err) {
      // handled
    }
  };

  useEffect(() => {
    if (!user) return;
    loadProfile();
    loadNearby(1);
    loadAccepted();
    loadReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleToggleAvailability = async (value) => {
    if (!user) return;
    try {
      setAvailable(value);
      await userService.updateAvailability(user.id, value);
      toast.success(`Availability updated to ${value ? 'Available' : 'Not available'}`);
      if (value) loadNearby(nearbyPagination.page);
    } catch (err) {
      setAvailable(!value);
    }
  };

  const handleAccept = async (request) => {
    try {
      await helpRequestService.acceptRequest(request.id);
      toast.success('Request accepted');
      loadNearby(nearbyPagination.page);
      loadAccepted();
    } catch (err) {
      // handled
    }
  };

  const handleComplete = async (request) => {
    try {
      await helpRequestService.completeRequest(request.id);
      toast.success('Request marked as completed');
      loadAccepted();
    } catch (err) {
      // handled
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1.6fr]">
      <section className="space-y-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-md shadow-slate-950/60">
          <h2 className="mb-3 text-base sm:text-lg font-semibold text-white">
            My Volunteer Profile
          </h2>
          {loadingProfile ? (
            <LoadingSpinner />
          ) : (
            <div className="space-y-2 text-sm text-slate-200">
              <p>
                <span className="font-semibold text-slate-300">Name:</span> {profile?.name}
              </p>
              <p>
                <span className="font-semibold text-slate-300">Email:</span> {profile?.email}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold text-slate-300">Trust score:</span>
                <TrustScoreBadge score={profile?.trustScore || 0} />
              </p>
              <div className="pt-2">
                <AvailabilityToggle available={available} onToggle={handleToggleAvailability} />
              </div>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-md shadow-slate-950/60">
          <h3 className="mb-3 text-sm sm:text-base font-semibold text-white">
            Reviews Received
          </h3>
          <div className="flex flex-col gap-2">
            {reviews.map((rev) => (
              <div
                key={rev._id}
                className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-xs sm:text-sm text-slate-200 shadow-sm"
              >
                <p className="mb-1">{rev.comment}</p>
                <span className="text-[11px] text-slate-400">Rating: {rev.rating}/5</span>
              </div>
            ))}
            {reviews.length === 0 && (
              <p className="text-xs sm:text-sm text-slate-400">No reviews yet.</p>
            )}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-md shadow-slate-950/60">
          <h2 className="mb-3 text-base sm:text-lg font-semibold text-white">
            Nearby Requests
          </h2>
          {loadingNearby ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className="flex flex-col gap-3">
                {nearbyRequests.map((req) => (
                  <RequestCard
                    key={req._id}
                    request={req}
                    isVolunteerView
                    onAccept={handleAccept}
                    onComplete={handleComplete}
                  />
                ))}
                {nearbyRequests.length === 0 && (
                  <p className="text-xs sm:text-sm text-slate-400">
                    No nearby requests at the moment.
                  </p>
                )}
              </div>
              <Pagination
                page={nearbyPagination.page}
                total={nearbyPagination.total}
                pageSize={PAGE_SIZE}
                onPageChange={loadNearby}
              />
            </>
          )}
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-md shadow-slate-950/60">
          <h2 className="mb-3 text-base sm:text-lg font-semibold text-white">
            Accepted Requests
          </h2>
          {loadingAccepted ? (
            <LoadingSpinner />
          ) : (
            <div className="flex flex-col gap-3">
              {acceptedRequests.map((req) => (
                <RequestCard
                  key={req._id}
                  request={req}
                  isVolunteerView
                  onAccept={handleAccept}
                  onComplete={handleComplete}
                />
              ))}
              {acceptedRequests.length === 0 && (
                <p className="text-xs sm:text-sm text-slate-400">No accepted requests yet.</p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default VolunteerDashboard;


