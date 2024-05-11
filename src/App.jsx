import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUp from './pages/SignUp.jsx'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="login" element={<LoginPage />} />
				<Route path="signup" element={<SignUp />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
