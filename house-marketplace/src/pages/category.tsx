import {
	collection,
	DocumentData,
	getDocs,
	limit,
	orderBy,
	query,
	startAfter,
	where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { db } from '../firebase.config'
import Spinner from '../components/spinner'
import Listings from '../components/listings'
import { ListingType } from '../types'

const CategoryPage = () => {
	const [listings, setListings] = useState<ListingType[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [lastFetchedListing, setLastFetchedListing] =
		useState<DocumentData | null>(null)

	const params = useParams()

	useEffect(() => {
		const fetchListings = async () => {
			try {
				// Get referrence
				const listingsRef = collection(db, 'listings')

				// Create a query
				const q = query(
					listingsRef,
					where('type', '==', params.categoryName),
					orderBy('timestamp', 'desc'),
					limit(10)
				)

				// Execute query
				const querySnap = await getDocs(q)

				const lastVisible = querySnap.docs[querySnap.docs.length - 1]

				setLastFetchedListing(lastVisible)

				const data: ListingType[] = []

				querySnap.forEach(doc => {
					return data.push({
						id: doc.id,
						...doc.data(),
					} as ListingType)
				})

				setListings(data)
				setIsLoading(false)
			} catch (error) {}
		}

		fetchListings()
	}, [])

	// Pagination / Load More
	const onFetchMoreListings = async () => {
		try {
			// Get referrence
			const listingsRef = collection(db, 'listings')

			// Create a query
			const q = query(
				listingsRef,
				where('type', '==', params.categoryName),
				orderBy('timestamp', 'desc'),
				startAfter(lastFetchedListing),
				limit(10)
			)

			// Execute query
			const querySnap = await getDocs(q)

			const lastVisible = querySnap.docs[querySnap.docs.length - 1]

			setLastFetchedListing(lastVisible)

			const data: ListingType[] = []

			querySnap.forEach(doc => {
				return data.push({
					id: doc.id,
					...doc.data(),
				} as ListingType)
			})

			setListings(prev => [...prev, ...data])
			setIsLoading(false)
		} catch (error) {}
	}
	return (
		<>
			<div className='category'>
				<header>
					<p className='pageHeader'>
						Places for
						{params.categoryName === 'rent' ? ' rent' : ' sale'}
					</p>
				</header>

				{isLoading ? (
					<Spinner />
				) : (
					<Listings
						listings={listings}
						category={params.categoryName || ''}
					/>
				)}
			</div>

			{lastFetchedListing && (
				<p className='loadMore' onClick={onFetchMoreListings}>
					Load More
				</p>
			)}
		</>
	)
}
export default CategoryPage
