# Tracking Page

Aplicación web para consultar el estado de pedidos y guías de envío. Construida con React, Vite y Tailwind CSS, proporciona una interfaz intuitiva para rastrear envíos mediante integración con APIs externas.

## Características

- 🔍 Búsqueda de pedidos por ID de pedido o número de guía
- 📋 Vista detallada del estado del envío con timeline
- 🔄 Fallback automático a API alternativa si la principal no responde
- 📱 Interfaz responsiva con Tailwind CSS
- 🎨 Componentes UI reutilizables
- ⚡ Desarrollo rápido con Vite y HMR

## Requisitos Previos

- Node.js >= 18.x
- npm o yarn
- Acceso a las APIs de tracking y órdenes

## Instalación

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/CristianLF0903/tracking-page.git
   cd tracking-page
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crear un archivo `.env.local` en la raíz del proyecto con las siguientes variables:
   ```
   VITE_TRACKING_API_URL=
   VITE_TOKEN_KEY=
   VITE_TOKEN_AUTH_URL=
   VITE_ORDERS_API_URL=
   VITE_ORDERS_TOKEN_KEY=
   ```

## Variables de Entorno

Las siguientes variables deben configurarse en el archivo `.env.local`:

| Variable                | Descripción                                                                                      |
| ----------------------- | ------------------------------------------------------------------------------------------------ |
| `VITE_TRACKING_API_URL` | URL base de la API principal para consultar el estado de envíos y seguimiento de pedidos         |
| `VITE_TOKEN_KEY`        | Clave o parámetro de autenticación utilizado en las solicitudes a la API de tracking             |
| `VITE_TOKEN_AUTH_URL`   | URL de autenticación para obtener o validar tokens de acceso a la API                            |
| `VITE_ORDERS_API_URL`   | URL base de la API alternativa para consultar pedidos cuando la API principal no está disponible |
| `VITE_ORDERS_TOKEN_KEY` | Clave o parámetro de autenticación para la API de órdenes alternativa                            |

## Desarrollo

### Ejecutar servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173` con Hot Module Replacement (HMR) habilitado.

### Linting

```bash
npm run lint
```

Verifica la calidad del código según las reglas de ESLint configuradas.

## Despliegue

### Compilación para producción

```bash
npm run build
```

Este comando genera una carpeta `dist/` con los archivos optimizados y minificados listos para producción.

### Opciones de despliegue

#### 1. **Netlify**

- Conectar el repositorio de GitHub
- Configurar el comando de build: `npm run build`
- Directorio de salida: `dist`
- Agregar variables de entorno en la configuración de Netlify
- El despliegue se realiza automáticamente con cada push

#### 2. **Vercel**

- Importar proyecto desde GitHub
- Vercel detecta automáticamente Vite
- Configurar variables de entorno en Settings > Environment Variables
- Despliegue automático en cada push a main

#### 3. **GitHub Pages**

- Modificar `vite.config.js` para agregar base: `/nombre-del-repo/`
- Ejecutar `npm run build`
- Configurar GitHub Pages para servir desde la rama `gh-pages` o carpeta `dist`

#### 4. **Servidor propio (Node.js/Express)**

```bash
npm run build
# Servir archivos estáticos desde la carpeta dist
node -e "const express = require('express'); const app = express(); app.use(express.static('dist')); app.listen(3000)"
```

#### 5. **Docker**

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

### Variables de entorno en despliegue

Asegúrate de configurar todas las variables de entorno en la plataforma de despliegue:

- En **Netlify/Vercel**: Settings > Environment Variables
- En **Docker**: Usar archivo `.env` o pasar con `-e` en docker run
- En **Servidor propio**: Configurar en el servidor web o proceso Node.js

### Previsualizar compilación

```bash
npm run preview
```

Sirve los archivos compilados localmente para probar antes de desplegar.

## Uso como iframe

La aplicación está diseñada para funcionar como iframe en otras páginas web. Utiliza `HashRouter` para evitar conflictos de routeo con la página padre.

### Integración básica

```html
<iframe
	id="tracking-iframe"
	src="https://tu-dominio.com/#/tracking/12345"
	style="width: 100%; height: 600px; border: none; border-radius: 8px;"
	title="Rastreador de pedidos"
/>
```

### Comunicación avanzada (postMessage API)

La app soporta comunicación bidireccional con la página padre mediante `postMessage`:

```javascript
// Obtener referencia al iframe
const iframe = document.getElementById('tracking-iframe')
const iframeOrigin = 'https://tu-dominio.com' // Cambiar según tu dominio

// Esperar a que la app esté lista
window.addEventListener('message', (event) => {
	// Validar origen (IMPORTANTE por seguridad)
	if (event.origin !== iframeOrigin) return

	if (event.data.type === 'IFRAME_READY') {
		console.log('App lista:', event.data.payload)

		// Navegar a un tracking específico
		iframe.contentWindow.postMessage(
			{
				type: 'NAVIGATE_TRACKING',
				payload: { id: '12345' },
			},
			iframeOrigin,
		)
	}

	if (event.data.type === 'PATH_CHANGED') {
		console.log('Ruta actual:', event.data.payload.path)
	}
})
```

### Comandos disponibles

| Comando             | Descripción                     | Ejemplo                                                   |
| ------------------- | ------------------------------- | --------------------------------------------------------- |
| `NAVIGATE_TRACKING` | Navegar a tracking de un pedido | `{ type: 'NAVIGATE_TRACKING', payload: { id: '12345' } }` |
| `NAVIGATE_HOME`     | Volver a la página de inicio    | `{ type: 'NAVIGATE_HOME' }`                               |
| `GET_CURRENT_PATH`  | Obtener la ruta actual          | `{ type: 'GET_CURRENT_PATH' }`                            |

### Eventos que emite la app

| Evento         | Descripción                  | Payload                 |
| -------------- | ---------------------------- | ----------------------- |
| `IFRAME_READY` | La app está lista            | `{ timestamp: number }` |
| `PATH_CHANGED` | La ruta cambió               | `{ path: string }`      |
| `CURRENT_PATH` | Respuesta a GET_CURRENT_PATH | `{ path: string }`      |

### Ejemplo completo

```html
<!DOCTYPE html>
<html>
	<head>
		<title>Mi tienda</title>
	</head>
	<body>
		<h1>Estado de tu pedido</h1>

		<button id="btn-track">Ver tracking #12345</button>

		<iframe
			id="tracking-iframe"
			src="https://tracking.mitienda.com/"
			style="width: 100%; height: 600px; border: 1px solid #ccc; border-radius: 8px; margin-top: 20px;"
			title="Rastreador de pedidos"
		/>

		<script>
			const iframe = document.getElementById('tracking-iframe')
			const IFRAME_ORIGIN = 'https://tracking.mitienda.com'

			// Escuchar eventos del iframe
			window.addEventListener('message', (event) => {
				if (event.origin !== IFRAME_ORIGIN) return

				if (event.data.type === 'IFRAME_READY') {
					console.log('✓ App de tracking lista')
				}

				if (event.data.type === 'PATH_CHANGED') {
					console.log('Ruta: ' + event.data.payload.path)
				}
			})

			// Botón para navegar a tracking
			document.getElementById('btn-track').addEventListener('click', () => {
				iframe.contentWindow.postMessage(
					{
						type: 'NAVIGATE_TRACKING',
						payload: { id: '#12345' },
					},
					IFRAME_ORIGIN,
				)
			})
		</script>
	</body>
</html>
```

### Consideraciones de seguridad

⚠️ **IMPORTANTE**: En producción, siempre valida el `event.origin`:

```javascript
// ✅ CORRECTO
if (event.origin !== 'https://dominio-padre-esperado.com') return

// ❌ NO HACER ESTO
// window.addEventListener('message', (event) => {
//   // Sin validar origen = INSEGURO
// });
```

### Notas técnicas

- La app usa `HashRouter` (rutas con `#`) para compatibilidad con iframes y servidores estáticos
- Los mensajes entre iframe y padre deben estar en formato JSON
- El origen debe coincidir exactamente (protocolo, dominio, puerto)
- Compatible con cualquier marco de trabajo en la página padre (Angular, Vue, etc.)

## Estructura del Proyecto

```
├── src/
│   ├── components/       # Componentes React reutilizables
│   ├── pages/           # Páginas principales
│   ├── services/        # Servicios API
│   ├── hooks/           # Custom hooks
│   ├── store/           # Estado global (Zustand)
│   ├── utils/           # Funciones auxiliares y constantes
│   ├── assets/          # Recursos estáticos
│   └── App.jsx          # Componente raíz
├── public/              # Archivos públicos estáticos
├── dist/                # Salida compilada (generada con build)
└── vite.config.js       # Configuración de Vite
```

## Dependencias Principales

- **React 19.2.5**: Librería UI
- **Vite 8.0.10**: Bundler y herramienta de desarrollo
- **React Router DOM 7.14.2**: Enrutamiento
- **Tailwind CSS 4.2.4**: Estilos CSS
- **Zustand 5.0.12**: Gestión de estado
- **Lucide React 1.12.0**: Iconos SVG

## Solución de problemas

### CORS en desarrollo

La configuración de Vite incluye un proxy para `/api-google` que redirige a `https://script.google.com`. Ajusta esto según tus APIs.

### Error de variables de entorno

Verifica que el archivo `.env.local` existe en la raíz y que todas las variables están definidas sin espacios extra.

### Build fallando

Ejecuta `npm run lint` para detectar problemas de código y resuelve cualquier error.

## Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.
