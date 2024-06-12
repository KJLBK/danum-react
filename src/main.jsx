import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-tailwind/react'

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<StrictMode>
			<ThemeProvider>
				<App />
			</ThemeProvider>
		</StrictMode>
	</BrowserRouter>,
)
