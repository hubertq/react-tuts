import { RepositoryType } from '../../types'
import RepoItem from './RepoItem'

type Props = {
	repos: RepositoryType[]
}
const RepoList = ({ repos }: Props) => {
	return (
		<div className='rounded-lg shadow-lg card bg-base-100'>
			<div className='card-body'>
				<h2 className='text-3xl my-4 font-bold card-title'>
					Latest Repositories
				</h2>
				{repos.map(repo => (
					<RepoItem key={repo.id} repo={repo} />
				))}
			</div>
		</div>
	)
}
export default RepoList
