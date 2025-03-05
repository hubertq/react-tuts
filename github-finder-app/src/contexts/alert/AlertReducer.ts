// Define action types as an enum to ensure consistency and prevent typos
export enum AlertActionTypes {
	SET_ALERT = 'SET_ALERT',
	REMOVE_ALERT = 'REMOVE_ALERT',
}

// Define type for each action type to enforce type safety
export type SetAlertAction = {
	type: AlertActionTypes.SET_ALERT
	payload: { isVisible: boolean; message: string; type: string }
}

export type RemoveAlertAction = {
	type: AlertActionTypes.REMOVE_ALERT
}

// Define a union type Actions to represent all possible action types
export type AlertActions = SetAlertAction | RemoveAlertAction

// Type for state
export type AlertState = {
	isVisible: boolean
	message: string
	type: string
}

const alertReducer = (state: AlertState, action: AlertActions) => {
	switch (action.type) {
		case AlertActionTypes.SET_ALERT:
			return {
				...state,
				isVisible: action.payload.isVisible,
				message: action.payload.message,
				type: action.payload.type,
			}
		case AlertActionTypes.REMOVE_ALERT:
			return {
				...state,
				isVisible: false,
				message: '',
				type: '',
			}
		default:
			return state
	}
}

export default alertReducer
