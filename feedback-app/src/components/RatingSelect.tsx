import { useContext, useEffect, useState } from 'react'
import { ChangeEvent } from '../types'
import FeedbackContext from '../context/FeedbackContext'

type RatingSelectProps = {
	select: (rating: number) => void
}

const RatingSelect = ({ select }: RatingSelectProps) => {
	const [selected, setSelected] = useState<number>(10)

	const { feedbackEdit } = useContext(FeedbackContext)

	useEffect(() => {
		if (feedbackEdit.edit === true && feedbackEdit.item) {
			setSelected(feedbackEdit.item.rating)
		}
	}, [feedbackEdit])

	const handleChange = (e: ChangeEvent) => {
		setSelected(Number(e.currentTarget.value))
		select(Number(e.currentTarget.value))
	}
	return (
		<ul className='rating'>
			{Array.from({ length: 10 }, (_, i) => (
				<li key={`rating-${i + 1}`}>
					<input
						type='radio'
						id={`num${i + 1}`}
						name='rating'
						value={i + 1}
						onChange={handleChange}
						checked={selected === i + 1}
					/>
					<label htmlFor={`num${i + 1}`}>{i + 1}</label>
				</li>
			))}
		</ul>
	)
}
export default RatingSelect
