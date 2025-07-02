import { HistoryItem } from './'
import { useTransactionContext } from '../hooks/useTransactionContext'

const History = () => {
	const { transactions } = useTransactionContext()

	return (
		<div className='history-wrapper'>
			<h2>History</h2>

			{transactions.length > 0 ? (
				<div className='history-inner'>
					{transactions.map(transaction => (
						<HistoryItem key={transaction.id} transaction={transaction} />
					))}
				</div>
			) : (
				'You have not made any transactions.'
			)}
		</div>
	)
}
export default History
