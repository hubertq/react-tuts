import { RepositoryType, UsersType } from '../../types'

// Define action types as an enum to ensure consistency and prevent typos
export enum GithubActionTypes {
	SET_USERS = 'SET_USERS',
	SET_USER_AND_REPOS = 'SET_USER_AND_REPOS',
	SET_LOADING = 'SET_LOADING',
	CLEAR_USERS = 'CLEAR_USERS',
}

// Define type for each action type to enforce type safety
export type SetUsersAction = {
	type: GithubActionTypes.SET_USERS
	payload: UsersType[]
}

export type SetUserAndReposAction = {
	type: GithubActionTypes.SET_USER_AND_REPOS
	payload: { user: UsersType; repos: RepositoryType[] }
}

export type SetLoadingAction = {
	type: GithubActionTypes.SET_LOADING
}

export type ClearUsersAction = {
	type: GithubActionTypes.CLEAR_USERS
}

// Define a union type Actions to represent all possible action types
export type GithubActions =
	| SetUsersAction
	| SetUserAndReposAction
	| SetLoadingAction
	| ClearUsersAction

// Type for state
export type GithubState = {
	users: UsersType[]
	user: UsersType
	repos: RepositoryType[]
	isLoading: boolean
}

const githubReducer = (state: GithubState, action: GithubActions) => {
	switch (action.type) {
		case GithubActionTypes.SET_USERS:
			return {
				...state,
				users: action.payload,
				isLoading: false,
			}
		case GithubActionTypes.SET_USER_AND_REPOS:
			return {
				...state,
				repos: action.payload.repos,
				user: action.payload.user,
				isLoading: false,
			}
		case GithubActionTypes.SET_LOADING:
			return {
				...state,
				isLoading: true,
			}
		case GithubActionTypes.CLEAR_USERS:
			return {
				...state,
				users: [],
			}
		default:
			return state
	}
}

export default githubReducer
