import { createContext, ReactNode, useReducer } from 'react'
import { AlertContextType } from '../../types'
import alertReducer, {
	AlertActionTypes,
	AlertState,
} from './AlertReducer'

const AlertContext = createContext<AlertContextType>(
	{} as AlertContextType
)

type Props = {
	children: ReactNode
}

export const AlertProvider = ({ children }: Props) => {
	const initialState: AlertState = {
		isVisible: false,
		message: '',
		type: '',
	}

	const [state, dispatch] = useReducer(alertReducer, initialState)

	// Set an alert
	const setAlert = (message: string, type: string) => {
		dispatch({
			type: AlertActionTypes.SET_ALERT,
			payload: { isVisible: true, message, type },
		})

		setTimeout(
			() =>
				dispatch({
					type: AlertActionTypes.REMOVE_ALERT,
				}),
			3000
		)
	}

	return (
		<AlertContext
			value={{
				isVisible: state.isVisible,
				message: state.message,
				type: state.type,
				setAlert,
			}}
		>
			{children}
		</AlertContext>
	)
}

export default AlertContext
