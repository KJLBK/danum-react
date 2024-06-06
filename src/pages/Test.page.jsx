import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Test() {
	const [responseData, setResponseData] = useState(null)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const token = localStorage.getItem('accessToken')
				// const url = '/sungjun/test'
				const url1 = '/test'
				const url2 = '/seungmin/test'
				// const response = await axios(url, {method: 'GET',})
				const response1 = await axios(url1, { method: 'GET' })
				const response2 = await axios(url2, { method: 'GET' })
				// console.log(response)
				console.log(response1)
				console.log(response2)
				// const responseData = await response2.json() // 응답을 JSON 형식으로 파싱
				// setResponseData(responseData) // 상태에 응답 데이터 저장
			} catch (error) {
				console.log('hi')
				setError(error) // 오류 발생 시 상태에 오류 저장
			}
		}
		fetchData() // 컴포넌트가 마운트되면 요청을 보냅니다.
	}, [])

	if (error) {
		return <div>요청 실패: {error.message}</div>
	}

	if (!responseData) {
		return <div>로딩 중...</div>
	}

	return (
		<>
			<div>응답 데이터: {JSON.stringify(responseData)}</div>
		</>
	)
}
