import { apiClient } from './api'
import { ORDERS_API_URL } from '../utils/constants'

// Hojas de la API de respaldo a consultar, en orden de prioridad
const FALLBACK_SHEETS = ['Pedidos Online', 'Omnicanalidad']

// El número de pedido siempre se consulta con # al inicio, lo escriba o no el usuario
const withHash = (value) => (value.startsWith('#') ? value : `#${value}`)

const hasResults = (response) => {
	if (!response?.success) return false
	return Array.isArray(response.data)
		? response.data.length > 0
		: Boolean(response.data)
}

const normalizeProducts = (productos) => {
	if (!productos) return []

	if (typeof productos === 'string') {
		try {
			const parsed = JSON.parse(productos)
			return Array.isArray(parsed) ? parsed : [parsed]
		} catch (e) {
			console.error('Error parsing order.productos JSON:', e, productos)
			return []
		}
	}

	if (Array.isArray(productos)) return productos

	if (typeof productos === 'object' && productos !== null) return [productos]

	return []
}

/**
 * Servicio para consultar pedidos en la API de respaldo (Admin)
 */
export const ordersService = {
	/**
	 * Busca un pedido recorriendo las hojas de respaldo en orden hasta
	 * encontrar resultados con datos reales (no se detiene en una hoja vacía)
	 */
	search: async (value, token) => {
		const params = {
			column: 'pedido_numero',
			value: withHash(value.trim()),
		}

		let response = null
		let lastError = null
		for (const sheet of FALLBACK_SHEETS) {
			try {
				response = await apiClient({ ...params, sheet }, token, ORDERS_API_URL)
				if (hasResults(response)) break
			} catch (err) {
				lastError = err
				response = null
			}
		}

		if (!response) {
			if (lastError) throw lastError
			return { success: false, data: null }
		}

		// Normalizamos la respuesta para que coincida con el formato de la UI
		if (hasResults(response)) {
			const orders = Array.isArray(response.data)
				? response.data
				: [response.data]

			response.data = orders.map((order) => ({
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
				_products: normalizeProducts(order.productos),
			}))
		}

		return response
	},
}
