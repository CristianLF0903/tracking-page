import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import Button from '../ui/Button';

const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-in fade-in zoom-in duration-500">
      <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-6">
        <AlertCircle size={32} />
      </div>
      <h2 className="text-2xl font-bold text-secondary-dark mb-2">¡Ups! Algo salió mal</h2>
      <p className="text-secondary max-w-md mb-8">
        {message || 'No pudimos obtener la información de tu pedido en este momento.'}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="gap-2">
          <RotateCcw size={18} />
          Intentar de nuevo
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
