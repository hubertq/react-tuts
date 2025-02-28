import FeedbackStats from '../components/FeedbackStats'
import FeedbackForm from '../components/FeedbackForm'
import FeedbackList from '../components/FeedbackList'

const HomePage = () => {
	return (
		<>
			<FeedbackForm />
			<FeedbackStats />
			<FeedbackList />
		</>
	)
}
export default HomePage
