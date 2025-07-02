import { Card } from '../components'
import { useMediaContext } from '../hooks/useMediaContext'
import { TailSpin } from 'react-loading-icons'

const SearchResultsPage = () => {
	const { media, isLoading, searchTerm } = useMediaContext()
	return (
		<main>
			<h1>Search results</h1>

			<div className='inner-wrapper'>
				{isLoading ? (
					<center>
						<TailSpin stroke='black' />
					</center>
				) : media.length > 0 ? (
					media.map(movie => <Card key={movie.id} movie={movie} />)
				) : (
					`There are no movies matching "${searchTerm}".`
				)}
			</div>
		</main>
	)
}
export default SearchResultsPage
