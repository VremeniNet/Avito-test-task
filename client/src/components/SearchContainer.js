import React, { useState } from 'react'

function SearchContainer({ searchTerm, setSearchTerm }) {
	const [inputValue, setInputValue] = useState(searchTerm)

	const handleSearch = () => {
		setSearchTerm(inputValue) // Передаём в ListPage
		setInputValue('') // Очищаем поле поиска
	}

	return (
		<div className='search-container'>
			<img src='/images/logo.png' alt='Clone Avito Logo' className='logo-img' />
			<input
				type='text'
				placeholder='Поиск по объявлениям'
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
				className='search-input'
			/>
			<button onClick={handleSearch} className='search-button'>
				Найти
			</button>
		</div>
	)
}

export default SearchContainer
