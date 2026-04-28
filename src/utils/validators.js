/**
 * Valida si el input es un número de pedido (empieza con #) o una guía (solo números)
 * @param {string} value 
 * @returns {Object} { type: 'order' | 'tracking' | 'unknown', isValid: boolean }
 */
export const validateSearchInput = (value) => {
  const trimmedValue = value.trim();
  
  if (!trimmedValue) {
    return { type: 'unknown', isValid: false, message: 'Por favor ingresa un valor' };
  }

  // Si empieza con # es pedido
  if (trimmedValue.startsWith('#')) {
    const isValidOrder = /^#\d+$/.test(trimmedValue);
    return { 
      type: 'order', 
      isValid: isValidOrder,
      message: isValidOrder ? '' : 'Formato de pedido inválido (Ej: #100192299)'
    };
  }

  // Si son solo números es guía
  const isValidTracking = /^\d+$/.test(trimmedValue);
  if (isValidTracking) {
    return { 
      type: 'tracking', 
      isValid: true,
      message: ''
    };
  }

  return { 
    type: 'unknown', 
    isValid: false, 
    message: 'Ingresa un número de pedido (#...) o guía (solo números)' 
  };
};
