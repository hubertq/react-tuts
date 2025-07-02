import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { MediaContextProvider } from './contexts/MediaContext'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<MediaContextProvider>
				<App />
			</MediaContextProvider>
		</BrowserRouter>
	</React.StrictMode>
)
