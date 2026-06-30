/**
 * Inicializa la comunicación entre la app y la página padre cuando se usa como iframe.
 * Recibe fetchTracking y reset del store para controlar la vista sin cambiar la URL.
 */
export const initIframeMessaging = (fetchTracking, resetTracking) => {
	const isInIframe = window.parent !== window

	if (!isInIframe) {
		return
	}

	window.addEventListener('message', (event) => {
		// En producción, valida el origen:
		// if (event.origin !== 'https://dominio-padre.com') return;

		const { type, payload } = event.data

		switch (type) {
			case 'NAVIGATE_TRACKING':
				if (payload?.id) {
					const rawId = String(payload.id).trim()
					const isOrder = rawId.startsWith('#')
					fetchTracking(isOrder ? 'order' : 'tracking', rawId.replace(/^#/, ''))
					window.parent.postMessage(
						{ type: 'VIEW_CHANGED', payload: { view: 'tracking', id: payload.id } },
						'*',
					)
				}
				break

			case 'NAVIGATE_HOME':
				resetTracking()
				window.parent.postMessage(
					{ type: 'VIEW_CHANGED', payload: { view: 'home' } },
					'*',
				)
				break

			case 'GET_CURRENT_PATH':
				window.parent.postMessage(
					{ type: 'CURRENT_PATH', payload: { view: 'active' } },
					'*',
				)
				break

			default:
				break
		}
	})

	window.parent.postMessage(
		{ type: 'IFRAME_READY', payload: { timestamp: Date.now() } },
		'*',
	)
}
