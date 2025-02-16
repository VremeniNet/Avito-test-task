import React, { useEffect, useState } from 'react'
import AdCard from './AdCard.js'

function AdCards({ category, searchTerm }) {
	// Состояния для хранения объявлений, состояния загрузки, ошибки и текущей страницы
	const [ads, setAds] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [currentPage, setCurrentPage] = useState(1)
	const adsPerPage = 5 // Количество объявлений на странице

	// Получение объявлений с сервера
	useEffect(() => {
		fetch('http://localhost:3000/items')
			.then(response => {
				if (!response.ok) {
					throw new Error('Ошибка загрузки данных')
				}
				return response.json()
			})
			.then(data => {
				setAds(data.reverse())
				setLoading(false)
			})
			.catch(err => {
				setError(err.message)
				setLoading(false)
			})
	}, [])

	// Фильтрация по категории и названию
	const filteredAds = ads.filter(
		ad =>
			(category ? ad.type === category : true) &&
			(searchTerm
				? ad.name.toLowerCase().includes(searchTerm.toLowerCase())
				: true)
	)

	// Сбрасывание на первую страницу при изменении фильтров
	useEffect(() => {
		setCurrentPage(1)
	}, [category, searchTerm])

	// Пагинация
	const indexOfLastAd = currentPage * adsPerPage
	const indexOfFirstAd = indexOfLastAd - adsPerPage
	const currentAds = filteredAds.slice(indexOfFirstAd, indexOfLastAd)

	// Функция для перехода на следующую страницу
	const nextPage = () => {
		if (currentPage < Math.ceil(filteredAds.length / adsPerPage)) {
			setCurrentPage(prevPage => prevPage + 1)
		}
	}

	// Функция для перехода на предыдущую страницу
	const prevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(prevPage => prevPage - 1)
		}
	}

	if (loading) return <p>Загрузка объявлений...</p>

	if (error) return <p>Ошибка: {error}</p>

	if (filteredAds.length === 0) return <p>Нет объявлений по этому запросу</p>

	return (
		<>
			<div className='ad-cards-container'>
				{currentAds.map(ad => (
					<AdCard key={ad.id} ad={ad} />
				))}
			</div>
			<div className='pagination'>
				<button onClick={prevPage} disabled={currentPage === 1}>
					{'<'}
				</button>
				<span>
					Страница {currentPage} из {Math.ceil(filteredAds.length / adsPerPage)}
				</span>
				<button
					onClick={nextPage}
					disabled={currentPage === Math.ceil(filteredAds.length / adsPerPage)}
				>
					{'>'}
				</button>
			</div>
		</>
	)
}

export default AdCards
