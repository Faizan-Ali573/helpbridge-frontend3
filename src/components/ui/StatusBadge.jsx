import React from 'react';

const getStatusClasses = (status) => {
  switch (status) {
    case 'PENDING':
      return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    case 'ACCEPTED':
      return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
    case 'COMPLETED':
      return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    case 'EXPIRED':
      return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
    default:
      return 'bg-slate-500/20 text-slate-300 border-slate-500/40';
  }
};

const StatusBadge = ({ status, expired }) => {
  const label = expired ? 'EXPIRED' : status || 'UNKNOWN';
  const classes = getStatusClasses(expired ? 'EXPIRED' : status);

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${classes}`}
    >
      {label}
    </span>
  );
};

export default StatusBadge;



