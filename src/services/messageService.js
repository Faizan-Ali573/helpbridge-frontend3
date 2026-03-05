import api from './api.js';

export const getMessages = async (requestId) => {
  const { data } = await api.get(`/messages/${requestId}`);
  return data;
};

export const sendMessage = async (payload) => {
  const { data } = await api.post('/messages', payload);
  return data;
};


