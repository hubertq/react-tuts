import { doc, DocumentData, getDoc } from 'firebase/firestore'
import { useState, useEffect, ChangeEvent } from 'react'
import { useParams, useSearchParams } from 'react-router'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'

const ContactPage = () => {
	const [message, setMessage] = useState('')
	const [landlord, setLandlord] = useState<DocumentData | null>(null)
	const [searchParams, setSearchParams] = useSearchParams()

	const params = useParams()
	const landlordId = params?.landlordId || ''

	useEffect(() => {
		const getLandloard = async () => {
			const docRef = doc(db, 'users', landlordId)
			const docSnap = await getDoc(docRef)

			if (docSnap.exists()) {
				setLandlord(docSnap.data())
			} else {
				toast.error('Could not get lanlord data.')
			}
		}

		getLandloard()
	}, [])

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
		setMessage(e.target.value)

	return (
		<div className='pageContainer' style={{ marginBottom: '10em' }}>
			<header>
				<p className='pageHeader'>Contact Landlord</p>
			</header>

			{landlord !== null && (
				<main>
					<div className='contactLandlord'>
						<p className='landlordName'>Contact {landlord.name}</p>
					</div>

					<form className='messageForm'>
						<div className='messageDiv'>
							<label htmlFor='message' className='messageLabel'>
								Message
							</label>
							<textarea
								name='message'
								id='message'
								className='textarea'
								value={message}
								onChange={handleChange}
							></textarea>
						</div>

						<a
							href={`mailto:${landlord.email}?Subject=${searchParams.get(
								'listingName'
							)}&body=${message}`}
						>
							<button type='button' className='primaryButton'>
								Send Message
							</button>
						</a>
					</form>
				</main>
			)}
		</div>
	)
}
export default ContactPage
