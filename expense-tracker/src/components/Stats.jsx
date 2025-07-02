import { useTransactionContext } from '../hooks/useTransactionContext'

const Stats = () => {
	const { totalIncome, totalExpense, totalBalance } =
		useTransactionContext()
	return (
		<div className='stats-wrapper'>
			<div className='stat-section'>
				<h3>Income</h3>
				<span className='income'>
					GH&#8373; {Number(totalIncome).toLocaleString('en')}
				</span>
			</div>

			<div className='stat-section'>
				<h3>Expense</h3>
				<span className='expense'>
					GH&#8373; {Number(totalExpense).toLocaleString('en')}
				</span>
			</div>

			<div className='stat-section'>
				<h3>Balance</h3>
				<span className='balance'>
					GH&#8373; {Number(totalBalance).toLocaleString('en')}
				</span>
			</div>
		</div>
	)
}
export default Stats
