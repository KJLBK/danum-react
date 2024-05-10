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
			<div className="flex justify-center items-center">
				<div>
					<h1 className="text-3xl font-bold underline">
						danum-frontend dev page
					</h1>
					<p>
						API 테스트 / Backend Data :
						{hello ? '연결성공' : '연결실패'} <br /> message: {data}
					</p>
					<br />
					<Link to="/login" className="font-bold underline">
						로그인 페이지
					</Link>
					: 구현중(05/11~진행중)
				</div>
			</div>
		</>
	)
}
