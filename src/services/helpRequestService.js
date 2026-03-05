import api from './api.js';

export const createHelpRequest = async (payload) => {
  const { data } = await api.post('/help-requests', payload);
  return data;
};

export const getHelpRequests = async (params = {}) => {
  const { data } = await api.get('/help-requests', { params });
  return data;
};

export const getHelpRequestById = async (id) => {
  const { data } = await api.get(`/help-requests/${id}`);
  return data;
};

export const acceptRequest = async (id) => {
  const { data } = await api.put(`/help-requests/${id}/accept`);
  return data;
};

export const completeRequest = async (id) => {
  const { data } = await api.put(`/help-requests/${id}/complete`);
  return data;
};

export const deleteRequest = async (id) => {
  const { data } = await api.delete(`/help-requests/${id}`);
  return data;
};

export const triggerManualReminder = async (id) => {
  const { data } = await api.post(`/help-requests/${id}/remind`);
  return data;
};

export const detectCategory = async (description) => {
  const { data } = await api.post('/help-requests/detect-category', { description });
  return data;
};

export const getVolunteerSuggestions = async (id) => {
  const { data } = await api.get(`/help-requests/${id}/suggestions`);
  return data;
};


