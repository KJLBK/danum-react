import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="signup" element={<SignUp />} />
				<Route path="login" element={<Login />} />
     </Routes> 
	  </BrowserRouter>
	)
}

export default App
