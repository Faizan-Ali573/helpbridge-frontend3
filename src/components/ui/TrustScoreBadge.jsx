import React from 'react';

const TrustScoreBadge = ({ score }) => {
  const value = Math.max(0, Math.min(100, score || 0));
  let color = 'bg-slate-500';
  if (value >= 80) color = 'bg-emerald-500';
  else if (value >= 60) color = 'bg-sky-500';
  else if (value >= 40) color = 'bg-amber-400';
  else color = 'bg-rose-500';

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold text-white ${color}`}
    >
      Trust: {value}
    </span>
  );
};

export default TrustScoreBadge;



