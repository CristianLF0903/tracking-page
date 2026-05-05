import { STATUS_FLOW } from "../../utils/constants";
import PreparingIcon from "../../assets/icons/status-preparing.svg";
import DispatchedIcon from "../../assets/icons/status-dispatched.svg";
import InTransitIcon from "../../assets/icons/status-in-transit.svg";
import DeliveredIcon from "../../assets/icons/status-delivered.svg";

const ICONS = {
  Preparando: PreparingIcon,
  Despachado: DispatchedIcon,
  "En camino": InTransitIcon,
  Entregado: DeliveredIcon,
};

const TrackingTimeline = ({ currentStatus }) => {
  const currentIndex = STATUS_FLOW.indexOf(currentStatus);
  const totalSteps = STATUS_FLOW.length;
  
  // Cálculo de posición para que la línea empiece y termine en el centro de los círculos
  // Cada item ocupa 1/totalSteps del ancho total. El centro del primer item está en (1/2) * (1/totalSteps)
  const offsetPercent = (1 / (2 * totalSteps)) * 100;
  const linePathWidth = 100 - (2 * offsetPercent);
  const progressWidth = (currentIndex / (totalSteps - 1)) * linePathWidth;

  return (
    <div className="w-full py-12">
      <div className="relative flex justify-between">
        {/* Línea de fondo (gris) - Usando inline style para asegurar visibilidad si el CSS falla */}
        <div 
          className="absolute top-6 md:top-8 h-1 bg-gray-200 z-0" 
          style={{ 
            left: `${offsetPercent}%`, 
            right: `${offsetPercent}%`,
            backgroundColor: '#E5E7EB' // gray-200 fallback
          }} 
        />
        
        {/* Línea de progreso (naranja) */}
        <div 
          className="absolute top-6 md:top-8 h-1 bg-primary transition-all duration-1000 ease-in-out z-0" 
          style={{ 
            left: `${offsetPercent}%`, 
            width: `${progressWidth}%`,
            backgroundColor: '#EF7D00' // primary fallback
          }} 
        />

        {STATUS_FLOW.map((status, index) => {
          const isCompleted = index <= currentIndex;
          const isActive = index === currentIndex;
          const Icon = ICONS[status];

          return (
            <div 
              key={status} 
              className="flex-1 flex flex-col items-center gap-4 relative z-10"
            >
              {/* Círculo con Icono */}
              <div 
                className={`
                  w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center 
                  border-[3px] md:border-4 transition-all duration-500 bg-white
                  ${isCompleted 
                    ? "border-primary shadow-lg shadow-primary/20" 
                    : "border-gray-100"
                  }
                  ${isActive ? "scale-110 ring-4 ring-primary/10" : ""}
                `}
              >
                <img 
                  src={Icon} 
                  alt={status} 
                  className={`
                    w-6 h-6 md:w-8 md:h-8 transition-all duration-500
                    ${isCompleted ? "opacity-100" : "opacity-20 grayscale"}
                  `} 
                />
              </div>

              {/* Etiqueta de Texto */}
              <div className="text-center">
                <p 
                  className={`
                    text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap
                    ${isCompleted ? "text-primary" : "text-gray-300"}
                  `}
                >
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
