import { create } from 'zustand'
import { trackingService } from '../services/trackingService'
import { useAuthStore } from './useAuthStore'

export const useTrackingStore = create((set) => ({
  data: null,
  isLoading: false,
  error: null,
  searchId: null,

  fetchTracking: async (id) => {
    if (!id) return

    const { token, fetchOrdersToken } = useAuthStore.getState()

    set({ isLoading: true, error: null, data: null, searchId: id })

    if (!token) {
      set({ error: 'No se pudo conectar con el servicio. Por favor recarga la página.', isLoading: false })
      return
    }

    const dedupe = (items) => {
      const seen = new Set()
      return items.filter(item => {
        const key = item._fulfillment_id ?? item._tracking_number ?? JSON.stringify(item)
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })
    }

    try {
      try {
        const response = await trackingService.search(id, token)
        if (response.success && response.data?.length > 0) {
          set({ data: dedupe(response.data), isLoading: false })
          return
        }
      } catch (err) {
        if (!err.message.includes('No se encontró')) throw err
      }

      const isOrder = id.trim().startsWith('#')
      if (isOrder) {
        const ordersToken = await fetchOrdersToken()
        if (ordersToken) {
          const fallbackResponse = await trackingService.searchFallback(id, ordersToken)
          if (fallbackResponse.success && fallbackResponse.data?.length > 0) {
            set({ data: dedupe(fallbackResponse.data), isLoading: false })
            return
          }
        }
      }

      set({ error: `No se encontró información para el identificador: ${id}`, isLoading: false })
    } catch (err) {
      console.error('Tracking Store Error:', err)
      set({ error: err.message || 'Error al consultar el seguimiento', isLoading: false })
    }
  },

  reset: () => set({ data: null, isLoading: false, error: null, searchId: null }),
}))
