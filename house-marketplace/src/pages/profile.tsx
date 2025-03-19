import { ChangeEvent, useEffect, useState } from 'react'
import { auth, db } from '../firebase.config'
import { updateProfile } from 'firebase/auth'
import { Link, useNavigate } from 'react-router'
import {
	doc,
	updateDoc,
	collection,
	getDocs,
	query,
	where,
	orderBy,
	deleteDoc,
} from 'firebase/firestore'
import { toast } from 'react-toastify'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
import { ListingType } from '../types'
import ListingItem from '../components/listing-item'

const ProfilePage = () => {
	const [changeDetails, setChangeDetails] = useState(false)
	const [listings, setListings] = useState<ListingType[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [formData, setFormData] = useState({
		name: auth.currentUser?.displayName,
		email: auth.currentUser?.email,
	})

	const { name, email } = formData

	const navigate = useNavigate()

	useEffect(() => {
		const fetchUserListings = async () => {
			if (auth.currentUser) {
				const listingsRef = collection(db, 'listings')

				const q = query(
					listingsRef,
					where('userRef', '==', auth.currentUser.uid),
					orderBy('timestamp', 'desc')
				)

				const querySnap = await getDocs(q)

				const docs: ListingType[] = []

				querySnap.forEach(doc =>
					docs.push({
						id: doc.id,
						...doc.data(),
					} as ListingType)
				)

				setListings(docs)
				setIsLoading(false)
			}
		}

		fetchUserListings()
	}, [])

	const handleLogout = () => {
		auth.signOut()
		navigate('/')
	}

	const handleSubmit = async () => {
		try {
			if (auth.currentUser && auth.currentUser?.displayName !== name) {
				// Update display name in firebase
				await updateProfile(auth.currentUser, {
					displayName: name,
				})

				// Update in firestore
				const userRef = doc(db, 'users', auth.currentUser.uid)
				await updateDoc(userRef, {
					name,
				})
			}
		} catch (error: any) {
			toast.error('Something went wrong.')
		}
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData(prev => ({
			...prev,
			[e.target.id]: e.target.value,
		}))
	}

	const handleDelete = async (listingId: string) => {
		if (window.confirm('Are you sure you want to delete?')) {
			await deleteDoc(doc(db, 'listings', listingId))
			const updatedListings = listings.filter(
				listing => listing.id !== listingId
			)
			setListings(updatedListings)
			toast.success('Successfully deleted listing')
		}
	}

	const handleEdit = (listingId: string) =>
		navigate(`/edit-listing/${listingId}`)

	return (
		<div className='profile'>
			<header className='profileHeader'>
				<p className='pageHeader'>My Profile</p>
				<button type='button' className='logOut' onClick={handleLogout}>
					Logout
				</button>
			</header>

			<main>
				<div className='profileDetailsHeader'>
					<p className='profileDetailsText'>Personal Details</p>
					<p
						className='changePersonalDetails'
						onClick={() => {
							changeDetails && handleSubmit()
							setChangeDetails(prev => !prev)
						}}
					>
						{changeDetails ? 'Done' : 'Change'}
					</p>
				</div>

				<div className='profileCard'>
					<form onSubmit={handleSubmit}>
						<input
							type='text'
							id='name'
							className={
								!changeDetails ? 'profileName' : 'profileNameActive'
							}
							disabled={!changeDetails}
							value={name || ''}
							onChange={handleChange}
						/>
						<input
							type='text'
							id='email'
							className={
								!changeDetails ? 'profileEmail' : 'profileEmailActive'
							}
							disabled={!changeDetails}
							value={email || ''}
							onChange={handleChange}
						/>
					</form>
				</div>
				<Link to={'/create-listing'} className='createListing'>
					<img src={homeIcon} alt='alt' />
					<p>Sell or rent your home</p>
					<img src={arrowRight} alt='arrow right' />
				</Link>

				{!isLoading && listings.length > 0 && (
					<>
						<p className='listingText'>Your Listings</p>
						<ul className='listingsList'>
							{listings.map(listing => (
								<ListingItem
									key={listing.id}
									listing={listing}
									onDelete={() => handleDelete(listing.id)}
									onEdit={() => handleEdit(listing.id)}
								/>
							))}
						</ul>
					</>
				)}
			</main>
		</div>
	)
}
export default ProfilePage
