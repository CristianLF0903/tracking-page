import { useState, useCallback } from 'react';
import { trackingService } from '../services/trackingService';

/**
 * Custom hook para gestionar el estado de la consulta de tracking
 */
export const useTracking = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTracking = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await trackingService.search(id);
      setData(response.data);
      if (response.count === 0) {
        setError('No se encontró información para el número ingresado.');
      }
    } catch (err) {
      setError(err.message || 'Ocurrió un error al consultar el estado de tu pedido.');
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    data,
    isLoading,
    error,
    fetchTracking,
    reset: () => {
      setData(null);
      setError(null);
      setIsLoading(false);
    }
  };
};
