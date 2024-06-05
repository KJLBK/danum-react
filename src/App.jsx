import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.page.jsx'
import Join from './pages/Join.page.jsx'
import Login from './pages/Login.page.jsx'
import Test from './pages/Test.page.jsx'
import BoardDetail from './pages/BoardDetail.page.jsx'
import Write from './pages/Write.page.jsx'
import VillageList from './pages/board/VillageList.page.jsx'
import QuestionList from './pages/board/QuestionList.page.jsx'

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="join" element={<Join />} />
			<Route path="login" element={<Login />} />
			<Route path="fe-test" element={<Test />} />
			{/* 게시판 */}
			<Route path="dev-question" element={<QuestionList />} />
			<Route path="dev-village" element={<VillageList />} />
			<Route path="dev-board/:id" element={<BoardDetail />} />
			<Route path="write" element={<Write />} />
		</Routes>
	)
}

export default App
