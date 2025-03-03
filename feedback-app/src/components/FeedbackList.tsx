import { useContext } from 'react'
import FeedbackItem from './FeedbackItem'
import { AnimatePresence } from 'motion/react'
import FeedbackContext from '../context/FeedbackContext'
import Spinner from './shared/Spinner'

const FeedbackList = () => {
	const { feedback, isLoading } = useContext(FeedbackContext)
	if (!isLoading && (!feedback || feedback.length === 0))
		return <p>No Feedback Yet</p>

	return isLoading ? (
		<Spinner />
	) : (
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
