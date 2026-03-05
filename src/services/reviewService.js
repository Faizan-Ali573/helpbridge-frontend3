import api from './api.js';

export const createReview = async (payload) => {
  const { data } = await api.post('/reviews', payload);
  return data;
};

export const getReviewsForVolunteer = async (volunteerId) => {
  const { data } = await api.get(`/reviews/user/${volunteerId}`);
  return data;
};


