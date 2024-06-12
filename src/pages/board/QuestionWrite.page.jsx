// {POST [/board/new]}
// Methods: [POST]
// Request Parameters: RequestBody: QuestionNewDto

// email
// title
// content
// category : VILLAGE, QUESTION

// token : eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhQGEiLCJyb2xlIjpbeyJhdXRob3JpdHkiOiJVU0VSIn1dLCJleHAiOjIwMTYyNjIzNjJ9.eE_k0RPskhCzhQSkFywNOJjfvKmD0KZjcOkuxVDBnVo

import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

export default function QuestionWrite() {
	const adminToken =
		'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhQGEiLCJyb2xlIjpbeyJhdXRob3JpdHkiOiJBRE1JTiJ9XSwiZXhwIjoyMDE2MjYyMzYyfQ.sUoNzSqQtO7A6eAOkUbCb4_lPL96i8xkIHyvI3X6TfU'

	const navigate = useNavigate()
	const [aiResponse, setAiResponse] = useState(null) // AI 응답 상태 추가

	const [formData, setFormData] = useState({
		email: '',
		title: '',
		content: '',
		createId: '',
	})

	useEffect(() => {
		// 추가된 부분: useEffect 훅 사용
		const token = localStorage.getItem('accessToken') // 로컬 스토리지에서 토큰 가져오기
		if (token) {
			const decoded = jwtDecode(token) // 토큰 디코드
			if (decoded && decoded.sub) {
				// 디코드된 토큰에서 이메일(sub) 추출
				setFormData((prevState) => ({
					...prevState,
					email: decoded.sub, // 이메일을 formData의 email 필드에 설정
				}))
			}
		}
	}, [])

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const Token =
				// 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhQGEiLCJyb2xlIjpbeyJhdXRob3JpdHkiOiJVU0VSIn1dLCJleHAiOjIwMTYyNjIzNjJ9.eE_k0RPskhCzhQSkFywNOJjfvKmD0KZjcOkuxVDBnVo'
				'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhQGEiLCJyb2xlIjpbeyJhdXRob3JpdHkiOiJVU0VSIn1dLCJleHAiOjIwMTYyNjIzNjJ9.azK0eQzXB-JhkBDdqCtf5xQQQOHUfWJ64cx-PA33Mig'
			// localStorage.getItem('accessToken')
			await axios.post('/api/board/question/new', formData, {
				headers: {
					Authorization: `Bearer ${Token}`,
				},
			})
			alert('글이 성공적으로 등록되었습니다.')
			await axios.patch(
				`/api/open-ai/${formData.createId}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${adminToken}`,
					},
				},
			)
			navigate('/')
		} catch (error) {
			console.error('글 등록 실패', error)
			alert('글 등록에 실패했습니다.')
		}
	}

	const handleAi = async () => {
		try {
			const response = await axios.post(
				'/api/open-ai',
				{ message: formData.content },
				{
					headers: {
						Authorization: `Bearer ${adminToken}`,
					},
				},
			)
			setAiResponse(response.data)
			setFormData((prevState) => ({
				...prevState,
				createId: response.data.createdId, // createdId를 formData에 설정
			}))
			setAiResponse(response.data)
		} catch (error) {
			console.error('질문 실패', error)
			alert('질문에 실패했습니다.')
		}
	}

	return (
		<div className="max-w-4xl mx-auto p-5">
			<h2 className="text-2xl font-bold mb-6">
				<Link to="/">Question 글쓰기</Link>
			</h2>
			<form className="space-y-4" onSubmit={handleSubmit}>
				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-700"
					>
						email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						required
						disabled
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
				</div>
				<div>
					<label
						htmlFor="title"
						className="block text-sm font-medium text-gray-700"
					>
						title
					</label>
					<input
						type="text"
						id="title"
						name="title"
						value={formData.title}
						onChange={handleChange}
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
				</div>
				<div>
					<label
						htmlFor="content"
						className="block text-sm font-medium text-gray-700"
					>
						content
					</label>
					<textarea
						id="content"
						name="content"
						value={formData.content}
						onChange={handleChange}
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
				</div>
				<button
					type="submit"
					className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					글 올리기
				</button>
			</form>
			<button
				onClick={handleAi}
				className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			>
				AI에게 질문하기
			</button>
			{aiResponse && ( // AI 응답이 있을 경우에만 상자 표시
				<div className="mt-6 p-4 border border-gray-300 rounded-md shadow-sm bg-gray-50">
					<h3 className="text-lg font-bold mb-2">AI의 답변:</h3>
					<p>{aiResponse.message}</p>
				</div>
			)}
		</div>
	)
}
