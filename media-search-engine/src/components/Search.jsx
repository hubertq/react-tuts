import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
import { useFetch } from '../hooks/useFetch'
import { useMediaContext } from '../hooks/useMediaContext'

const Search = () => {
	const [term, setTerm] = useState('')
	const api_key = import.meta.env.VITE_API_KEY
	const base_url = import.meta.env.VITE_BASE_URL
	const search_api = import.meta.env.VITE_SEARCH_API
	const { dispatch } = useMediaContext()
	const navigate = useNavigate()

	const handleSubmit = e => {
		e.preventDefault()

		if (term !== '') {
			const searchTerm = encodeURIComponent(term.trim())
			const url = `${base_url}${search_api}?api_key=${api_key}&query=${searchTerm}&language=en-US&page=1&include_adult=true`

			dispatch({ type: 'SET_SEARCH', payload: term })

			navigate('/results')

			dispatch({ type: 'SET_LOADING', payload: true })

			useFetch(url)
				.then(response => {
					dispatch({ type: 'SET_LOADING', payload: false })
					dispatch({ type: 'SET_MEDIA', payload: response.results })
				})
				.catch(error =>
					dispatch({ type: 'SET_ERROR', payload: error.message })
				)
		}
	}

	return (
		<form className='search-form' onSubmit={handleSubmit}>
			<input
				type='text'
				placeholder='Search movies'
				onChange={e => setTerm(e.target.value)}
				value={term}
			/>
			<BsSearch />
		</form>
	)
}
export default Search
