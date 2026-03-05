import React from 'react';

const getColor = (score) => {
  if (score >= 80) return 'bg-emerald-500';
  if (score >= 50) return 'bg-amber-400';
  return 'bg-rose-500';
};

const getLabel = (score) => {
  if (score >= 80) return 'High';
  if (score >= 50) return 'Medium';
  return 'Low';
};

const MatchScoreBar = ({ score }) => {
  const value = Math.max(0, Math.min(100, score || 0));
  const colorClass = getColor(value);
  const label = getLabel(value);

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[11px] text-slate-300">
        <span>Match Score</span>
        <span>
          {value}% ({label})
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-slate-800">
        <div
          className={`h-full rounded-full ${colorClass} transition-[width] duration-300`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

export default MatchScoreBar;



