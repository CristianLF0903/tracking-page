import Card from '../components/ui/Card'
import SearchForm from '../components/tracking/SearchForm'
import { Hash, PackageSearch, PackageCheck } from 'lucide-react'
import Logo from '../assets/madeberto-pedidos.webp'
import { useTrackingStore } from '../store/useTrackingStore'

const HomePage = () => {
	const fetchTracking = useTrackingStore((state) => state.fetchTracking)

	const handleSearch = (type, value) => {
		fetchTracking(type, value.trim())
	}

	return (
		<div className="flex flex-col items-center justify-center py-10 md:py-20">
			<div className="text-center mb-12 animate-in fade-in slide-in-from-top-6 duration-700">
				<img
					src={Logo}
					alt="Madecentro"
					className="mx-auto mb-6"
					height="200"
					width="200"
				/>
				{/* <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-6">
					<PackageSearch size={40} />
				</div> */}
				<h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
					Consulta tu pedido
				</h1>
				<p className="text-lg text-secondary max-w-lg mx-auto">
					Rastrea tus compras de Madecentro.com de forma fácil y rápida con tu
					número de pedido o guía.
				</p>
			</div>

			<Card className="w-full max-w-xl p-6 md:p-8" animate>
				<SearchForm onSearch={handleSearch} />
			</Card>

			<div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-3xl">
				<div className="text-center">
					<Hash className="text-primary mx-auto mb-1" size={28} strokeWidth={2.5} />
					<h3 className="font-bold text-secondary-dark mb-2">
						Ingresa tu pedido o guía
					</h3>
					<p className="text-sm text-secondary">
						Digita el número de tu pedido o guía que recibiste en tu correo de
						confirmación.
					</p>
				</div>
				<div className="text-center">
					<PackageSearch className="text-primary mx-auto mb-1" size={28} strokeWidth={2.5} />
					<h3 className="font-bold text-secondary-dark mb-2">
						Estado de tu compra
					</h3>
					<p className="text-sm text-secondary">
						Haz seguimiento del estado de tu pedido y conoce en qué etapa se
						encuentra tu compra.
					</p>
				</div>
				<div className="text-center">
					<PackageCheck className="text-primary mx-auto mb-1" size={28} strokeWidth={2.5} />
					<h3 className="font-bold text-secondary-dark mb-2">
						¡Recibe y disfruta!
					</h3>
					<p className="text-sm text-secondary">
						Recibe tu pedido en la puerta de tu casa y disfruta de tus
						productos.
					</p>
				</div>
			</div>
		</div>
	)
}

export default HomePage
