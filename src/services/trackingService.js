import { apiClient } from './api';

/**
 * Servicio para consultar el tracking de un pedido o guía
 */
export const trackingService = {
  /**
   * Busca un pedido por ID de pedido o número de guía
   * @param {string} id 
   */
  search: async (id) => {
    const isOrder = id.trim().startsWith('#');
    const params = {
      column: isOrder ? 'order_id' : 'tracking_number',
      value: id.trim()
    };

    return await apiClient(params);
  }
};
