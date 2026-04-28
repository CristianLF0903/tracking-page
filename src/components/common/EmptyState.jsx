import React from 'react';
import { SearchX, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const EmptyState = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-in fade-in zoom-in duration-500">
      <div className="w-16 h-16 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center mb-6">
        <SearchX size={32} />
      </div>
      <h2 className="text-2xl font-bold text-secondary-dark mb-2">No encontramos resultados</h2>
      <p className="text-secondary max-w-md mb-8">
        {message || 'Verifica que el número ingresado sea correcto e intenta nuevamente.'}
      </p>
      <Link to="/">
        <Button variant="outline" className="gap-2">
          <ArrowLeft size={18} />
          Volver al buscador
        </Button>
      </Link>
    </div>
  );
};

export default EmptyState;
