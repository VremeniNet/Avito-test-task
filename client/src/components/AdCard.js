import '../styles/AdCard.css'

function AdCard({ ad }) {
	const { image, name, location, type, price, cost } = ad
	return (
		<div className='ad-card'>
			<div className='ad-content'>
				<img
					src={image || '/images/placeholder.jpg'}
					className='ad-image'
					alt='adPhoto'
				/>
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
				<button className='ad-button'>Открыть</button>
			</div>
		</div>
	)
}

export default AdCard
