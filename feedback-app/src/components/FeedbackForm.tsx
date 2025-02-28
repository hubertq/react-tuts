import { useContext, useEffect, useState } from 'react'
import Card from './shared/Card'
import { ChangeEvent, FeedbackItemType, FormEvent } from '../types'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import { v4 as uuidv4 } from 'uuid'
import FeedbackContext from '../context/FeedbackContext'

const FeedbackForm = () => {
	const [text, setText] = useState<string>('')
	const [rating, setRating] = useState<number>(10)
	const [btnDisabled, setBtnDisabled] = useState<boolean>(true)
	const [message, setMessage] = useState<string | null>('')

	const { addFeedback, feedbackEdit, updateFeedback } =
		useContext(FeedbackContext)

	useEffect(() => {
		if (feedbackEdit.edit === true && feedbackEdit.item) {
			setBtnDisabled(false)
			setText(feedbackEdit.item.text)
			setRating(feedbackEdit.item.rating)
		}
	}, [feedbackEdit])

	const handleTextChange = (e: ChangeEvent) => {
		if (text === '') {
			setBtnDisabled(true)
			setMessage(null)
		} else if (text !== '' && text.trim().length <= 10) {
			setMessage('Text must be at least 10 characters.')
			setBtnDisabled(true)
		} else {
			setMessage(null)
			setBtnDisabled(false)
		}

		setText(e.target.value)
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		if (text.trim().length > 10) {
			const id = uuidv4()
			const newFeedback: FeedbackItemType = { text, rating, id }

			if (feedbackEdit.edit === true && feedbackEdit.item) {
				updateFeedback(feedbackEdit.item.id, {
					...feedbackEdit.item,
					text,
					rating,
				})
			} else {
				addFeedback(newFeedback)
			}

			setText('')
			setRating(10)
		}
	}
	return (
		<Card>
			<form onSubmit={handleSubmit}>
				<h2>How would you rate your service with us?</h2>
				<RatingSelect select={rating => setRating(rating)} />

				<div className='input-group'>
					<input
						onChange={handleTextChange}
						type='text'
						placeholder='Write a review'
						value={text}
					/>
					<Button type='submit' isDisabled={btnDisabled}>
						Send
					</Button>
				</div>

				{message && <div className='message'>{message}</div>}
			</form>
		</Card>
	)
}
export default FeedbackForm
