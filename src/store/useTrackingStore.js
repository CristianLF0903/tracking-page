import { create } from 'zustand'
import { trackingService } from '../services/trackingService'
import { ordersService } from '../services/ordersService'
import { useAuthStore } from './useAuthStore'

export const useTrackingStore = create((set) => ({
	data: null,
	isLoading: false,
	error: null,
	searchId: null,
	searchType: null,

	fetchTracking: async (type, value) => {
		if (!value) return

		const { token, fetchOrdersToken } = useAuthStore.getState()

		set({ isLoading: true, error: null, data: null, searchId: value, searchType: type })

		if (!token) {
			set({
				error:
					'No se pudo conectar con el servicio. Por favor recarga la página.',
				isLoading: false,
			})
			return
		}

		const normalizeProducts = (productsPayload) => {
			const normalizePayload = (payload) => {
				if (!payload) return []

				if (typeof payload === 'string') {
					try {
						return normalizePayload(JSON.parse(payload))
					} catch (e) {
						console.error('Error parsing products payload:', e, payload)
						return []
					}
				}

				if (Array.isArray(payload)) return payload
				if (typeof payload !== 'object' || payload === null) return []

				if (Array.isArray(payload.productos))
					return normalizePayload(payload.productos)
				if (Array.isArray(payload.products))
					return normalizePayload(payload.products)
				if (Array.isArray(payload.items)) return normalizePayload(payload.items)
				if (payload._products) return normalizePayload(payload._products)
				if (payload.productos) return normalizePayload(payload.productos)
				if (payload.products) return normalizePayload(payload.products)
				if (payload.items) return normalizePayload(payload.items)

				return [payload]
			}

			return normalizePayload(productsPayload)
		}

		const dedupeProducts = (products) => {
			const seen = new Set()
			return products.filter((product) => {
				if (!product || typeof product !== 'object') return false
				const key = product.product_id || product.sku || JSON.stringify(product)
				if (seen.has(key)) return false
				seen.add(key)
				return true
			})
		}

		const normalizeAndGroupGuides = (items) => {
			const payloadItems = Array.isArray(items) ? items : [items]

			const grouped = payloadItems.reduce((acc, item) => {
				const key =
					item._fulfillment_id ||
					item._tracking_number ||
					item._fulfillment_name ||
					JSON.stringify(item)
				if (!acc[key]) {
					acc[key] = {
						...item,
						_products: normalizeProducts(
							item._products || item.productos || item.products || item.items,
						),
					}
					return acc
				}

				const existing = acc[key]
				const nextProducts = [
					...existing._products,
					...normalizeProducts(
						item._products || item.productos || item.products || item.items,
					),
				]
				existing._products = dedupeProducts(nextProducts)
				return acc
			}, {})

			return Object.values(grouped).map((guide) => ({
				...guide,
				_products: dedupeProducts(guide._products),
			}))
		}

		try {
			try {
				const response = await trackingService.search(type, value, token)
				if (response.success && response.data?.length > 0) {
					set({
						data: normalizeAndGroupGuides(response.data),
						isLoading: false,
					})
					return
				}
			} catch (err) {
				if (!err.message.includes('No se encontró')) throw err
			}

			if (type === 'order') {
				const ordersToken = await fetchOrdersToken()
				if (ordersToken) {
					const fallbackResponse = await ordersService.search(
						value,
						ordersToken,
					)
					if (fallbackResponse.success && fallbackResponse.data?.length > 0) {
						set({
							data: normalizeAndGroupGuides(fallbackResponse.data),
							isLoading: false,
						})
						return
					}
				}
			}

			set({
				error: `No se encontró información para el identificador: ${value}`,
				isLoading: false,
			})
		} catch (err) {
			console.error('Tracking Store Error:', err)
			set({
				error: err.message || 'Error al consultar el seguimiento',
				isLoading: false,
			})
		}
	},

	reset: () =>
		set({ data: null, isLoading: false, error: null, searchId: null, searchType: null }),
}))
