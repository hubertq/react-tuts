import { BrowserRouter, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import Layout from './Layout'
import AboutPage from './pages/AboutPage'
import NotFound from './pages/NotFound'
import UserPage from './pages/UserPage'
const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path='/about' element={<AboutPage />} />
					<Route path='/user/:login' element={<UserPage />} />
					<Route path='/notfound' element={<NotFound />} />
					<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
export default App
