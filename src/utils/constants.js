export const API_URL = import.meta.env.VITE_TRACKING_API_URL;
export const JWT_TOKEN = import.meta.env.VITE_TRACKING_JWT_TOKEN;

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
