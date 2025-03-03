import { createContext, ReactNode, useEffect, useState } from 'react'
import {
	FeedbackContextType,
	FeedbackItemEditType,
	FeedbackItemType,
	NewFeedbackItemType,
} from '../types'

const FeedbackContext = createContext<FeedbackContextType>(
	{} as FeedbackContextType
)

export const FeedbackProvider = ({
	children,
}: {
	children: ReactNode
}) => {
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [feedback, setFeedback] = useState<FeedbackItemType[]>([])
	const [feedbackEdit, setFeedbackEdit] =
		useState<FeedbackItemEditType>({
			item: null,
			edit: false,
		})

	useEffect(() => {
		fetchFeedback()
	}, [])

	const fetchFeedback = async () => {
		const response = await fetch(
			'http://192.168.1.21:5000/feedback?_sort=id&_order=desc'
		)
		const data = await response.json()

		setFeedback(data)
		setIsLoading(false)
	}

	// Add feedback
	const addFeedback = async (newFeedback: NewFeedbackItemType) => {
		const response = await fetch('http://192.168.1.21:5000/feedback', {
			method: 'POST',
			headers: {
				'Content0-Type': 'application/json',
			},
			body: JSON.stringify(newFeedback),
		})

		const data = await response.json()

		setFeedback([data, ...feedback])
	}

	// Delete feedback
	const deleteFeedback = async (id: string) => {
		if (window.confirm('Are you sure you want to delete?')) {
			await fetch(`http://192.168.1.21:5000/feedback/${id}`, {
				method: 'DELETE',
			})
			setFeedback(feedback.filter(item => item.id !== id))
		}
	}

	// Update feedback
	const updateFeedback = async (
		id: string,
		updItem: FeedbackItemType
	) => {
		const response = await fetch(
			`http://192.168.1.21:5000/feedback/${id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updItem),
			}
		)

		const data: FeedbackItemType = await response.json()

		const updatedFeedbackList = feedback.map(item => {
			if (item.id === id) return data
			return item
		})
		setFeedback(updatedFeedbackList)
		setFeedbackEdit({
			item: null,
			edit: false,
		})
	}

	const editFeedback = (item: FeedbackItemType) => {
		setFeedbackEdit({
			item,
			edit: true,
		})
	}

	return (
		<FeedbackContext
			value={{
				feedback,
				feedbackEdit,
				addFeedback,
				editFeedback,
				updateFeedback,
				deleteFeedback,
				isLoading,
			}}
		>
			{children}
		</FeedbackContext>
	)
}

export default FeedbackContext
