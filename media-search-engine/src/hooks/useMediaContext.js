import { useContext } from 'react'
import { MediaContext } from '../contexts/MediaContext'

export const useMediaContext = () => {
	const context = useContext(MediaContext)

	if (!context) {
		throw Error(
			'useMediaContext can only be used within the MediaContextProvider'
		)
	}

	return context
}
