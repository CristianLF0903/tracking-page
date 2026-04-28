/**
 * Servicio preparado para la futura integración con Shopify via Proxy Backend
 */
const PROXY_URL = import.meta.env.VITE_SHOPIFY_PROXY_URL;

export const shopifyService = {
  /**
   * Obtiene el metafield custom.estado_pedido de un pedido de Shopify
   * @param {string} orderId 
   */
  getOrderStatus: async (orderId) => {
    if (!PROXY_URL) {
      console.warn('Shopify Proxy URL no configurada');
      return null;
    }

    try {
      const response = await fetch(`${PROXY_URL}/api/shopify/order/${orderId}/metafield?key=custom.estado_pedido`);
      const data = await response.json();
      return data.value;
    } catch (error) {
      console.error('Error al consultar Shopify Metafield:', error);
      return null;
    }
  }
};
