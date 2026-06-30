import { apiClient } from './api'

// El número de pedido siempre se consulta con # al inicio, lo escriba o no el usuario
const withHash = (value) => (value.startsWith('#') ? value : `#${value}`)

/**
 * Servicio para consultar el tracking de un pedido o guía en la API principal (hoja "shipments")
 */
export const trackingService = {
	search: async (type, value, token) => {
		const trimmedValue = value.trim()
		const params = {
			column: type === 'order' ? '_order_name' : '_tracking_number',
			value: type === 'order' ? withHash(trimmedValue) : trimmedValue,
			sheet: 'shipments',
		}

		return await apiClient(params, token)
	},
}
