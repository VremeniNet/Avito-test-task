import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import '../styles/ListPage.css'
import SearchContainer from '../components/SearchContainer.js'
import Filters from '../components/Filters.js'
import AdCards from '../components/AdCards.js'

function ListPage() {
	const navigate = useNavigate()
	const goToFormPage = () => {
		navigate('/form')
	}

	const [category, setCategory] = useState('')
	const [searchTerm, setSearchTerm] = useState('')

	// Обновление фильтра категории и сбрасывание поиска
	const handleCategoryChange = newCategory => {
		setCategory(newCategory)
		setSearchTerm('')
	}

	return (
		<div className='list-page-container'>
			<SearchContainer searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			<Filters setCategory={handleCategoryChange} />
			<h1>Список объявлений</h1>
			<button className='add-button' onClick={goToFormPage}>
				Создать объявление
			</button>
			<AdCards category={category} searchTerm={searchTerm} />
		</div>
	)
}

export default ListPage
