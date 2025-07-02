import { createContext, useReducer } from 'react'

export const MediaContext = createContext()

export const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_MEDIA':
			return { ...state, media: action.payload }
		case 'SET_LOADING':
			return { ...state, isLoading: action.payload }
		case 'SET_ERROR':
			return { ...state, error: action.payload }
		case 'SET_SEARCH':
			return { ...state, searchTerm: action.payload }
		default:
			return state
	}
}

export const MediaContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, {
		media: [],
		isLoading: false,
		error: null,
		searchTerm: '',
	})

	return (
		<MediaContext.Provider value={{ ...state, dispatch }}>
			{children}
		</MediaContext.Provider>
	)
}
