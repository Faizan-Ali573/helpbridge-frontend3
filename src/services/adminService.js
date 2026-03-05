import api from './api.js';

export const getReports = async () => {
  const { data } = await api.get('/reports');
  return data;
};

export const blockUser = async (reportId) => {
  const { data } = await api.put(`/reports/${reportId}`, { blockUser: true });
  return data;
};

export const unblockUser = async (reportId) => {
  const { data } = await api.put(`/reports/${reportId}`, { blockUser: false });
  return data;
};

export const getAnalytics = async () => {
  const { data } = await api.get('/analytics');
  return data;
};


