import React, { useState } from 'react'
import { Search } from 'lucide-react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { validateSearchInput } from '../../utils/validators'

const SEARCH_TYPES = [
	{ value: 'tracking', label: 'Número de guía' },
	{ value: 'order', label: 'Número de pedido' },
]

const SearchForm = ({ onSearch, isLoading }) => {
	const [searchType, setSearchType] = useState('tracking')
	const [searchValue, setSearchValue] = useState('')
	const [error, setError] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()
		const validation = validateSearchInput(searchType, searchValue)

		if (!validation.isValid) {
			setError(validation.message)
			return
		}

		setError('')
		onSearch(searchType, searchValue.trim())
	}

	const handleInputChange = (e) => {
		setSearchValue(e.target.value)
		if (error) setError('')
	}

	const handleTypeChange = (type) => {
		setSearchType(type)
		if (error) setError('')
	}

	return (
		<form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
			<div className="flex gap-4">
				{SEARCH_TYPES.map(({ value, label }) => (
					<label
						key={value}
						className="flex items-center gap-2 text-sm text-secondary-dark cursor-pointer"
					>
						<input
							type="radio"
							name="searchType"
							value={value}
							checked={searchType === value}
							onChange={() => handleTypeChange(value)}
							className="appearance-none w-4 h-4 border-2 border-gray-300 rounded-full grid place-content-center transition-all duration-200 ease-in-out cursor-pointer hover:border-primary checked:border-primary before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-primary before:scale-0 checked:before:scale-100 before:transition-transform before:duration-150"
						/>
						{label}
					</label>
				))}
			</div>

			<div className="flex flex-col md:flex-row gap-3">
				<Input
					placeholder={
						searchType === 'order' ? 'Ej: 100192299' : 'Ej: 25915393'
					}
					value={searchValue}
					onChange={handleInputChange}
					error={error}
					icon={Search}
					className="flex-1"
				/>
				<Button type="submit" loading={isLoading} className="md:w-32 h-[46px]">
					Buscar
				</Button>
			</div>
			<p className="text-xs text-secondary/60 text-center md:text-left">
				Selecciona si vas a buscar con tu número de guía o de pedido.
			</p>
		</form>
	)
}

export default SearchForm
