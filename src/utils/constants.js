export const API_URL = import.meta.env.VITE_TRACKING_API_URL;
export const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;
export const TOKEN_AUTH_URL = import.meta.env.VITE_TOKEN_AUTH_URL;

export const STATUS_MAP = {
  PREPARING: 'Preparando',
  DISPATCHED: 'Despachado',
  IN_TRANSIT: 'En camino',
  DELIVERED: 'Entregado',
};

export const STATUS_FLOW = [
  'Preparando',
  'Despachado',
  'En camino',
  'Entregado',
];
export const ORDERS_API_URL = import.meta.env.VITE_ORDERS_API_URL;
export const ORDERS_TOKEN_KEY = import.meta.env.VITE_ORDERS_TOKEN_KEY;
