import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import '../styles/FormPage.css'

function FormPage() {
	const navigate = useNavigate()
	const location = useLocation()
	const existingAd = location.state?.ad // Получаем объявление, если оно передано

	const [step, setStep] = useState(1)
	const [formData, setFormData] = useState({
		category: '',
		name: '',
		description: '',
		location: '',
		image: null,
		propertyType: '',
		area: '',
		rooms: '',
		price: '',
		brand: '',
		model: '',
		year: '',
		mileage: '',
		serviceType: '',
		experience: '',
		cost: '',
		workSchedule: '',
	})

	// Если объявление передано, заполняем форму его данными
	useEffect(() => {
		if (existingAd) {
			setFormData({
				category: existingAd.type || '',
				name: existingAd.name || '',
				description: existingAd.description || '',
				location: existingAd.location || '',
				image: existingAd.image || null,
				propertyType: existingAd.propertyType || '',
				area: existingAd.area || '',
				rooms: existingAd.rooms || '',
				price: existingAd.price || '',
				brand: existingAd.brand || '',
				model: existingAd.model || '',
				year: existingAd.year || '',
				mileage: existingAd.mileage || '',
				serviceType: existingAd.serviceType || '',
				experience: existingAd.experience || '',
				cost: existingAd.cost || '',
				workSchedule: existingAd.workSchedule || '',
			})
		}
	}, [existingAd])

	// Обработчик изменения полей
	const handleChange = e => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	// Загрузка изображения
	const handleImageUpload = e => {
		const file = e.target.files[0]
		setFormData(prev => ({
			...prev,
			image: file,
		}))
	}

	// Переход ко второй части формы
	const handleNextStep = e => {
		e.preventDefault()
		setStep(2)
	}

	// Отправка формы (создание или обновление)
	const handleSubmit = async e => {
		e.preventDefault()

		const adData = {
			name: formData.name,
			description: formData.description,
			location: formData.location,
			type: formData.category,
			image: formData.image
				? URL.createObjectURL(formData.image)
				: existingAd?.image || null,
			...(formData.category === 'Недвижимость' && {
				propertyType: formData.propertyType,
				area: formData.area,
				rooms: formData.rooms,
				price: formData.price,
			}),
			...(formData.category === 'Авто' && {
				brand: formData.brand,
				model: formData.model,
				year: formData.year,
				mileage: formData.mileage,
			}),
			...(formData.category === 'Услуги' && {
				serviceType: formData.serviceType,
				experience: formData.experience,
				cost: formData.cost,
				workSchedule: formData.workSchedule,
			}),
		}

		try {
			const method = existingAd ? 'PUT' : 'POST'
			const url = existingAd
				? `http://localhost:3000/items/${existingAd.id}`
				: 'http://localhost:3000/items'

			const response = await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(adData),
			})

			if (!response.ok) throw new Error('Ошибка при сохранении объявления')

			console.log(existingAd ? 'Объявление обновлено' : 'Объявление создано')
			navigate('/list') // Переход к списку объявлений
		} catch (error) {
			console.error('Ошибка:', error)
		}
	}

	return (
		<div className='form-page-container'>
			<div className='form-box'>
				<h1>
					{existingAd ? 'Редактировать объявление' : 'Создать объявление'}
				</h1>

				{step === 1 && (
					<form onSubmit={handleNextStep}>
						<label className='image-upload'>
							<input
								type='file'
								accept='image/*'
								onChange={handleImageUpload}
							/>
							{formData.image ? (
								<img
									src={URL.createObjectURL(formData.image)}
									alt='Preview'
									className='preview-image'
								/>
							) : (
								<span>Добавить фото</span>
							)}
						</label>

						<select
							name='category'
							value={formData.category}
							onChange={handleChange}
							required
						>
							<option value=''>Категория</option>
							<option value='Недвижимость'>Недвижимость</option>
							<option value='Авто'>Авто</option>
							<option value='Услуги'>Услуги</option>
						</select>

						<input
							type='text'
							name='name'
							placeholder='Название'
							value={formData.name}
							onChange={handleChange}
							required
						/>
						<textarea
							name='description'
							placeholder='Описание'
							value={formData.description}
							onChange={handleChange}
							required
						/>
						<input
							type='text'
							name='location'
							placeholder='Локация'
							value={formData.location}
							onChange={handleChange}
							required
						/>

						<button type='submit'>Продолжить</button>
					</form>
				)}

				{step === 2 && (
					<form onSubmit={handleSubmit}>
						{formData.category === 'Недвижимость' && (
							<>
								<input
									type='text'
									name='propertyType'
									placeholder='Тип недвижимости'
									value={formData.propertyType}
									onChange={handleChange}
									required
								/>
								<input
									type='number'
									name='area'
									placeholder='Площадь (кв. м)'
									value={formData.area}
									onChange={handleChange}
									required
								/>
								<input
									type='number'
									name='rooms'
									placeholder='Количество комнат'
									value={formData.rooms}
									onChange={handleChange}
									required
								/>
								<input
									type='number'
									name='price'
									placeholder='Цена'
									value={formData.price}
									onChange={handleChange}
									required
								/>
							</>
						)}

						{formData.category === 'Авто' && (
							<>
								<input
									type='text'
									name='brand'
									placeholder='Марка'
									value={formData.brand}
									onChange={handleChange}
									required
								/>
								<input
									type='text'
									name='model'
									placeholder='Модель'
									value={formData.model}
									onChange={handleChange}
									required
								/>
								<input
									type='number'
									name='year'
									placeholder='Год выпуска'
									value={formData.year}
									onChange={handleChange}
									required
								/>
								<input
									type='number'
									name='mileage'
									placeholder='Пробег (км)'
									value={formData.mileage}
									onChange={handleChange}
								/>
							</>
						)}

						{formData.category === 'Услуги' && (
							<>
								<input
									type='text'
									name='serviceType'
									placeholder='Тип услуги'
									value={formData.serviceType}
									onChange={handleChange}
									required
								/>
								<input
									type='number'
									name='experience'
									placeholder='Опыт работы (лет)'
									value={formData.experience}
									onChange={handleChange}
									required
								/>
								<input
									type='number'
									name='cost'
									placeholder='Стоимость'
									value={formData.cost}
									onChange={handleChange}
									required
								/>
								<input
									type='text'
									name='workSchedule'
									placeholder='График работы (опционально)'
									value={formData.workSchedule}
									onChange={handleChange}
								/>
							</>
						)}

						<button type='submit'>
							{existingAd ? 'Сохранить' : 'Создать объявление'}
						</button>
					</form>
				)}
			</div>
		</div>
	)
}

export default FormPage
