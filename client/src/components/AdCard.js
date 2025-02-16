import { useNavigate } from 'react-router-dom'
import '../styles/AdCard.css'

const categoryImages = {
	Авто: '/images/cardImgCar.jpg',
	Недвижимость: '/images/cardImgProperty.jpg',
	Услуги: '/images/cardImgServices.jpg',
}

function AdCard({ ad }) {
	const { id, image, name, location, type, price, cost } = ad
	const navigate = useNavigate()

	const handleOpen = () => {
		navigate(`/item/${id}`)
	}

	const defaultImage = categoryImages[type]

	return (
		<div className='ad-card'>
			<div className='ad-content'>
				<img src={image || defaultImage} className='ad-image' alt='adPhoto' />
				<div className='ad-info'>
					<h2 className='ad-title'>{name}</h2>
					<h3 className='ad-location'>{location}</h3>
					<h3 className='ad-category'>{type}</h3>
				</div>
			</div>
			<div className='ad-footer'>
				<h2 className='ad-price'>
					{price || cost ? `${price || cost} ₽` : 'Договорная'}
				</h2>
				<button className='ad-button' onClick={handleOpen}>
					Открыть
				</button>
			</div>
		</div>
	)
}

export default AdCard
