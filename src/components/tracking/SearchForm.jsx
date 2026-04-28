import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { validateSearchInput } from '../../utils/validators';

const SearchForm = ({ onSearch, isLoading }) => {
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateSearchInput(searchValue);
    
    if (!validation.isValid) {
      setError(validation.message);
      return;
    }

    setError('');
    onSearch(searchValue.trim());
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    if (error) setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-3">
        <Input
          placeholder="Ej: #100192299 o 25915393"
          value={searchValue}
          onChange={handleInputChange}
          error={error}
          icon={Search}
          className="flex-1"
        />
        <Button 
          type="submit" 
          loading={isLoading}
          className="md:w-32 h-[46px]"
        >
          Buscar
        </Button>
      </div>
      <p className="text-xs text-secondary/60 text-center md:text-left">
        Ingresa tu número de pedido (con #) o el número de guía que te enviamos.
      </p>
    </form>
  );
};

export default SearchForm;
