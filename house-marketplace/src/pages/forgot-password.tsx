import { ChangeEvent, FormEvent, useState } from 'react'
import { Link } from 'react-router'
import { auth } from '../firebase.config'
import { sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'
import ArrowRightIcon from '../assets/svg/keyboardArrowRightIcon.svg?react'

const ForgotPasswordPage = () => {
	const [email, setEmail] = useState('')

	const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
		setEmail(e.target.value)

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		try {
			await sendPasswordResetEmail(auth, email)
			toast.success('Email was sent.')
			setEmail('')
		} catch (error: any) {
			toast.error('Could not send reset email.')
		}
	}
	return (
		<div className='pageContainer'>
			<header>
				<p className='pageHeader'>Forgot Password</p>
			</header>

			<main>
				<form onSubmit={handleSubmit}>
					<input
						type='email'
						className='emailInput'
						placeholder='Email'
						value={email}
						onChange={handleChange}
					/>
					<Link className='forgotPasswordLink' to={'/sign-in'}>
						Sign In
					</Link>

					<div className='signInBar'>
						<div className='signInText'>Send Reset Link</div>
						<button type='submit' className='signInButton'>
							<ArrowRightIcon fill='#fff' width={34} height={34} />
						</button>
					</div>
				</form>
			</main>
		</div>
	)
}
export default ForgotPasswordPage
