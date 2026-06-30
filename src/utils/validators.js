/**
 * Valida el valor ingresado según el tipo seleccionado (guía o pedido)
 * @param {'tracking' | 'order'} type
 * @param {string} value
 * @returns {Object} { isValid: boolean, message: string }
 */
export const validateSearchInput = (type, value) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return { isValid: false, message: 'Por favor ingresa un valor' };
  }

  const pattern = type === 'order' ? /^#?\d+$/ : /^\d+$/;
  if (!pattern.test(trimmedValue)) {
    return {
      isValid: false,
      message:
        type === 'order'
          ? 'Ingresa solo el número de pedido (con o sin #)'
          : 'Ingresa solo el número de guía',
    };
  }

  return { isValid: true, message: '' };
};
