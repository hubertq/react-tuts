import { createContext, ReactNode, useState } from 'react'
import { GithubContextType, UsersType } from '../../types'

type Props = {
	children: ReactNode
}

const github_url = import.meta.env.VITE_GITHUB_URL
const github_token = import.meta.env.VITE_GITHUB_TOKEN

const GithubContext = createContext<GithubContextType>(
	{} as GithubContextType
)

export const GithubProvider = ({ children }: Props) => {
	const [users, setUsers] = useState<UsersType[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const fetchUsers = async () => {
		const response = await fetch(`${github_url}/users`, {
			headers: {
				Authorization: `token ${github_token}`,
			},
		})
		const data = await response.json()

		setUsers(data)
		setIsLoading(false)
	}

	return (
		<GithubContext value={{ users, fetchUsers, isLoading }}>
			{children}
		</GithubContext>
	)
}

export default GithubContext
