import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

const TrackingPage = () => {
  const { id } = useParams();
  const decodedId = decodeURIComponent(id);

  return (
    <div className="py-8">
      <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium mb-8 transition-standard">
        <ArrowLeft size={20} />
        Volver a buscar
      </Link>

      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Consultando: {decodedId}</h2>
        <p className="text-secondary mb-8">Esta página está en construcción. Pronto verás el estado de tu pedido aquí.</p>
        <div className="flex justify-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;
