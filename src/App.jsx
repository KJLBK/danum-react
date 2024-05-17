import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Join from './pages/Join.jsx'
import Login from './pages/Login.jsx'
import Test from './pages/Test.jsx'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="join" element={<Join />} />
				<Route path="login" element={<Login />} />
				<Route path="fe-test" element={<Test />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
