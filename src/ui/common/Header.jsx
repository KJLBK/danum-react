import { Link } from 'react-router-dom'

export default function Header() {
	return (
		<header className="bg-gray-800 text-white p-4 shadow-md">
			<div className="container mx-auto flex justify-between items-center">
				<h1 className="text-2xl font-bold">
					<Link to="/" className="text-white hover:text-gray-400">
						DANUM
					</Link>
				</h1>
				<nav className="space-x-4">
					<Link to="/question-write" className="hover:text-gray-400">
						Question 글쓰기 페이지
					</Link>
					<Link to="/village-write" className="hover:text-gray-400">
						Village 글쓰기 페이지
					</Link>
					<Link to="/dev-question" className="hover:text-gray-400">
						Question
					</Link>
					<Link to="/dev-village" className="hover:text-gray-400">
						Village
					</Link>
					{/* 로그인 하면 마이페이지가 보일수있게 */}
					{/* <Link to="/mypage" className="hover:text-gray-400">
						마이페이지
					</Link> */}

					<Link to="/chat/roomlist" className="hover:text-gray-400">
						Chat
					</Link>
					{/* 로그인은 버튼이었으면 로그인 상태시 로그아웃 버튼이 나오게 했으면 좋겠음. */}
					<Link to="/login" className="hover:text-gray-400">
						로그인
					</Link>
				</nav>
			</div>
		</header>
	)
}
