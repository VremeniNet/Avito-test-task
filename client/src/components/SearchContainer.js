import React, { useState } from 'react'

function SearchContainer() {
	const [searchTerm, setSearchTerm] = useState('')

	const handleSearch = () => {
		console.log('Ищем:', searchTerm)
	}
	return (
		<div className='search-container'>
			<img src='/images/logo.png' alt='Clone Avito Logo' className='logo-img' />
			<input
				type='text'
				placeholder='Поиск по объявлениям'
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
				className='search-input'
			/>
			<button onClick={handleSearch} className='search-button'>
				Найти
			</button>
		</div>
	)
}

export default SearchContainer
