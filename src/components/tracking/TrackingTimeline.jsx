import { STATUS_FLOW } from "../../utils/constants";
import PreparingIcon from "../../assets/icons/status-preparing.svg";
import DispatchedIcon from "../../assets/icons/status-dispatched.svg";
import InTransitIcon from "../../assets/icons/status-in-transit.svg";
import DeliveredIcon from "../../assets/icons/status-delivered.svg";
import NovedadIcon from "../../assets/icons/status-novedad.svg";

const ICONS = {
  Preparando: PreparingIcon,
  Despachado: DispatchedIcon,
  "En camino": InTransitIcon,
  Entregado: DeliveredIcon,
};

const NovedadBanner = () => {
  return (
    <div className="w-full py-8">
      <div 
        className="relative overflow-hidden rounded-2xl border-2 border-amber-300/60"
        style={{
          background: 'linear-gradient(135deg, #FFF7ED 0%, #FFFBEB 50%, #FEF3C7 100%)',
        }}
      >
        {/* Patrón decorativo de fondo */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 20px,
                #D97706 20px,
                #D97706 21px
              )`,
            }}
          />
        </div>

        <div className="relative flex flex-col md:flex-row items-center gap-5 p-6 md:p-8">
          {/* Icono con animación de pulso */}
          <div className="relative flex-shrink-0">
            <div 
              className="absolute inset-0 rounded-full animate-ping opacity-20"
              style={{ backgroundColor: '#F59E0B' }}
            />
            <div 
              className="relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border-[3px] shadow-lg"
              style={{
                borderColor: '#F59E0B',
                backgroundColor: '#FEF3C7',
                boxShadow: '0 10px 25px -5px rgba(245, 158, 11, 0.3), 0 0 0 4px rgba(245, 158, 11, 0.08)',
              }}
            >
              <img 
                src={NovedadIcon} 
                alt="Con Novedad" 
                className="w-8 h-8 md:w-10 md:h-10"
                style={{ filter: 'brightness(0) saturate(100%) invert(62%) sepia(74%) saturate(1200%) hue-rotate(10deg) brightness(95%) contrast(92%)' }}
              />
            </div>
          </div>

          {/* Contenido de texto */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span 
                className="inline-block w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: '#F59E0B' }}
              />
              <h3 
                className="text-lg md:text-xl font-bold uppercase tracking-wide"
                style={{ color: '#B45309' }}
              >
                Pedido con novedad
              </h3>
            </div>
            <p 
              className="text-sm md:text-base font-medium leading-relaxed max-w-lg"
              style={{ color: '#92400E' }}
            >
              Tu pedido presenta una novedad en el proceso de entrega. 
              Por favor, comunícate con nuestro servicio al cliente o consulta directamente con la transportadora para más información.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const isNovedadStatus = (status) =>
  typeof status === 'string' && status.toLowerCase().includes('novedad');

const TrackingTimeline = ({ currentStatus }) => {
  // Si el estado contiene "novedad", renderizar el banner especial
  if (isNovedadStatus(currentStatus)) {
    return <NovedadBanner />;
  }

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
            backgroundColor: '#f68414' // primary fallback
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
