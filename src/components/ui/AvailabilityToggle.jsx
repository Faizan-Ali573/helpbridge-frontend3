import React from 'react';

const AvailabilityToggle = ({ available, onToggle }) => {
  return (
    <button
      onClick={() => onToggle(!available)}
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm transition
        ${available ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-slate-600 hover:bg-slate-500'}`}
    >
      <span
        className={`mr-2 h-2 w-2 rounded-full ${
          available ? 'bg-emerald-300' : 'bg-slate-300'
        }`}
      />
      {available ? 'Available' : 'Not Available'}
    </button>
  );
};

export default AvailabilityToggle;



