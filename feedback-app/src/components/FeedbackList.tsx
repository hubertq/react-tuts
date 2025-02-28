import { useContext } from 'react'
import FeedbackItem from './FeedbackItem'
import { AnimatePresence } from 'motion/react'
import FeedbackContext from '../context/FeedbackContext'

const FeedbackList = () => {
	const { feedback } = useContext(FeedbackContext)
	if (!feedback || feedback.length === 0) return <p>No Feedback Yet</p>
	return (
		<div className='feedback-list'>
			<AnimatePresence initial={false}>
				{feedback.map(item => (
					<FeedbackItem key={item.id} item={item} />
				))}
			</AnimatePresence>
		</div>
	)
}
export default FeedbackList
