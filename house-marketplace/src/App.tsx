import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './Layout'
import NotFoundPage from './pages/not-found'
import ExplorePage from './pages/explore'
import SignInPage from './pages/sign-in'
import SignUpPage from './pages/sign-up'
import CategoryPage from './pages/category'
import ForgotPasswordPage from './pages/forgot-password'
import CreateListingPage from './pages/create-listing'
import EditListingPage from './pages/edit-listing'
import ListingPage from './pages/listing'
import ContactPage from './pages/contact'
import ProfilePage from './pages/profile'
import { ToastContainer } from 'react-toastify'
import ProtectedRoute from './components/protected-route'
import OffersPage from './pages/offers'

const App = () => {
	return (
		<>
			<ToastContainer />

			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route index element={<ExplorePage />} />
						<Route path='offers' element={<OffersPage />} />
						<Route element={<ProtectedRoute />}>
							<Route path='profile' element={<ProfilePage />} />
						</Route>
						<Route path='sign-in' element={<SignInPage />} />
						<Route path='sign-up' element={<SignUpPage />} />
						<Route
							path='category/:categoryName'
							element={<CategoryPage />}
						/>
						<Route
							path='forgot-password'
							element={<ForgotPasswordPage />}
						/>
						<Route path='create-listing' element={<CreateListingPage />} />
						<Route
							path='edit-listing/:listingId'
							element={<EditListingPage />}
						/>
						<Route
							path='category/:categoryName/:listingId'
							element={<ListingPage />}
						/>
						<Route path='contact/:landlordId' element={<ContactPage />} />
						<Route path='*' element={<NotFoundPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	)
}
export default App
