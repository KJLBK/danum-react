import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.page.jsx'
import Join from './pages/Join.page.jsx'
import Login from './pages/Login.page.jsx'
import Test from './pages/Test.page.jsx'
import VillageList from './pages/board/VillageList.page.jsx'
import QuestionList from './pages/board/QuestionList.page.jsx'
import QuestionWrite from './pages/board/QuestionWrite.page.jsx'
import VillageWrite from './pages/board/VillageWrite.page.jsx'
import QuestionDetail from './pages/board/QuestionDetail.page.jsx'
import VillageDetail from './pages/board/VillageDetail.page.jsx'
import BoardList from './pages/BoardList.page.jsx'
import BoardDetail from './pages/BoardDetail.page.jsx'
import Write from './pages/Write.page.jsx'
import MyPage from './pages/Mypage.page.jsx'
import Chat from './pages/Chat.page.jsx'
import ChatRoomList from './pages/ChatRoomList.page.jsx'
import ChatRoom from './pages/ChatRoom.page.jsx'

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
			<Route path="question-write" element={<QuestionWrite />} />
			<Route path="village-write" element={<VillageWrite />} />
			<Route path="dev-question/:id" element={<QuestionDetail />} />
			<Route path="dev-village/:id" element={<VillageDetail />} />
			<Route path="dev-board" element={<BoardList />} />
			<Route path="dev-board/:id" element={<BoardDetail />} />
			<Route path="write" element={<Write />} />
			{/* 마이페이지 */}
			<Route path="mypage" element={<MyPage />} />
			{/* 채팅페이지(TEST) */}
			<Route path="chat" element={<Chat />} />
			<Route path="/chat/roomlist" element={<ChatRoomList />} />
			<Route path="/chat/:roomId" element={<ChatRoom />} />
		</Routes>
	)
}

export default App
