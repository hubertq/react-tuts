import {
	FaEye,
	FaInfo,
	FaLink,
	FaStar,
	FaUtensils,
} from 'react-icons/fa'
import { RepositoryType } from '../../types'

type Props = {
	repo: RepositoryType
}
const RepoItem = ({ repo }: Props) => {
	return (
		<div className='mb-2 rounded-md card bg-gray-800 hover:bg-gray-900'>
			<div className='card-body'>
				<h3 className='mb-2 text-xl font-semibold'>
					<a href={repo.html_url}>
						<FaLink className='inline mr-1' /> {repo.name}
					</a>
				</h3>
				<p className='mb-3'>{repo.description}</p>
				<div>
					<div className='mr-2 badge badge-soft badge-info badge-lg'>
						<FaEye /> {repo.watchers_count}
					</div>
					<div className='mr-2 badge badge-soft badge-success badge-lg'>
						<FaStar /> {repo.stargazers_count}
					</div>
					<div className='mr-2 badge badge-soft badge-error badge-lg'>
						<FaInfo /> {repo.open_issues_count}
					</div>
					<div className='mr-2 badge badge-soft badge-warning badge-lg'>
						<FaUtensils /> {repo.forks_count}
					</div>
				</div>
			</div>
		</div>
	)
}
export default RepoItem
