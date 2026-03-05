import React from 'react';
import TrustScoreBadge from './TrustScoreBadge.jsx';
import MatchScoreBar from './MatchScoreBar.jsx';

const VolunteerCard = ({ volunteer }) => {
  const { name, distance, trustScore, matchScore } = volunteer;

  return (
    <div className="group flex flex-col gap-1.5 rounded-xl border border-slate-800 bg-slate-900/70 p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-hb-secondary/60 hover:shadow-lg">
      <div className="flex items-center justify-between gap-2">
        <strong className="text-sm text-slate-50">{name}</strong>
        <TrustScoreBadge score={trustScore} />
      </div>
      {(distance != null || volunteer.distanceInKm != null) && (
        <span className="text-[11px] text-slate-400">
          Distance: {(distance ?? volunteer.distanceInKm).toFixed(1)} km
        </span>
      )}
      {matchScore != null && <MatchScoreBar score={matchScore} />}
    </div>
  );
};

export default VolunteerCard;



