import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import LogoutButton from '../components/Button/LogoutButton.jsx'

export default function Home() {
	// hello : backend api 상태에 대한 state
	// data : backend api 메세지에 대한 state
	// token : token에 대한 state(문자열)
	// navigate : 로그아웃 후 페이지 이동
	const [hello, setHello] = useState('')
	const [data, setData] = useState('')

	// Backend Test Code
	useEffect(() => {
		axios.get('/test').then((res) => {
			setHello(true)
			setData(res.data)
			console.log(res)
		})
	}, [])

	return (
		<>
			<div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
				<div className="p-8 bg-white shadow-lg rounded-lg w-1/2 mb-8">
					<h1 className="text-4xl font-bold text-center text-gray-800">
						DANUM DEV Mode
					</h1>
					<p className="mt-4 text-gray-600">
						API 테스트 / Backend Data :{' '}
						<span
							className={
								hello ? 'text-green-500' : 'text-red-500'
							}
						>
							{hello ? '연결성공' : '연결실패'}
						</span>
						<br /> message : {data}
					</p>
					<p className="mt-4 text-gray-600 italic">
						*ChatGPT가 만들어준 Tailwind 디자인으로 구현되었습니다.
						이후 디자인이 Fix되면.. 제대로 할 예정.
					</p>
				</div>

				{/* 로그인 액세스 토큰 / 로그아웃 */}
				<div className="mb-4"></div>
				<div className="flex flex-col bg-white shadow-lg rounded-lg w-1/2 mb-8 p-5">
					<div className="overflow-auto">
						<h2 className="text-m font-bold  text-gray-800 mr-5">
							Local Storage(authStorage)
						</h2>
						<p className="text-xs text-gray-800 bg-gray-200 rounded px-3 py-1.5 shadow-sm overflow-wrap break-words">
							{localStorage.getItem('accessToken')}
						</p>
					</div>

					<div className="mx-auto mt-4">
						<LogoutButton />
					</div>
				</div>

				{/* 로그인페이지 */}
				<div className="p-8 bg-white shadow-lg rounded-lg w-1/2 mb-8">
					<div>
						<Link
							to="/login"
							className="text-blue-500 hover:text-blue-700 font-bold underline"
						>
							로그인 페이지
						</Link>
					</div>
					<div>
						<Link
							to="/join"
							className="text-blue-500 hover:text-blue-700 font-bold underline"
						>
							회원가입 페이지
						</Link>
					</div>
					<div>
						<Link
							to="/write"
							className="text-blue-500 hover:text-blue-700 font-bold underline"
						>
							글쓰기 페이지
						</Link>
					</div>
					<div>
						<Link
							to="/dev-board"
							className="text-blue-500 hover:text-blue-700 font-bold underline"
						>
							게시판 페이지
						</Link>
					</div>
					<div>
						<Link
							to="/mypage"
							className="text-blue-500 hover:text-blue-700 font-bold underline"
						>
							마이페이지
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}
