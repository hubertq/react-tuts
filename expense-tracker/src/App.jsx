import { useState } from 'react'
import { History, Stats, AddTransaction } from './components'

const App = () => {
	const [open, setOpen] = useState(false)
	return (
		<div className={`app ${open && 'open'}`}>
			<AddTransaction open={open} setOpen={setOpen} />
			<div className='header'>
				<h1>Expense Tracker</h1>
				<button
					className='add-transaction-btn'
					onClick={() => setOpen(true)}
				>
					Add Transaction
				</button>
			</div>
			<div className='main-wrapper'>
				<Stats />
				<History />
			</div>
		</div>
	)
}
export default App
