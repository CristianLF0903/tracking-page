import { API_URL } from '../utils/constants';

/**
 * Cliente HTTP base para realizar peticiones a la API
 */
export const apiClient = async (params = {}, token) => {
  const queryParams = new URLSearchParams({
    token: token,
    ...params
  });

  const url = `${API_URL}?${queryParams.toString()}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Error en la petición');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
