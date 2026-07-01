/**
 * Inicializa la comunicación entre la app y la página padre cuando se usa como iframe.
 * Recibe fetchTracking y reset del store para controlar la vista sin cambiar la URL.
 */
const getAllowedParentOrigins = () => {
	const origins =
		import.meta.env.VITE_IFRAME_PARENT_ORIGINS ||
		import.meta.env.VITE_IFRAME_PARENT_ORIGIN
	if (!origins) {
		return []
	}

	return origins
		.split(',')
		.map((origin) => origin.trim())
		.filter(Boolean)
}

const getReferrerOrigin = () => {
	try {
		return new URL(document.referrer).origin
	} catch {
		return ''
	}
}

export const initIframeMessaging = (fetchTracking, resetTracking) => {
	const isInIframe = window.parent !== window

	if (!isInIframe) {
		return
	}

	const allowedParentOrigins = getAllowedParentOrigins()
	const parentOrigin = allowedParentOrigins.length
		? allowedParentOrigins[0]
		: getReferrerOrigin() || '*'

	const isAllowedOrigin = (origin) => {
		if (allowedParentOrigins.length === 0) {
			return (
				origin === getReferrerOrigin() ||
				origin === parentOrigin ||
				parentOrigin === '*'
			)
		}

		return allowedParentOrigins.includes(origin)
	}

	const sendParentMessage = (message) => {
		window.parent.postMessage(message, parentOrigin)
	}

	const sendHeight = () => {
		sendParentMessage({
			type: 'IFRAME_HEIGHT',
			height: document.documentElement.scrollHeight,
		})
	}

	window.addEventListener('message', (event) => {
		if (!isAllowedOrigin(event.origin)) {
			return
		}

		const { type, payload } = event.data || {}

		switch (type) {
			case 'NAVIGATE_TRACKING':
				if (payload?.id) {
					const rawId = String(payload.id).trim()
					const isOrder = rawId.startsWith('#')
					fetchTracking(isOrder ? 'order' : 'tracking', rawId.replace(/^#/, ''))
					sendParentMessage({
						type: 'VIEW_CHANGED',
						payload: { view: 'tracking', id: payload.id },
					})
				}
				break

			case 'NAVIGATE_HOME':
				resetTracking()
				sendParentMessage({
					type: 'VIEW_CHANGED',
					payload: { view: 'home' },
				})
				break

			case 'GET_CURRENT_PATH':
				sendParentMessage({
					type: 'CURRENT_PATH',
					payload: { view: 'active' },
				})
				break

			default:
				break
		}
	})

	window.addEventListener('load', sendHeight)

	if ('ResizeObserver' in window) {
		new ResizeObserver(sendHeight).observe(document.documentElement)
	}

	sendParentMessage({
		type: 'IFRAME_READY',
		payload: { timestamp: Date.now() },
	})
}
