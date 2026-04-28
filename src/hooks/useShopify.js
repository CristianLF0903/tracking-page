import { useState, useCallback } from 'react';
import { shopifyService } from '../services/shopifyService';

/**
 * Custom hook preparado para gestionar la consulta de datos de Shopify
 */
export const useShopify = () => {
  const [orderStatus, setOrderStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrderStatus = useCallback(async (orderId) => {
    setIsLoading(true);
    try {
      const status = await shopifyService.getOrderStatus(orderId);
      setOrderStatus(status);
    } catch (error) {
      setOrderStatus(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    orderStatus,
    isLoading,
    fetchOrderStatus
  };
};
