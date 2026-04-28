import React from 'react';
import { STATUS_FLOW } from '../../utils/constants';
import PreparingIcon from '../../assets/icons/status-preparing.svg';
import DispatchedIcon from '../../assets/icons/status-dispatched.svg';
import InTransitIcon from '../../assets/icons/status-in-transit.svg';
import DeliveredIcon from '../../assets/icons/status-delivered.svg';

const ICONS = {
  'Preparando': PreparingIcon,
  'Despachado': DispatchedIcon,
  'En camino': InTransitIcon,
  'Entregado': DeliveredIcon,
};

const TrackingTimeline = ({ currentStatus }) => {
  const currentIndex = STATUS_FLOW.indexOf(currentStatus);

  return (
    <div className="w-full py-8">
      <div className="relative flex justify-between">
        {/* Línea de progreso de fondo */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-1 bg-gray-100 -z-10" />
        
        {/* Línea de progreso activa */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 left-0 h-1 bg-primary transition-all duration-1000 -z-10" 
          style={{ width: `${(currentIndex / (STATUS_FLOW.length - 1)) * 100}%` }}
        />

        {STATUS_FLOW.map((status, index) => {
          const isCompleted = index <= currentIndex;
          const isActive = index === currentIndex;
          const Icon = ICONS[status];

          return (
            <div key={status} className="flex flex-col items-center gap-3 relative group">
              <div className={`
                w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center border-4 transition-standard
                ${isCompleted ? 'bg-white border-primary text-primary shadow-md' : 'bg-white border-gray-100 text-gray-300'}
                ${isActive ? 'ring-4 ring-primary/20 scale-110' : ''}
              `}>
                <img 
                  src={Icon} 
                  alt={status} 
                  className={`w-6 h-6 md:w-8 md:h-8 ${isCompleted ? 'opacity-100' : 'opacity-30 grayscale'}`} 
                />
              </div>
              <div className="text-center">
                <p className={`text-[10px] md:text-xs font-bold uppercase tracking-wider
                  ${isCompleted ? 'text-primary' : 'text-gray-400'}
                `}>
                  {status}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackingTimeline;
