import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import TrackingTimeline from './TrackingTimeline';
import { Truck, ExternalLink, Calendar } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

const GuiaCard = ({ guia }) => {
  const { tracking_number, shipping_company, shipping_status, tracking_url, update_at } = guia;

  return (
    <Card className="p-6 md:p-8" animate>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-gray-50 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
            <Truck size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-lg text-secondary-dark">Guía #{tracking_number}</h3>
              <Badge variant={shipping_status === 'Entregado' ? 'success' : 'primary'}>
                {shipping_status}
              </Badge>
            </div>
            <p className="text-sm text-secondary font-medium">{shipping_company}</p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 text-right">
          <div className="flex items-center gap-2 text-xs text-secondary/60">
            <Calendar size={14} />
            <span>Última actualización: {formatDate(update_at)}</span>
          </div>
          {tracking_url && (
            <a 
              href={tracking_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark text-sm font-semibold flex items-center gap-1.5 transition-standard"
            >
              Rastreo transportadora
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      <TrackingTimeline currentStatus={shipping_status} />
    </Card>
  );
};

export default GuiaCard;
