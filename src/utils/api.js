import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 8000,
});

export const fetchStats = () => api.get('/stats').then((r) => r.data);
export const fetchCommunities = () => api.get('/communities').then((r) => r.data);
export const fetchServers = (params) => api.get('/servers', { params }).then((r) => r.data);
export const fetchChannels = (params) => api.get('/channels', { params }).then((r) => r.data);

export default api;
