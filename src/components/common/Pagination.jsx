import React from 'react';

const Pagination = ({ page, total, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(total / pageSize) || 1;

  return (
    <div className="mt-4 flex items-center justify-end gap-2 text-xs sm:text-sm text-slate-300">
      <button
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 disabled:opacity-40 hover:bg-slate-800 transition"
      >
        Prev
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 disabled:opacity-40 hover:bg-slate-800 transition"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;



