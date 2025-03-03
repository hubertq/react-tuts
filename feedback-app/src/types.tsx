export interface FeedbackItemType {
	id: string
	rating: number
	text: string
}

export type NewFeedbackItemType = Omit<FeedbackItemType, 'id'>

export interface FeedbackItemEditType {
	item: FeedbackItemType | null
	edit: boolean
}

export type FeedbackContextType = {
	feedback: FeedbackItemType[]
	feedbackEdit: FeedbackItemEditType
	isLoading: boolean
	deleteFeedback: (id: string) => void
	addFeedback: (newFeedback: FeedbackItemType) => void
	updateFeedback: (id: string, updItem: FeedbackItemType) => void
	editFeedback: (item: FeedbackItemType) => void
}

// export type FeedbackItemWithoutID = Omit<FeedbackItemType, 'id'>

export type FormEvent = React.FormEvent<HTMLFormElement>
export type MouseEvent = React.MouseEvent<HTMLButtonElement>
export type ChangeEvent = React.ChangeEvent<HTMLInputElement>
