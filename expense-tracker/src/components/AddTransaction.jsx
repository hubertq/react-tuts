import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { VscClose, VscAdd } from 'react-icons/vsc'
import { useTransactionContext } from '../hooks/useTransactionContext'

const AddTransaction = ({ open, setOpen }) => {
	const { dispatch } = useTransactionContext()

	const [formData, setFormData] = useState({
		description: '',
		amount: '',
		type: 'income',
	})

	const { description, amount, type } = formData

	const handleChange = e => {
		const { value, name } = e.target

		setFormData(prevFormData => {
			return {
				...prevFormData,
				[name]: value,
			}
		})
	}

	const handleSubmit = e => {
		e.preventDefault()

		const transaction = {
			id: uuidv4(),
			description: formData.description,
			type: formData.type,
			amount: Number(formData.amount),
		}

		dispatch({ type: 'ADD_TRANSACTION', payload: transaction })

		setOpen(false)
		setFormData({
			description: '',
			amount: '',
			type: 'income',
		})
	}

	return (
		<div className={`add-transaction-wrapper ${open && 'open'}`}>
			<div className='header'>
				<VscClose className='close-btn' onClick={() => setOpen(false)} />
				<h2>Add Transaction</h2>
			</div>

			<div className='body'>
				<form onSubmit={handleSubmit}>
					<div className='input-group'>
						<label htmlFor='description'>Description</label>
						<input
							type='text'
							id='description'
							name='description'
							onChange={handleChange}
							value={description}
							required
						/>
					</div>

					<div className='input-group'>
						<label htmlFor='amount'>Amount</label>
						<input
							type='number'
							id='amount'
							name='amount'
							onChange={handleChange}
							value={amount}
							required
						/>
					</div>

					<div className='input-group'>
						<label htmlFor='type'>Type</label>
						<select
							name='type'
							id='type'
							onChange={handleChange}
							value={type}
							required
						>
							<option value='income'>Income</option>
							<option value='expense'>Expense</option>
						</select>
					</div>

					<button type='submit'>
						Add <VscAdd />
					</button>
				</form>
			</div>
		</div>
	)
}
export default AddTransaction
