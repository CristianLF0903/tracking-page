import { create } from 'zustand';
import { TOKEN_AUTH_URL, TOKEN_KEY } from '../utils/constants';

export const useAuthStore = create((set) => ({
  token: null,
  isLoading: true,
  error: null,

  fetchToken: async () => {
    const url = `${TOKEN_AUTH_URL}?action=getToken&key=${TOKEN_KEY}`;
    console.log('Fetching token from:', url);
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log('Auth API Response:', data);
      
      if (data.success && data.token) {
        set({ token: data.token, isLoading: false });
      } else {
        throw new Error(data.message || 'Error al obtener el token');
      }
    } catch (err) {
      console.error('Auth Store Error:', err);
      set({ error: err.message, isLoading: false });
    }
  },
}));
