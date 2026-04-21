import axios from 'axios';

const API_URL = 'https://marvel-backend-1.onrender.com';

const api = async ({ route, params = {} }) => {
  const res = await axios.get(`${API_URL}${route}`, { params });
  return res.data;
};

export default api;