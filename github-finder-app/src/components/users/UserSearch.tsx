import { useContext, useState } from 'react'
import { ChangeEvent, FormEvent, UsersType } from '../../types'
import GithubContext from '../../contexts/github/GithubContext'
import AlertContext from '../../contexts/alert/AlertContext'
import { searchUsers } from '../../contexts/github/GithubActions'
import { GithubActionTypes } from '../../contexts/github/GithubReducer'

const UserSearch = () => {
	const [text, setText] = useState<string>('')

	const { users, dispatch } = useContext(GithubContext)
	const { setAlert } = useContext(AlertContext)

	const handleChange = (e: ChangeEvent) => setText(e.target.value)

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		if (text === '') {
			setAlert('Please enter something', 'error')
		} else {
			dispatch({ type: GithubActionTypes.SET_LOADING })
			const users: UsersType[] = await searchUsers(text)
			dispatch({ type: GithubActionTypes.SET_USERS, payload: users })
			setText('')
		}
	}

	const handleClear = () =>
		dispatch({
			type: GithubActionTypes.CLEAR_USERS,
		})

	return (
		<div className='grid grid-cols-1 mb-8 gap-8 max-w-[700px] mx-auto'>
			<div>
				<form onSubmit={handleSubmit}>
					<div className='form-control'>
						<div className='relative'>
							<input
								type='text'
								className='w-full pr-40 bg-gray-200 input input-lg text-black'
								placeholder='Search'
								value={text}
								onChange={handleChange}
							/>
							<button
								type='submit'
								className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg'
							>
								Go
							</button>
						</div>
					</div>
				</form>
			</div>
			{users.length > 0 && (
				<div>
					<button
						className='btn btn-primary btn-block'
						onClick={handleClear}
					>
						Clear
					</button>
				</div>
			)}
		</div>
	)
}
export default UserSearch
