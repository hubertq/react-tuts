import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GithubProvider } from './contexts/github/GithubContext.tsx'
import { AlertProvider } from './contexts/alert/AlertContext.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<GithubProvider>
			<AlertProvider>
				<App />
			</AlertProvider>
		</GithubProvider>
	</StrictMode>
)
