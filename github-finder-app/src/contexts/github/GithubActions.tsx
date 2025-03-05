import { NavigateFunction } from 'react-router'
import { RepositoryType, UsersType } from '../../types'
import axios from 'axios'

const github_url = import.meta.env.VITE_GITHUB_URL
const github_token = import.meta.env.VITE_GITHUB_TOKEN

const github = axios.create({
	baseURL: github_url,
	headers: {
		Authorization: `token ${github_token}`,
	},
})

// Get search results
export const searchUsers = async (text: string) => {
	const params = new URLSearchParams({
		q: text,
	})

	const response = await github.get(`/search/users?${params}`)
	const users: UsersType[] = response.data.items
	return users
}

// Get user and repos
export const getUserAndRepos = async (
	login: string,
	navigate: NavigateFunction
) => {
	const params = new URLSearchParams({
		sort: 'created_at',
		per_page: '10',
	})

	const [userResponse, reposResponse] = await Promise.all([
		github.get(`/users/${login}`),
		github.get(`/users/${login}/repos?${params}`),
	])

	if (userResponse.status === 404) navigate('/notfound')

	const user: UsersType = userResponse.data
	const repos: RepositoryType[] = reposResponse.data

	return { user, repos }
}
