import React, { useEffect, useState } from 'react'
import AdCard from './AdCard.js'

function AdCards({ category }) {
	const [ads, setAds] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [currentPage, setCurrentPage] = useState(1)
	const adsPerPage = 5

	// Получаем объявления с сервера
	useEffect(() => {
		fetch('http://localhost:3000/items')
			.then(response => {
				if (!response.ok) {
					throw new Error('Ошибка загрузки данных')
				}
				return response.json()
			})
			.then(data => {
				setAds(data.reverse()) // Переворачиваем, чтобы новые объявления были первыми
				setLoading(false)
			})
			.catch(err => {
				setError(err.message)
				setLoading(false)
			})
	}, [])

	// Фильтрация по категории
	const filteredAds = category ? ads.filter(ad => ad.type === category) : ads

	// Обновление номера страницы при изменении фильтра
	useEffect(() => {
		setCurrentPage(1) // Сброс на первую страницу при выборе новой категории
	}, [category])

	// Пагинация
	const indexOfLastAd = currentPage * adsPerPage
	const indexOfFirstAd = indexOfLastAd - adsPerPage
	const currentAds = filteredAds.slice(indexOfFirstAd, indexOfLastAd)

	// Функции переключения страниц
	const nextPage = () => {
		if (currentPage < Math.ceil(filteredAds.length / adsPerPage)) {
			setCurrentPage(prevPage => prevPage + 1)
		}
	}

	const prevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(prevPage => prevPage - 1)
		}
	}

	// Если идёт загрузка
	if (loading) return <p>Загрузка объявлений...</p>

	// Если произошла ошибка
	if (error) return <p>Ошибка: {error}</p>

	// Если нет объявлений после фильтрации
	if (filteredAds.length === 0) return <p>Нет объявлений в этой категории</p>

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
