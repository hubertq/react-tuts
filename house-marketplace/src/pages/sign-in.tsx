import { ChangeEvent, FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import ArrowRightIcon from '../assets/svg/keyboardArrowRightIcon.svg?react'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { auth } from '../firebase.config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'
import OAuth from '../components/o-auth'

const SignInPage = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	const { email, password } = formData

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
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			)

			if (userCredential.user) navigate('/')
		} catch (error: any) {
			toast.error('Incorrect credentials.')
		}
	}
	return (
		<>
			<div className='pageContainer'>
				<header>
					<p className='pageHeader'>Welcome Back!</p>
				</header>

				<form onSubmit={handleSubmit}>
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

					<div className='signInBar'>
						<p className='signInText'>Sign In</p>
						<button className='signInButton'>
							<ArrowRightIcon fill='#fff' width={34} height={34} />
						</button>
					</div>
				</form>

				<OAuth />
				<Link to={'/sign-up'} className='registerLink'>
					Sign Up Instead
				</Link>
			</div>
		</>
	)
}
export default SignInPage
