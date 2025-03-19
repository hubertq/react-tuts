import { ChangeEvent, FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import {
	createUserWithEmailAndPassword,
	updateProfile,
	User,
} from 'firebase/auth'
import {
	setDoc,
	doc,
	serverTimestamp,
	FieldValue,
} from 'firebase/firestore'
import { auth, db } from '../firebase.config'
import ArrowRightIcon from '../assets/svg/keyboardArrowRightIcon.svg?react'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { toast } from 'react-toastify'
import OAuth from '../components/o-auth'

const SignUpPage = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	})

	const { name, email, password } = formData

	const navigate = useNavigate()

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData(prev => ({
			...prev,
			[e.target.id]: e.target.value,
		}))
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)

			const user = userCredential.user

			updateProfile(auth.currentUser as User, {
				displayName: name,
			})

			const formDataCopy: {
				email: string
				password?: string
				name: string
				timestamp?: FieldValue
			} = { ...formData }

			delete formDataCopy.password
			formDataCopy.timestamp = serverTimestamp()

			await setDoc(doc(db, 'users', user.uid), formDataCopy)

			navigate('/')
		} catch (error: any) {
			toast.error('Something went wrong.')
		}
	}
	return (
		<>
			<div className='pageContainer'>
				<header>
					<p className='pageHeader'>Create Account</p>
				</header>

				<form onSubmit={handleSubmit}>
					<input
						type='text'
						className='nameInput'
						placeholder='Name'
						id='name'
						value={name}
						onChange={handleChange}
					/>
					<input
						type='email'
						className='emailInput'
						placeholder='Email'
						id='email'
						value={email}
						onChange={handleChange}
					/>

					<div className='passwordInputDiv'>
						<input
							type={showPassword ? 'text' : 'password'}
							className='passwordInput'
							placeholder='Password'
							id='password'
							value={password}
							onChange={handleChange}
						/>

						<img
							src={visibilityIcon}
							alt='show password'
							className='showPassword'
							onClick={() => setShowPassword(prev => !prev)}
						/>
					</div>

					<Link to={'/forgot-password'} className='forgotPasswordLink'>
						Forgot Password
					</Link>

					<div className='signUpBar'>
						<p className='signUpText'>Sign Up</p>
						<button className='signUpButton'>
							<ArrowRightIcon fill='#fff' width={34} height={34} />
						</button>
					</div>
				</form>

				<OAuth />
				<Link to={'/sign-in'} className='registerLink'>
					Sign In Instead
				</Link>
			</div>
		</>
	)
}
export default SignUpPage
