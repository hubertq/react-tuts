import { FaEdit, FaTimes } from 'react-icons/fa'
import { FeedbackItemType } from '../types'
import Card from './shared/Card'
import * as motion from 'motion/react-client'
import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'

type FeedbackItemProps = {
	item: FeedbackItemType
}
const FeedbackItem = ({ item }: FeedbackItemProps) => {
	const { deleteFeedback, editFeedback } = useContext(FeedbackContext)
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0 }}
			key='box'
		>
			<Card>
				<div className='num-display'>{item.rating}</div>
				<button className='edit' onClick={() => editFeedback(item)}>
					<FaEdit color='purple ' />
				</button>
				<button className='close' onClick={() => deleteFeedback(item.id)}>
					<FaTimes color='purple' />
				</button>
				<div className='text-display'>{item.text}</div>
			</Card>
		</motion.div>
	)
}
export default FeedbackItem
