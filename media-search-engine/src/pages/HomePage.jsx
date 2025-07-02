import { Card } from '../components'
import { useEffect } from 'react'
import { useMediaContext } from '../hooks/useMediaContext'
import { TailSpin } from 'react-loading-icons'
import { useFetch } from '../hooks/useFetch'

const api_key = import.meta.env.VITE_API_KEY
const base_url = import.meta.env.VITE_BASE_URL
const discover_api = import.meta.env.VITE_DISCOVER_API

const HomePage = () => {
	const { media, isLoading, dispatch } = useMediaContext()

	useEffect(() => {
		dispatch({ type: 'SET_LOADING', payload: true })
		useFetch(`${base_url}${discover_api}&api_key=${api_key}`)
			.then(data => {
				dispatch({ type: 'SET_MEDIA', payload: data.results })
				console.log(data.results)
				dispatch({ type: 'SET_LOADING', payload: false })
			})
			.catch(error => console.log(error.message))
	}, [])
	return (
		<main>
			<h1>Discover movies</h1>

			<div className='inner-wrapper'>
				{isLoading ? (
					<center>
						<TailSpin stroke='black' />
					</center>
				) : (
					media &&
					media.map(movie => <Card key={movie.id} movie={movie} />)
				)}
			</div>
		</main>
	)
}
export default HomePage
