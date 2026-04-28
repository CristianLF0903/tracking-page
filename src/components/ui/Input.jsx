import React from 'react';

const Input = ({ label, placeholder, value, onChange, type = 'text', className = '', error = '', icon: Icon }) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-sm font-medium text-secondary-dark">{label}</label>}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/60">
            <Icon size={20} />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-2.5 rounded-xl border transition-standard outline-none
            ${Icon ? 'pl-10' : ''}
            ${error 
              ? 'border-red-500 focus:ring-2 focus:ring-red-100' 
              : 'border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10'
            }
            bg-white text-secondary-dark placeholder:text-secondary/40`}
        />
      </div>
      {error && <span className="text-xs text-red-500 mt-0.5">{error}</span>}
    </div>
  );
};

export default Input;
