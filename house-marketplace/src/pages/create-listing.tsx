import {
	ChangeEvent,
	FormEvent,
	MouseEvent,
	useEffect,
	useState,
} from 'react'
import { auth, db } from '../firebase.config'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router'
import Spinner from '../components/spinner'
import {
	isButtonInput,
	isFileInput,
	isNumberInput,
	isTextInput,
} from '../guards'
import { toast } from 'react-toastify'
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
	StorageError,
} from 'firebase/storage'

import { v4 as uuidv4 } from 'uuid'
import {
	addDoc,
	collection,
	serverTimestamp,
} from 'firebase/firestore'

type FormDataType = {
	userRef: string
	type: string
	name: string
	bedrooms: number
	bathrooms: number
	parking: boolean
	furnished: boolean
	address?: string
	offer: boolean
	regularPrice: number
	discountedPrice?: number
	images?: FileList | null
	latitude: number
	longitude: number
	location: string
}

const google_api_key = import.meta.env.VITE_GEOCODE_API_KEY

const CreateListingPage = () => {
	const [geolocationEnabled, setGeolocationEnabled] = useState(true)
	const [isLoading, setIsLoading] = useState(false)
	const [formData, setFormData] = useState<FormDataType>({
		userRef: '',
		type: 'rent',
		name: '',
		bedrooms: 1,
		bathrooms: 1,
		parking: false,
		furnished: false,
		address: '',
		offer: false,
		regularPrice: 0,
		discountedPrice: 0,
		images: null,
		latitude: 0,
		longitude: 0,
		location: '',
	})

	const {
		userRef,
		type,
		name,
		bedrooms,
		bathrooms,
		parking,
		furnished,
		address,
		offer,
		regularPrice,
		discountedPrice,
		images,
		latitude,
		longitude,
	} = formData

	const navigate = useNavigate()

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				setFormData({ ...formData, userRef: user.uid })
			} else {
				navigate('/sign-in')
			}
		})
	}, [])

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		setIsLoading(true)

		if (discountedPrice && regularPrice <= discountedPrice) {
			setIsLoading(false)
			toast.error(
				'Discounted price needs to be less than regular price.'
			)
			return
		}

		if (images && images.length > 6) {
			setIsLoading(false)
			toast.error('Max 6 images.')
			return
		}

		let geolocation = { lat: 0, lng: 0 }
		let location = ''

		if (geolocationEnabled) {
			const response = await fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${google_api_key}`
			)

			const data = await response.json()

			geolocation.lat = data.results[0]?.geometry.location.lat ?? 0
			geolocation.lng = data.results[0]?.geometry.location.lng ?? 0

			location =
				data.status === 'ZERO_RESULTS'
					? undefined
					: data.results[0]?.formatted_address

			if (location === undefined || location.includes('undefined')) {
				setIsLoading(false)
				toast.error('Please enter a correct address')
				return
			}
		} else {
			geolocation.lat = latitude
			geolocation.lng = longitude
			location = address || ''
		}

		// Store image in firebase
		const storeImage = async (image: File): Promise<string> => {
			return new Promise((resolve, reject) => {
				const storage = getStorage()
				const fileName = `${formData.userRef}-${image.name}-${uuidv4()}`

				const storageRef = ref(storage, 'images/' + fileName)

				const uploadTask = uploadBytesResumable(storageRef, image)

				uploadTask.on(
					'state_changed',
					snapshot => {
						// Observe state change events such as progess, pause, and resume
						// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
						const progess =
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100
						console.log('Upload is ' + progess + '% done')
						switch (snapshot.state) {
							case 'paused':
								console.log('Upload is paused')
								break
							case 'running':
								console.log('Upload is running')
								break
						}
					},
					error => {
						// Handle unsuccessful uploads
						reject(error)
					},
					() => {
						// Handle successful uploads on complete
						// For instance, get the download URL: https://firebasestorage.googleapis.com/...
						getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
							resolve(downloadURL)
						})
					}
				)
			})
		}

		let imageUrls: string[] | void = []

		if (images) {
			imageUrls = await Promise.all(
				[...images].map(image => storeImage(image))
			).catch(() => {
				setIsLoading(false)
				toast.error('Images not uploaded.')
				return
			})
		}

		const formDataCopy = {
			...formData,
			imageUrls,
			geolocation,
			timestamp: serverTimestamp(),
		}
		formDataCopy.location = address || ''
		delete formDataCopy.images
		delete formDataCopy.address
		// location && (formDataCopy.location = location)
		!formDataCopy.offer && delete formDataCopy.discountedPrice

		const docRef = await addDoc(
			collection(db, 'listings'),
			formDataCopy
		)
		setIsLoading(false)
		toast.success('Listing saved.')
		navigate(`/category/${formDataCopy.type}/${docRef.id}`)
	}

	const handleMutate = (
		e:
			| MouseEvent<HTMLButtonElement>
			| ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		if (isButtonInput(e)) {
			let value: string | boolean | null = e.currentTarget.value

			if (value === 'true') value = true
			if (value === 'false') value = false

			const input = { [e.currentTarget.id]: value }

			setFormData(prev => ({
				...prev,
				...input,
			}))
		}

		if (isFileInput(e)) {
			setFormData(prev => ({
				...prev,
				images: e.target.files,
			}))
		}

		if (isTextInput(e)) {
			setFormData(prev => ({
				...prev,
				[e.target.id]: e.target.value,
			}))
		}

		if (isNumberInput(e)) {
			setFormData(prev => ({
				...prev,
				[e.target.id]: +e.target.value,
			}))
		}
	}

	if (isLoading) return <Spinner />
	return (
		<div className='profile'>
			<header>
				<p className='pageHeader'>Create a Listing</p>
			</header>

			<main>
				<form onSubmit={handleSubmit}>
					<label className='formLabel'>Sell / Rent</label>
					<div className='formButtons'>
						<button
							type='button'
							className={type === 'sale' ? 'formButtonActive' : 'formButton'}
							id='type'
							value='sale'
							onClick={handleMutate}
						>
							Sell
						</button>
						<button
							type='button'
							className={type === 'rent' ? 'formButtonActive' : 'formButton'}
							id='type'
							value='rent'
							onClick={handleMutate}
						>
							Rent
						</button>
					</div>

					<label className='formLabel'>Name</label>
					<input
						className='formInputName'
						type='text'
						id='name'
						value={name}
						onChange={handleMutate}
						maxLength={32}
						minLength={10}
						required
					/>

					<div className='formRooms flex'>
						<div>
							<label className='formLabel'>Bedrooms</label>
							<input
								className='formInputSmall'
								type='number'
								id='bedrooms'
								value={bedrooms}
								onChange={handleMutate}
								min='1'
								max='50'
								required
							/>
						</div>
						<div>
							<label className='formLabel'>Bathrooms</label>
							<input
								className='formInputSmall'
								type='number'
								id='bathrooms'
								value={bathrooms}
								onChange={handleMutate}
								min='1'
								max='50'
								required
							/>
						</div>
					</div>

					<label className='formLabel'>Parking spot</label>
					<div className='formButtons'>
						<button
							className={parking ? 'formButtonActive' : 'formButton'}
							type='button'
							id='parking'
							value='true'
							onClick={handleMutate}
						>
							Yes
						</button>
						<button
							className={
								!parking && parking !== null
									? 'formButtonActive'
									: 'formButton'
							}
							type='button'
							id='parking'
							value='false'
							onClick={handleMutate}
						>
							No
						</button>
					</div>

					<label className='formLabel'>Furnished</label>
					<div className='formButtons'>
						<button
							className={furnished ? 'formButtonActive' : 'formButton'}
							type='button'
							id='furnished'
							value='true'
							onClick={handleMutate}
						>
							Yes
						</button>
						<button
							className={
								!furnished && furnished !== null
									? 'formButtonActive'
									: 'formButton'
							}
							type='button'
							id='furnished'
							value='false'
							onClick={handleMutate}
						>
							No
						</button>
					</div>

					<label className='formLabel'>Address</label>
					<textarea
						className='formInputAddress'
						id='address'
						value={address}
						onChange={handleMutate}
						required
					/>

					{!geolocationEnabled && (
						<div className='formLatLng flex'>
							<div>
								<label className='formLabel'>Latitude</label>
								<input
									className='formInputSmall'
									type='number'
									id='latitude'
									value={latitude}
									onChange={handleMutate}
									required
								/>
							</div>
							<div>
								<label className='formLabel'>Longitude</label>
								<input
									className='formInputSmall'
									type='number'
									id='longitude'
									value={longitude}
									onChange={handleMutate}
									required
								/>
							</div>
						</div>
					)}

					<label className='formLabel'>Offer</label>
					<div className='formButtons'>
						<button
							className={offer ? 'formButtonActive' : 'formButton'}
							type='button'
							id='offer'
							value='true'
							onClick={handleMutate}
						>
							Yes
						</button>
						<button
							className={
								!offer && offer !== null ? 'formButtonActive' : 'formButton'
							}
							type='button'
							id='offer'
							value='false'
							onClick={handleMutate}
						>
							No
						</button>
					</div>

					<label className='formLabel'>Regular Price</label>
					<div className='formPriceDiv'>
						<input
							className='formInputSmall'
							type='number'
							id='regularPrice'
							value={regularPrice}
							onChange={handleMutate}
							min='50'
							max='750000000'
							required
						/>
						{type === 'rent' && <p className='formPriceText'>$ / Month</p>}
					</div>

					{offer && (
						<>
							<label className='formLabel'>Discounted Price</label>
							<input
								className='formInputSmall'
								type='number'
								id='discountedPrice'
								value={discountedPrice}
								onChange={handleMutate}
								min='50'
								max='750000000'
								required={offer}
							/>
						</>
					)}

					<label className='formLabel'>Images</label>
					<p className='imagesInfo'>
						The first image will be the cover (max 6).
					</p>
					<input
						className='formInputFile'
						type='file'
						id='images'
						onChange={handleMutate}
						max='6'
						accept='.jpg,.png,.jpeg'
						multiple
						required
					/>
					<button
						type='submit'
						className='primaryButton createListingButton'
					>
						Create Listing
					</button>
				</form>
			</main>
		</div>
	)
}
export default CreateListingPage
