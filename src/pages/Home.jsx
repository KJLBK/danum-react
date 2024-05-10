import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Home() {
	const [hello, setHello] = useState('')
	const [data, setData] = useState('')
	useEffect(() => {
		axios.get('/api/test').then((res) => {
			if (res.data === '테스트') {
				setHello(true)
				setData(res.data)
			}
		})
	}, []) // 빈 배열을 의존성 배열로 지정하여 useEffect가 컴포넌트가 마운트될 때 한 번만 실행되도록 설정

	return (
		<>
			<div className="flex justify-center items-center min-h-screen bg-gray-100">
				<div className="p-8 bg-white shadow-lg rounded-lg">
					<h1 className="text-4xl font-bold text-center text-gray-800">
						DANUM DEV Mode
					</h1>
					<p className="mt-4 text-gray-600">
						API 테스트 / Backend Data :
						<span className={hello ? 'text-green-500' : 'text-red-500'}>
							{hello ? '연결성공' : '연결실패'}
						</span>
						<br /> message: {data}
					</p>
					<br />
					<Link to="/login" className="text-blue-500 hover:text-blue-700 font-bold underline">
						로그인 페이지
					</Link>
					: 구현중(05/11~진행중)
					<br></br>
					<p className="mt-4 text-gray-600 italic">
						*ChatGPT가 만들어준 Tailwind 디자인으로 구현되었습니다. 이후 디자인이 Fix되면.. 제대로 할 예정.
					</p>
				</div>
				
			</div>
		</>
	)
}