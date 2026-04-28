import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', disabled = false, loading = false }) => {
  const baseStyles = 'px-6 py-2 rounded-lg font-semibold transition-standard flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark shadow-sm',
    secondary: 'bg-secondary-light text-secondary-dark hover:bg-gray-200',
    outline: 'border-2 border-primary text-primary hover:bg-primary/5',
    ghost: 'text-secondary hover:bg-secondary-light'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {loading ? (
        <>
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Cargando...</span>
        </>
      ) : children}
    </button>
  );
};

export default Button;
