import { Link } from 'react-router-dom'
import { Card, Typography } from '@material-tailwind/react'

export default function Home() {
	return (
		<div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
			<Card className="p-8 shadow-lg rounded-lg w-1/2 mb-8">
				<Typography variant="h5" className="text-center text-gray-800">
					danum-dev- page
				</Typography>
				<nav className="mt-4 space-x-4 text-center">
					<Link
						to="/login"
						className="text-blue-500 hover:text-blue-700"
					>
						로그인 페이지
					</Link>
					<Link
						to="/join"
						className="text-blue-500 hover:text-blue-700"
					>
						회원가입 페이지
					</Link>
					<br />
					<Link
						to="/question-write"
						className="text-blue-500 hover:text-blue-700"
					>
						Question 글쓰기 페이지
					</Link>
					<Link
						to="/village-write"
						className="text-blue-500 hover:text-blue-700"
					>
						Village 글쓰기 페이지
					</Link>
					<br />
					<Link
						to="/dev-question"
						className="text-blue-500 hover:text-blue-700"
					>
						Question 게시판 페이지
					</Link>
					<Link
						to="/dev-village"
						className="text-blue-500 hover:text-blue-700"
					>
						Village 게시판 페이지
					</Link>
					<br />
					<Link
						to="/mypage"
						className="text-blue-500 hover:text-blue-700"
					>
						마이페이지
					</Link>
					<Link
						to="/chat"
						className="text-blue-500 hover:text-blue-700"
					>
						채팅(chat)
					</Link>
					<Link
						to="/chat/roomlist"
						className="text-blue-500 hover:text-blue-700"
					>
						채팅(/chat/roomlist)
					</Link>
				</nav>
			</Card>
		</div>
	)
}
