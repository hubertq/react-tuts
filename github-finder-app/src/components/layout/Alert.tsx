import { useContext } from 'react'
import AlertContext from '../../contexts/alert/AlertContext'

const Alert = () => {
	const { isVisible, message } = useContext(AlertContext)

	return (
		<div
			className={`grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-8 mb-4 max-w-[700px] mx-auto`}
			style={{ visibility: isVisible ? 'visible' : 'hidden' }}
		>
			<div className='alert alert-error'>
				<div className='flex items-center'>
					<svg
						fill='none'
						viewBox='0 0 24 24'
						className='w-6 h-6 stroke-current mr-3'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636'
						></path>
					</svg>
					<strong>{message}</strong>
				</div>
			</div>
		</div>
	)
}
export default Alert
