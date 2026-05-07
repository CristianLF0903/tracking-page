import { useState, useCallback } from 'react';
import { trackingService } from '../services/trackingService';
import { useAuthStore } from '../store/useAuthStore';

export const useTracking = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token, fetchOrdersToken } = useAuthStore();

  const fetchTracking = useCallback(async (id) => {
    if (!id || !token) return;

    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      // 1. Intentar con la API principal
      try {
        const response = await trackingService.search(id, token);
        if (response.success && response.data && response.data.length > 0) {
          setData(response.data);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        // Si es un error de "no encontrado", seguimos al fallback
        // Si es otro tipo de error (red, auth), lo lanzamos
        if (!err.message.includes('No se encontró')) {
          throw err;
        }
      }

      // 2. Si no se encontró y es un número de orden, intentar con la API de respaldo
      const isOrder = id.trim().startsWith('#');
      if (isOrder) {
        const ordersToken = await fetchOrdersToken();
        if (ordersToken) {
          const fallbackResponse = await trackingService.searchFallback(id, ordersToken);
          if (fallbackResponse.success && fallbackResponse.data && fallbackResponse.data.length > 0) {
            setData(fallbackResponse.data);
            setIsLoading(false);
            return;
          }
        }
      }

      // 3. Si nada funcionó
      setError(`No se encontró información para el identificador: ${id}`);
    } catch (err) {
      console.error('Tracking Hook Error:', err);
      setError(err.message || 'Error al consultar el seguimiento');
    } finally {
      setIsLoading(false);
    }
  }, [token, fetchOrdersToken]);

  return {
    data,
    isLoading,
    error,
    fetchTracking
  };
};
