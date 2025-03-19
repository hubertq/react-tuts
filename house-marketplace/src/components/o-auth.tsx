import { useLocation, useNavigate } from 'react-router'
import { auth, db } from '../firebase.config'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import {
	doc,
	getDoc,
	serverTimestamp,
	setDoc,
} from 'firebase/firestore'
import { toast } from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'

const OAuth = () => {
	const navigate = useNavigate()
	const location = useLocation()

	const handleClick = async () => {
		try {
			const provider = new GoogleAuthProvider()
			const result = await signInWithPopup(auth, provider)
			const user = result.user

			// Check for user
			const docRef = doc(db, 'users', user.uid)
			const docSnap = await getDoc(docRef)

			// If user doesn't exist, create user
			if (!docSnap.exists()) {
				await setDoc(doc(db, 'users', user.uid), {
					name: user.displayName,
					email: user.email,
					timestamp: serverTimestamp(),
				})
			}

			navigate('/')
		} catch (error) {
			toast.error('Could not authorize with Google.')
		}
	}
	return (
		<div className='socialLogin'>
			<p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with </p>
			<button type='button' className='socialIconDiv'>
				<img
					className='socialIconImg'
					src={googleIcon}
					alt='Google'
					onClick={handleClick}
				/>
			</button>
		</div>
	)
}
export default OAuth
