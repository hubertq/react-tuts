import { createContext, useEffect, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'

export const TransactionContext = createContext()

export const reducer = (state, action) => {
	switch (action.type) {
		case 'CALC_BALANCE':
			let totalBalance = 0
			let totalIncome = 0
			let totalExpense = 0

			state.transactions.forEach(transaction => {
				if (transaction.type === 'income') {
					totalIncome = totalIncome + transaction.amount
				} else {
					totalExpense = totalExpense + transaction.amount
				}
			})

			totalBalance = totalIncome - totalExpense

			return { ...state, totalIncome, totalExpense, totalBalance }

		case 'ADD_TRANSACTION':
			return {
				...state,
				transactions: [...state.transactions, action.payload],
			}

		default:
			return state
	}
}

export const TransactionContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, {
		transactions: [],
		totalIncome: 0,
		totalExpense: 0,
		totalBalance: 0,
	})

	useEffect(() => {
		dispatch({ type: 'CALC_BALANCE' })
	}, [state.transactions])

	return (
		<TransactionContext.Provider value={{ ...state, dispatch }}>
			{children}
		</TransactionContext.Provider>
	)
}
