import { createContext, ReactNode, useReducer } from 'react'
import { GithubContextType, UsersType } from '../../types'
import githubReducer, { GithubState } from './GithubReducer'

type Props = {
	children: ReactNode
}

const GithubContext = createContext<GithubContextType>(
	{} as GithubContextType
)

export const GithubProvider = ({ children }: Props) => {
	const initialState: GithubState = {
		users: [],
		user: {} as UsersType,
		repos: [],
		isLoading: false,
	}

	const [state, dispatch] = useReducer(githubReducer, initialState)

	return (
		<GithubContext
			value={{
				...state,
				dispatch,
			}}
		>
			{children}
		</GithubContext>
	)
}

export default GithubContext
