import Card from '../ui/Card'
import { Package, User, Phone, MapPin, Mail } from 'lucide-react'
import { formatDate } from '../../utils/formatters'

const OrderCard = ({ order }) => {
	// Tomamos los datos del primer objeto ya que la info del cliente y dirección es común
	const {
		_order_name = 'N/A',
		_customer_first_name = '',
		_customer_last_name = '',
		_customer_phone = '',
		_customer_email = '',
		_customer_address1 = 'No disponible',
		_customer_city = '',
		_customer_province = '',
		_fulfillment_created_at = new Date().toISOString(),
	} = order || {}

	const customerName =
		`${_customer_first_name} ${_customer_last_name}`.trim() ||
		'Cliente No Identificado'

	return (
		<Card className="p-6 md:p-8 mb-8 border-gray-100 shadow-sm">
			<div className="flex flex-col gap-8">
				{/* Sección Superior: Título e Info Principal */}
				<div className="flex flex-col md:flex-row justify-between items-start gap-6">
					<div className="flex gap-4">
						<div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
							<Package size={28} />
						</div>
						<div>
							<div className="flex items-center gap-2 mb-1">
								<span className="text-secondary/50 text-xs font-bold uppercase tracking-wider">
									Pedido
								</span>
								<span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-bold">
									{_order_name}
								</span>
							</div>
							<h2 className="text-2xl font-bold text-secondary-dark">
								Resumen de tu pedido
							</h2>
							<p className="text-secondary/60 text-sm font-medium">
								Realizado el {formatDate(_fulfillment_created_at)}
							</p>
						</div>
					</div>
				</div>

				{/* Sección Inferior: Detalles del Cliente y Entrega (Grid) */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-50">
					<div className="flex items-start gap-3">
						<div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
							<User size={20} />
						</div>
						<div>
							<p className="text-[10px] text-secondary/40 font-bold uppercase tracking-wide mb-0.5">
								Cliente
							</p>
							<p className="text-sm font-bold text-secondary-dark">
								{customerName}
							</p>
							<div className="space-y-1.5 mt-2">
								<div className="flex items-center gap-1.5 text-secondary/60">
									<Phone size={12} />
									<span className="text-xs font-medium">
										{_customer_phone || 'N/A'}
									</span>
								</div>
								{_customer_email && (
									<div className="flex items-center gap-1.5 text-secondary/60">
										<Mail size={12} />
										<span className="text-xs font-medium truncate max-w-[150px]">
											{_customer_email}
										</span>
									</div>
								)}
							</div>
						</div>
					</div>

					<div className="flex items-start gap-3 md:col-span-2">
						<div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
							<MapPin size={20} />
						</div>
						<div>
							<p className="text-[10px] text-secondary/40 font-bold uppercase tracking-wide mb-0.5">
								Dirección de Envío
							</p>
							<p className="text-sm font-bold text-secondary-dark leading-tight">
								{_customer_address1}
							</p>
							<p className="text-xs text-secondary/50 mt-1 font-bold uppercase tracking-wider">
								{_customer_city}, {_customer_province}
							</p>
						</div>
					</div>
				</div>
			</div>
		</Card>
	)
}

export default OrderCard
