const Card = ({ movie }) => {
	const img_base_url = import.meta.env.VITE_IMAGES_BASE_URL

	return (
		<div className='card'>
			<img
				src={`${img_base_url}/${movie.poster_path}`}
				alt={movie.title}
			/>
			<div className='card-body'>
				<h4>{movie.title}</h4>
				<span>{movie.release_date}</span>
			</div>
		</div>
	)
}
export default Card
