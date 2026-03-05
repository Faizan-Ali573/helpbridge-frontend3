import React from 'react';
import { Link } from 'react-router-dom';
import MatchScoreBar from './MatchScoreBar.jsx';
import StatusBadge from './StatusBadge.jsx';
import TrustScoreBadge from './TrustScoreBadge.jsx';

const isExpired = (expiresAt) => {
  if (!expiresAt) return false;
  return new Date(expiresAt) < new Date();
};

const RequestCard = ({ request, onAccept, onComplete, isVolunteerView, isUserView }) => {
  const expired = isExpired(request.expiresAt);
  const distance = request.matchInfo?.distance;
  const matchScore = request.matchInfo?.score;
  const trustScore = request.matchInfo?.trustScore || request.volunteer?.trustScore;

  return (
    <div className="group flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-900/70 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-hb-primary/60 hover:shadow-lg">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm sm:text-base font-semibold text-slate-50">
          {request.title || request.category}
        </h3>
        <StatusBadge status={request.status} expired={expired} />
      </div>

      {expired && (
        <span className="text-[11px] font-medium text-rose-300">This request has expired.</span>
      )}

      {request.description && (
        <p className="text-xs sm:text-sm text-slate-300">{request.description}</p>
      )}

      <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
        {distance != null && <span>Distance: {distance.toFixed(1)} km</span>}
        {trustScore != null && <TrustScoreBadge score={trustScore} />}
      </div>

      {matchScore != null && <MatchScoreBar score={matchScore} />}

      <div className="mt-2 flex items-center justify-between">
        <Link
          to={`/requests/${request.id}`}
          className="text-xs sm:text-sm font-medium text-hb-primary hover:text-hb-primary/80"
        >
          View details
        </Link>

        <div className="flex items-center gap-2">
          {isVolunteerView && request.status === 'PENDING' && !expired && (
            <button
              onClick={() => onAccept?.(request)}
              className="rounded-md bg-hb-primary px-3 py-1 text-xs font-semibold text-white shadow-sm hover:bg-blue-600"
            >
              Accept
            </button>
          )}
          {isVolunteerView && request.status === 'ACCEPTED' && !expired && (
            <button
              onClick={() => onComplete?.(request)}
              className="rounded-md bg-emerald-500 px-3 py-1 text-xs font-semibold text-white shadow-sm hover:bg-emerald-600"
            >
              Complete
            </button>
          )}
          {isUserView && request.status === 'PENDING' && !expired && (
            <span className="text-[11px] text-slate-400">Waiting for volunteer...</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestCard;



