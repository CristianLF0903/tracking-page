import { apiClient } from './api';
import { ORDERS_API_URL } from '../utils/constants';

/**
 * Servicio para consultar el tracking de un pedido o guía
 */
export const trackingService = {
  /**
   * Busca un pedido por ID de pedido o número de guía en la API principal
   */
  search: async (id, token) => {
    const isOrder = id.trim().startsWith('#');
    const params = {
      column: isOrder ? '_order_name' : '_tracking_number',
      value: id.trim()
    };

    return await apiClient(params, token);
  },

  /**
   * Busca un pedido en la API de respaldo (Admin)
   */
  searchFallback: async (id, token) => {
    const params = {
      column: 'pedido_numero',
      value: id.trim()
    };

    const response = await apiClient(params, token, ORDERS_API_URL);
    
    // Normalizamos la respuesta para que coincida con el formato de la UI
    if (response.success && response.data) {
      const orders = Array.isArray(response.data) ? response.data : [response.data];
      
      response.data = orders.map(order => ({
        _fulfillment_name: order.pedido_numero,
        _fulfillment_status: 'Preparando', // Estado simulado
        _customer_first_name: order.cliente_nombre || '',
        _customer_last_name: '',
        _customer_phone: order.cliente_telefono || '',
        _customer_email: order.cliente_email || '',
        _customer_address1: order.direccion_direccion1 || '',
        _customer_city: order.direccion_ciudad || '',
        _customer_province: order.direccion_provincia || '',
        _fulfillment_created_at: order.fecha_creacion || order.fecha_registro,
        _tracking_number: 'PENDIENTE',
        _tracking_company: 'Madecentro',
        _products: order.productos // Asumimos que viene en un formato compatible o JSON string
      }));
    }

    return response;
  }
};
