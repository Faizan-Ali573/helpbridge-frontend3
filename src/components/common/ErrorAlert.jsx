import React from 'react';

const ErrorAlert = ({ message }) => {
  if (!message) return null;
  return (
    <div className="mb-3 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
      {message}
    </div>
  );
};

export default ErrorAlert;



