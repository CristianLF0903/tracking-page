import { apiClient } from './api';

/**
 * Servicio para consultar el tracking de un pedido o guía
 */
export const trackingService = {
  /**
   * Busca un pedido por ID de pedido o número de guía
   * @param {string} id 
   * @param {string} token
   */
  search: async (id, token) => {
    const isOrder = id.trim().startsWith('#');
    const params = {
      column: isOrder ? '_fulfillment_name' : '_tracking_number',
      value: id.trim()
    };

    return await apiClient(params, token);
  }
};
