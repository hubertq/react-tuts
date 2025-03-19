import { ChangeEvent, MouseEvent } from 'react'

export const isButtonInput = (
	e:
		| MouseEvent<HTMLButtonElement>
		| ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
): e is MouseEvent<HTMLButtonElement> => {
	return e.currentTarget.type === 'button'
}

export const isFileInput = (
	e:
		| MouseEvent<HTMLButtonElement>
		| ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
): e is ChangeEvent<HTMLInputElement> => {
	return e.currentTarget.type === 'file'
}

export const isTextInput = (
	e:
		| MouseEvent<HTMLButtonElement>
		| ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
): e is ChangeEvent<HTMLInputElement | HTMLTextAreaElement> => {
	return (
		e.currentTarget.type === 'text' ||
		e.currentTarget.type === 'textarea'
	)
}

export const isNumberInput = (
	e:
		| MouseEvent<HTMLButtonElement>
		| ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
): e is ChangeEvent<HTMLInputElement> => {
	return e.currentTarget.type === 'number'
}
