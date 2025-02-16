import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../styles/ItemDetailPage.css'

// Объект с изображениями по умолчанию для разных категорий
const categoryImages = {
	Авто: '/images/cardImgCar.jpg',
	Недвижимость: '/images/cardImgProperty.jpg',
	Услуги: '/images/cardImgServices.jpg',
}

function ItemDetailPage() {
	const { id } = useParams()
	const navigate = useNavigate()
	const [ad, setAd] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	// Получение объявления по ID
	useEffect(() => {
		fetch(`http://localhost:3000/items/${id}`)
			.then(response => {
				if (!response.ok) {
					throw new Error('Объявление не найдено')
				}
				return response.json()
			})
			.then(data => {
				setAd(data)
				setLoading(false)
			})
			.catch(err => {
				setError(err.message)
				setLoading(false)
			})
	}, [id])

	// Переход к редактированию объявления
	const handleEdit = () => {
		navigate('/form', { state: { ad } })
	}

	// Функция для возврата на главную страницу
	const handleGoBack = () => {
		navigate('/list')
	}

	if (loading) return <p>Загрузка объявления...</p>
	if (error) return <p>{error}</p>

	return (
		<div className='item-detail-container'>
			<div className='item-box'>
				<div className='image-section'>
					<img
						src={ad.image || categoryImages[ad.type]}
						alt={ad.name}
						className='item-image'
					/>

					<div className='category-details'>
						{ad.type === 'Недвижимость' && (
							<>
								<p>
									<strong>Тип недвижимости:</strong> {ad.propertyType}
								</p>
								<p>
									<strong>Площадь:</strong> {ad.area} м²
								</p>
								<p>
									<strong>Комнат:</strong> {ad.rooms}
								</p>
							</>
						)}

						{ad.type === 'Авто' && (
							<>
								<p>
									<strong>Марка:</strong> {ad.brand}
								</p>
								<p>
									<strong>Модель:</strong> {ad.model}
								</p>
								<p>
									<strong>Год:</strong> {ad.year}
								</p>
								<p>
									<strong>Пробег:</strong>{' '}
									{ad.mileage ? `${ad.mileage} км` : 'Не указан'}
								</p>
							</>
						)}

						{ad.type === 'Услуги' && (
							<>
								<p>
									<strong>Тип услуги:</strong> {ad.serviceType}
								</p>
								<p>
									<strong>Опыт работы:</strong> {ad.experience} лет
								</p>
								<p>
									<strong>Стоимость:</strong> {ad.cost} ₽
								</p>
								{ad.workSchedule && (
									<p>
										<strong>График работы:</strong> {ad.workSchedule}
									</p>
								)}
							</>
						)}
					</div>
				</div>

				<div className='info-section'>
					<h1>{ad.name}</h1>
					<p>
						<strong>Категория:</strong> {ad.type}
					</p>
					<p>
						<strong>Локация:</strong> {ad.location}
					</p>
					<p>
						<strong>Описание:</strong> {ad.description}
					</p>
					<p>
						<strong>Цена:</strong> {ad.price || ad.cost || 'Договорная'}
					</p>
					<div className='button-container'>
						<button className='edit-button' onClick={handleEdit}>
							Редактировать
						</button>
						<button className='back-button' onClick={handleGoBack}>
							Назад на главную
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ItemDetailPage
