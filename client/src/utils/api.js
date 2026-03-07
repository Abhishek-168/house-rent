import { API_BASE } from '../config';

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const contentType = res.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await res.json() : { message: await res.text() };
  if (!res.ok) {
    const detail = data.error ? `: ${data.error}` : '';
    throw new Error((data.message || `Request failed (${res.status})`) + detail);
  }
  return data;
}
