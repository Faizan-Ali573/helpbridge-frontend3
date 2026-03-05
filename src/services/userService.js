import api from './api.js';

export const updateAvailability = async (userId, available) => {
  const { data } = await api.put(`/users/${userId}/availability`, { available });
  return data;
};

export const getVolunteerProfile = async (userId) => {
  const { data } = await api.get(`/users/${userId}`);
  return data;
};

export const getTrustScore = async (userId) => {
  const { data } = await api.get(`/users/${userId}/trustScore`);
  return data;
};


