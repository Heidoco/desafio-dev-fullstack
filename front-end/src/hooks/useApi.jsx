const BASE_URL = 'http://localhost:8000';
const API_PATH = '/tasks';

const request = async (url, options = {}) => {
  const fullUrl = `${BASE_URL}${url}`;
  const headers = { 'Content-Type': 'application/json' };
  const res = await fetch(fullUrl, { ...options, headers });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res;
};

export const useApi = () => {
  const get = async (endpoint = API_PATH) => {
    const res = await request(endpoint, { method: 'GET' });
    return await res.json();
  };

  const post = async (data, endpoint = API_PATH) => {
    const body = JSON.stringify({ titulo: data.title, descricao: data.description });
    const res = await request(endpoint, { method: 'POST', body });
    return await res.json();
  };

  const put = async (id, data, endpoint = API_PATH) => {
    const url = `${endpoint}/${id}`;
    let body;
    if ('completed' in data) {
      body = JSON.stringify({ status: data.completed ? 'concluida' : 'pendente' });
    } else {
      body = JSON.stringify({ titulo: data.title, descricao: data.description });
    }
    const res = await request(url, { method: 'PUT', body });
    return await res.json();
  };

  const del = async (id, endpoint = API_PATH) => {
    const url = `${endpoint}/${id}`;
    await request(url, { method: 'DELETE' });
    return true;
  };

  return { get, post, put, del };
};
