import React from 'react';
import Card from '../ui/Card';
import { Package, User, Phone, Hash } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

const OrderCard = ({ order }) => {
  // Tomamos los datos del primer objeto ya que el order_id, customer, etc son comunes
  const { order_id, customer_name, customer_last_name, customer_phone, created_at } = order;

  return (
    <Card className="bg-primary p-6 md:p-8 text-white border-none mb-8">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="flex gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
            <Package size={28} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-white/60 text-sm font-bold uppercase tracking-wider">Pedido</span>
              <span className="bg-white/20 px-2 py-0.5 rounded text-sm font-bold">{order_id}</span>
            </div>
            <h2 className="text-2xl font-bold">Resumen de tu pedido</h2>
            <p className="text-white/80 text-sm">Realizado el {formatDate(created_at)}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-8 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <User size={16} />
            </div>
            <div>
              <p className="text-[10px] text-white/50 font-bold uppercase">Cliente</p>
              <p className="text-sm font-medium">{customer_name} {customer_last_name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <Phone size={16} />
            </div>
            <div>
              <p className="text-[10px] text-white/50 font-bold uppercase">Teléfono</p>
              <p className="text-sm font-medium">{customer_phone}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OrderCard;
