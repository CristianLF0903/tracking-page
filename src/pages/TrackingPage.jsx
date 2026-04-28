import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { useTracking } from '../hooks/useTracking';
import OrderCard from '../components/tracking/OrderCard';
import GuiaCard from '../components/tracking/GuiaCard';
import Spinner from '../components/ui/Spinner';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/ui/Button';

const TrackingPage = () => {
  const { id } = useParams();
  const decodedId = decodeURIComponent(id);
  const { data, isLoading, error, fetchTracking } = useTracking();

  useEffect(() => {
    if (decodedId) {
      fetchTracking(decodedId);
    }
  }, [decodedId, fetchTracking]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 animate-in fade-in duration-500">
        <Spinner size="lg" />
        <p className="mt-6 text-secondary font-medium animate-pulse">
          Consultando la información de tu pedido...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold mb-8 transition-standard group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Volver a buscar
        </Link>
        {error.includes('No se encontró') ? (
          <EmptyState message={error} />
        ) : (
          <ErrorState message={error} onRetry={() => fetchTracking(decodedId)} />
        )}
      </div>
    );
  }

  if (!data || data.length === 0) return null;

  return (
    <div className="py-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold transition-standard group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Volver a buscar
        </Link>
        <Button 
          variant="ghost" 
          onClick={() => fetchTracking(decodedId)} 
          className="text-xs gap-1.5 h-8 px-3"
        >
          <RefreshCw size={14} />
          Actualizar estado
        </Button>
      </div>

      <OrderCard order={data[0]} />

      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-6 bg-primary rounded-full"></div>
          <h2 className="text-xl font-bold text-secondary-dark">
            {data.length > 1 ? 'Guías asociadas a tu pedido' : 'Información de envío'}
          </h2>
        </div>
        
        {data.map((guia, index) => (
          <GuiaCard key={guia.tracking_number || index} guia={guia} />
        ))}
      </div>

      <div className="mt-12 p-6 rounded-2xl bg-secondary-light border border-dashed border-secondary/20 text-center">
        <p className="text-sm text-secondary">
          ¿Tienes dudas sobre tu entrega? <span className="text-primary font-bold">Contáctanos</span> a nuestra línea de atención al cliente.
        </p>
      </div>
    </div>
  );
};

export default TrackingPage;
