import { createContext, ReactNode, useState } from 'react'
import {
	FeedbackContextType,
	FeedbackItemEditType,
	FeedbackItemType,
} from '../types'
import FeedbackData from '../data/FeedbackData'

const FeedbackContext = createContext<FeedbackContextType>(
	{} as FeedbackContextType
)

export const FeedbackProvider = ({
	children,
}: {
	children: ReactNode
}) => {
	const [feedback, setFeedback] =
		useState<FeedbackItemType[]>(FeedbackData)

	const [feedbackEdit, setFeedbackEdit] =
		useState<FeedbackItemEditType>({
			item: null,
			edit: false,
		})

	const addFeedback = (newFeedback: FeedbackItemType) => {
		setFeedback(prev => [newFeedback, ...prev])
	}

	const deleteFeedback = (id: string) => {
		if (window.confirm('Are you sure you want to delete?')) {
			setFeedback(feedback.filter(item => item.id !== id))
		}
	}

	const updateFeedback = (id: string, updItem: FeedbackItemType) => {
		const updatedFeedbackList = feedback.map(item => {
			if (item.id === id) return updItem
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
			}}
		>
			{children}
		</FeedbackContext>
	)
}

export default FeedbackContext
