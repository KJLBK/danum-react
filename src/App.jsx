import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Join from './pages/Join.jsx'
import Login from './pages/Login.jsx'
import Test from './pages/Test.jsx'
import BoardList from './pages/BoardList.jsx'
import BoardDetail from './pages/BoardDetail.jsx'
import Write from './pages/Write.jsx'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="join" element={<Join />} />
				<Route path="login" element={<Login />} />
				<Route path="fe-test" element={<Test />} />
				{/* 게시판 */}
				<Route path="board" element={<BoardList />} />
				<Route path="board/:id" element={<BoardDetail />} />
				<Route path="write" element={<Write />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
