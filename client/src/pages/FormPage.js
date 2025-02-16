import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/FormPage.css'

function FormPage() {
	const navigate = useNavigate()
	const [step, setStep] = useState(1)
	const [formData, setFormData] = useState({
		category: '',
		name: '',
		description: '',
		location: '',
		image: null,
		// Дополнительные поля для второй части
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

	// Изменение полей
	const handleChange = e => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value,
		}))
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

	// Отправка формы на сервер
	const handleSubmit = async e => {
		e.preventDefault()

		const adData = {
			name: formData.name,
			description: formData.description,
			location: formData.location,
			type: formData.category,
			image: formData.image ? URL.createObjectURL(formData.image) : null,
			// Добавляем данные второй части формы
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
			const response = await fetch('http://localhost:3000/items', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(adData),
			})

			if (!response.ok) throw new Error('Ошибка при создании объявления')

			console.log('Объявление создано')
			navigate('/list')
		} catch (error) {
			console.error('Ошибка:', error)
		}
	}

	return (
		<div className='form-page-container'>
			<div className='form-box'>
				<h1>Создать объявление</h1>

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
								<select
									name='propertyType'
									value={formData.propertyType}
									onChange={handleChange}
									required
								>
									<option value=''>Тип недвижимости</option>
									<option value='Квартира'>Квартира</option>
									<option value='Дом'>Дом</option>
									<option value='Коттедж'>Коттедж</option>
								</select>
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
								<select
									name='brand'
									value={formData.brand}
									onChange={handleChange}
									required
								>
									<option value=''>Марка</option>
									<option value='Audi'>Audi</option>
									<option value='BMW'>BMW</option>
									<option value='Toyota'>Toyota</option>
								</select>
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
								<select
									name='serviceType'
									value={formData.serviceType}
									onChange={handleChange}
									required
								>
									<option value=''>Тип услуги</option>
									<option value='Ремонт'>Ремонт</option>
									<option value='Уборка'>Уборка</option>
									<option value='Доставка'>Доставка</option>
								</select>
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

						<button type='submit'>Создать объявление</button>
					</form>
				)}
			</div>
		</div>
	)
}

export default FormPage
