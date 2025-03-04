export type UsersType = {
	id: number
	avatar_url: string
	events_url: string
	followers_url: string
	following_url: string
	gists_url: string
	gravatar_id: string
	html_url: string
	login: string
	node_id: string
	organizations_url: string
	received_events_url: string
	repos_url: string
	site_admin: boolean
	starred_url: string
	subscriptions_url: string
	type: string
	url: string
	user_view_type: string
}

export type GithubContextType = {
	users: UsersType[]
	fetchUsers: () => void
	isLoading: boolean
}

export type FormEvent = React.FormEvent<HTMLFormElement>
export type MouseEvent = React.MouseEvent<HTMLButtonElement>
export type ChangeEvent = React.ChangeEvent<HTMLInputElement>
