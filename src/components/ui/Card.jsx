import React from 'react';

const Card = ({ children, className = '', animate = false }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden
      ${animate ? 'animate-in fade-in slide-in-from-bottom-4 duration-500' : ''}
      ${className}`}>
      {children}
    </div>
  );
};

export default Card;
