import { Route, Routes } from 'react-router-dom'
import { Container, NavBar } from './components'
import { HomePage, SearchResultsPage } from './pages'

const App = () => {
	return (
		<div className='app'>
			<NavBar />
			<Container>
				<Routes>
					<Route index element={<HomePage />} />
					<Route path='/results' element={<SearchResultsPage />} />
				</Routes>
			</Container>
		</div>
	)
}
export default App
