import { doc, DocumentData, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { auth, db } from '../firebase.config'
import Spinner from '../components/spinner'
import shareIcon from '../assets/svg/shareIcon.svg'
import { ListingType } from '../types'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
	A11y,
	Navigation,
	Pagination,
	Scrollbar,
} from 'swiper/modules'

import 'swiper/swiper-bundle.css'

const ListingPage = () => {
	const [listing, setListing] = useState<ListingType>(
		{} as ListingType
	)
	const [isLoading, setIsLoading] = useState(true)
	const [shareLinkCopied, setShareLinkCopied] = useState(false)

	const navigate = useNavigate()
	const params = useParams()

	useEffect(() => {
		const listingID = params.listingId

		if (listingID) {
			const fetchListing = async () => {
				const docRef = doc(db, 'listings', listingID)
				const docSnap = await getDoc(docRef)

				if (docSnap.exists()) {
					setListing(docSnap.data() as ListingType)
					setIsLoading(false)
				}
			}

			fetchListing()
		}
	}, [])

	const handleCopy = async () => {
		await navigator.clipboard.writeText(window.location.href)
		setShareLinkCopied(true)
		setTimeout(() => {
			setShareLinkCopied(false)
		}, 2000)
	}

	if (isLoading) return <Spinner />
	return (
		<main>
			<Swiper
				modules={[Navigation, Pagination, Scrollbar, A11y]}
				slidesPerView={1}
				pagination={{ clickable: true }}
				style={{ height: '300px' }}
			>
				{listing.imageUrls.map((url, i) => (
					<SwiperSlide key={i}>
						<div
							style={{
								background: `url(${listing.imageUrls[i]}) center no-repeat`,
								backgroundSize: 'cover',
							}}
							className='swiperSlideDiv'
						></div>
					</SwiperSlide>
				))}
			</Swiper>

			<div className='shareIconDiv' onClick={handleCopy}>
				<img src={shareIcon} alt='share' />
			</div>

			{shareLinkCopied && <p className='linkCopied'>Link Copied!</p>}

			<div className='listingDetails'>
				<p className='listingName'>
					{listing.name} - $
					{listing.offer
						? listing.discountedPrice
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
						: listing.regularPrice
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
				</p>
				<p className='listingLocation'>{listing.location}</p>
				<p className='listingType'>
					For {listing.type === 'rent' ? 'Rent' : 'Sale'}
				</p>
				{listing.offer && (
					<p className='discountPrice'>
						${listing.regularPrice - listing.discountedPrice} discount
					</p>
				)}
				<ul className='listingDetailsList'>
					<li>
						{listing.bedrooms > 1
							? `${listing.bedrooms} Bedrooms`
							: '1 Bedroom'}
					</li>
					<li>
						{listing.bathrooms > 1
							? `${listing.bathrooms} Bathrooms`
							: '1 Bathroom'}
					</li>
					<li>{listing.parking && 'Parking Spot'}</li>
					<li>{listing.furnished && 'Furnished'}</li>
				</ul>

				<p className='listingLocationTitle'>Location</p>

				<div className='leafletContainer'>
					<MapContainer
						style={{ height: '100%', width: '100%' }}
						center={[listing.geolocation.lat, listing.geolocation.lng]}
						zoom={13}
						scrollWheelZoom={false}
					>
						<TileLayer
							attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
							url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
						/>

						<Marker
							position={[listing.geolocation.lat, listing.geolocation.lng]}
						>
							<Popup>{listing.location}</Popup>
						</Marker>
					</MapContainer>
				</div>

				{auth.currentUser?.uid !== listing.userRef && (
					<Link
						to={`/contact/${listing.userRef}?listingName=${listing.name}`}
						className='primaryButton'
					>
						Contact Landlord
					</Link>
				)}
			</div>
		</main>
	)
}
export default ListingPage
