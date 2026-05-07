import { create } from "zustand";
import { 
  TOKEN_AUTH_URL, 
  TOKEN_KEY, 
  ORDERS_API_URL, 
  ORDERS_TOKEN_KEY 
} from "../utils/constants";

export const useAuthStore = create((set, get) => ({
  token: null,
  ordersToken: null,
  isLoading: true,
  error: null,

  fetchToken: async () => {
    const url = `${TOKEN_AUTH_URL}?action=getToken&key=${TOKEN_KEY}`;
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(url);
      const text = await response.text();
      const data = JSON.parse(text);
      if (data.success && data.data?.token) {
        set({ token: data.data.token, isLoading: false });
      } else {
        throw new Error(data.message || "Error al obtener el token");
      }
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchOrdersToken: async () => {
    const { ordersToken } = get();
    if (ordersToken) return ordersToken;

    const url = `${ORDERS_API_URL}?action=getToken&key=${ORDERS_TOKEN_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.success && data.data?.token) {
        set({ ordersToken: data.data.token });
        return data.data.token;
      }
      throw new Error("No se pudo obtener el token de pedidos");
    } catch (err) {
      console.error("Error fetching orders token:", err);
      return null;
    }
  },
}));
