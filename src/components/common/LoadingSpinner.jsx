import React from 'react';

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center py-10 text-slate-300">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-600 border-t-hb-primary mb-3" />
    <p className="text-sm">Loading...</p>
  </div>
);

export default LoadingSpinner;



