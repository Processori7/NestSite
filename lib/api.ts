// lib/api.ts
const API_BASE_URL = '/api';

async function fetchWithAuth(url: string, options?: RequestInit) {
  const token = localStorage.getItem('auth_token');
  const headers = {
    ...options?.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    'Content-Type': 'application/json',
  };

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    // Здесь можно добавить более сложную обработку ошибок, например,
    // перенаправление на страницу входа при 401 Unauthorized
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
}

export const api = {
  get: async <T>(url: string): Promise<T> => {
    const response = await fetchWithAuth(url, { method: 'GET' });
    return response.json();
  },

  post: async <T>(url: string, data: any): Promise<T> => {
    const response = await fetchWithAuth(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  put: async <T>(url: string, data: any): Promise<T> => {
    const response = await fetchWithAuth(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  del: async <T>(url: string): Promise<T> => {
    const response = await fetchWithAuth(url, { method: 'DELETE' });
    return response.json();
  },
};