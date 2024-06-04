import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.page.jsx'
import Join from './pages/Join.page.jsx'
import Login from './pages/Login.page.jsx'
import Test from './pages/Test.page.jsx'
import BoardList from './pages/BoardList.page.jsx'
import BoardDetail from './pages/BoardDetail.page.jsx'
import Write from './pages/Write.page.jsx'
import MyPage from './pages/Mypage.page.jsx'
import Chat from './pages/Chat.page.jsx'

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="join" element={<Join />} />
			<Route path="login" element={<Login />} />
			<Route path="fe-test" element={<Test />} />
			{/* 게시판 */}
			<Route path="dev-board" element={<BoardList />} />
			<Route path="dev-board/:id" element={<BoardDetail />} />
			<Route path="write" element={<Write />} />
			{/* 마이페이지 */}
			<Route path="mypage" element={<MyPage />} />
			{/* 채팅페이지(TEST) */}
			<Route path="chat" element={<Chat />} />
		</Routes>
	)
}

export default App
