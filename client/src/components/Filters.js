function Filters({ setCategory }) {
	return (
		<div className='category-filters'>
			<button
				className='filter-btn filter-btn__1'
				onClick={() => setCategory('Авто')}
			>
				<span>Авто</span>
			</button>
			<button
				className='filter-btn filter-btn__2'
				onClick={() => setCategory('Недвижимость')}
			>
				<span>Недвижимость</span>
			</button>
			<button
				className='filter-btn filter-btn__3'
				onClick={() => setCategory('Услуги')}
			>
				<span>Услуги</span>
			</button>
			<button className='filter-btn' onClick={() => setCategory('')}>
				<span>Все</span>
			</button>
		</div>
	)
}

export default Filters
