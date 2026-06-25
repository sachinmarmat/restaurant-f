import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

export const restaurantAPI = {
  get: () => api.get('/restaurant'),
  update: (data) => api.put('/restaurant', data),
  reset: () => api.post('/restaurant/reset'),
};

export const bookingAPI = {
  getAll: () => api.get('/bookings'),
  create: (data) => api.post('/bookings', data),
  cancel: (id) => api.delete(`/bookings/${id}`),
};

export const orderAPI = {
  getAll: () => api.get('/orders'),
  create: (data) => api.post('/orders', data),
  updateStatus: (id, status) => api.patch(`/orders/${id}`, { status }),
};

export const messageAPI = {
  create: (data) => api.post('/messages', data),
};

export default api;
