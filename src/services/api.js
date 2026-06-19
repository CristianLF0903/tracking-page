import { API_URL } from '../utils/constants';

/**
 * Cliente HTTP base para realizar peticiones a la API
 */
export const apiClient = async (params = {}, token, baseUrl = API_URL) => {
  const queryParams = new URLSearchParams({
    token: token,
    ...params
  });

  const url = `${baseUrl}?${queryParams.toString()}`;

  try {
    const response = await fetch(url, { referrerPolicy: 'no-referrer' });
    const text = await response.text();
    
    try {
      const data = JSON.parse(text);
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Error en la petición');
      }
      return data;
    } catch (e) {
      console.error('Failed to parse JSON. Response text:', text);
      throw new Error('La respuesta del servidor no es un JSON válido. Revisa la consola para más detalles.');
    }
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
