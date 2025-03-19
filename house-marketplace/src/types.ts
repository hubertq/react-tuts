import { Timestamp } from 'firebase/firestore'

export interface ListingType {
	id: string
	name: string
	type: string
	userRef: string
	bedrooms: number
	bathrooms: number
	parking: boolean
	furnished: boolean
	offer: boolean
	regularPrice: number
	discountedPrice: number
	location: string
	geolocation: {
		lat: number
		lng: number
	}
	imageUrls: string[]
	timestamp: Timestamp
}
