import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 8000,
});

// ── Auth interceptor: attach token to POST/PUT/DELETE ─────────
api.interceptors.request.use((config) => {
  if (['post', 'put', 'delete'].includes(config.method)) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ── Stats ──────────────────────────────────────────────────────
export const fetchStats       = () => api.get('/stats').then(r => r.data);
export const recordVisit      = () => api.post('/stats/visit').then(r => r.data);
export const fetchChartData   = () => api.get('/stats/chart').then(r => r.data);
export const fetchCommunities = () => api.get('/communities').then(r => r.data);
export const fetchServers     = (params) => api.get('/servers', { params }).then(r => r.data);
export const fetchChannels    = (params) => api.get('/channels', { params }).then(r => r.data);

// ── Instagram ─────────────────────────────────────────────────
export const fetchInstagram   = (params) => api.get('/instagram', { params }).then(r => r.data);
export const createInstagram  = (data)   => api.post('/instagram', data).then(r => r.data);
export const updateInstagram  = (id, data) => api.put(`/instagram/${id}`, data).then(r => r.data);
export const deleteInstagram  = (id)     => api.delete(`/instagram/${id}`).then(r => r.data);

// ── TikTok ────────────────────────────────────────────────────
export const fetchTikTok      = (params) => api.get('/tiktok', { params }).then(r => r.data);
export const createTikTok     = (data)   => api.post('/tiktok', data).then(r => r.data);
export const updateTikTok     = (id, data) => api.put(`/tiktok/${id}`, data).then(r => r.data);
export const deleteTikTok     = (id)     => api.delete(`/tiktok/${id}`).then(r => r.data);

// ── YouTube ───────────────────────────────────────────────────
export const fetchYouTube     = (params) => api.get('/youtube', { params }).then(r => r.data);
export const createYouTube    = (data)   => api.post('/youtube', data).then(r => r.data);
export const updateYouTube    = (id, data) => api.put(`/youtube/${id}`, data).then(r => r.data);
export const deleteYouTube    = (id)     => api.delete(`/youtube/${id}`).then(r => r.data);

// ── Roblox ────────────────────────────────────────────────────
export const fetchRoblox      = (params) => api.get('/roblox', { params }).then(r => r.data);
export const createRoblox     = (data)   => api.post('/roblox', data).then(r => r.data);
export const updateRoblox     = (id, data) => api.put(`/roblox/${id}`, data).then(r => r.data);
export const deleteRoblox     = (id)     => api.delete(`/roblox/${id}`).then(r => r.data);

// ── Donations ─────────────────────────────────────────────────
export const fetchDonations   = () => api.get('/donations').then(r => r.data);
export const fetchTopDonors   = () => api.get('/donations/top').then(r => r.data);
export const submitDonation   = (data) => api.post('/donations', data).then(r => r.data);

// ── Servers CRUD ──────────────────────────────────────────────
export const createServer     = (data)   => api.post('/servers', data).then(r => r.data);
export const updateServer     = (id, data) => api.put(`/servers/${id}`, data).then(r => r.data);
export const deleteServer     = (id)     => api.delete(`/servers/${id}`).then(r => r.data);

// ── Channels CRUD ─────────────────────────────────────────────
export const createChannel    = (data)   => api.post('/channels', data).then(r => r.data);
export const updateChannel    = (id, data) => api.put(`/channels/${id}`, data).then(r => r.data);
export const deleteChannel    = (id)     => api.delete(`/channels/${id}`).then(r => r.data);

export default api;
