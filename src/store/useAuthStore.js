import { create } from "zustand";
import { TOKEN_AUTH_URL, TOKEN_KEY } from "../utils/constants";

export const useAuthStore = create((set) => ({
  token: null,
  isLoading: true,
  error: null,

  fetchToken: async () => {
    const url = `${TOKEN_AUTH_URL}?action=getToken&key=${TOKEN_KEY}`;
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(url);
      const text = await response.text();

      try {
        const data = JSON.parse(text);
        if (data.success && data.data && data.data.token) {
          set({ token: data.data.token, isLoading: false });
        } else {
          throw new Error(data.message || "Error al obtener el token");
        }
      } catch (err) {
        throw new Error(
          "La respuesta de autenticación no es válida. Revisa la consola." +
            err,
          { cause: err },
        );
      }
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },
}));
