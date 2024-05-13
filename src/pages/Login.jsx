import { useState } from 'react'
import useAuth from '../store/useAuth.jsx'
import axios from 'axios'

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		//TO DO: 초기화
		e.preventDefault()
		setError('')
		try {
			//TO DO: Axios로 로그인 값 반환
			const response = await axios.post('/member/login', {
				email,
				password,
			})
			//TO DO: 로그인 된거 jwt 처리
			const jwt = response.data
			//TO DO: 토큰을 상태관리 라이브러리에 저장
			if (jwt) {
				// null 값이면 else로
				localStorage.setItem('auth-storage', jwt)
				navigate('/fe-test')
			} else {
				//TO DO: 예외처리 - 토큰 없을 때
				throw new Error('JWT를 받지 못했습니다.')
			}
			//TO DO: 과정중 실패시
		} catch (error) {
			console.error(error)
			setError(
				'로그인 실패: ' +
					(error.message || '알 수 없는 오류가 발생했습니다.'),
			)
		}
	}

	const handleemailChange = (e) => {
		setEmail(e.target.value)
	}

	const handlePasswordChange = (e) => {
		setPassword(e.target.value)
	}

	return (
		<>
			<div className="flex justify-center items-center min-h-screen bg-gray-50">
				<div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
					<h2 className="text-3xl font-bold text-center text-gray-900">
						임시로그인
					</h2>
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label
								htmlFor="email"
								className="text-sm font-medium text-gray-700"
							>
								이메일
							</label>
							<input
								type="email"
								value={email}
								id="email"
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								placeholder="이메일을 입력하세요"
								onChange={handleemailChange}
							/>
						</div>
						<div>
							<label
								htmlFor="password"
								className="text-sm font-medium text-gray-700"
							>
								비밀번호
							</label>
							<input
								type="password"
								value={password}
								id="password"
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								placeholder="비밀번호를 입력하세요"
								onChange={handlePasswordChange}
							/>
						</div>
						{error && (
							<div className="text-red-500 text-sm">{error}</div>
						)}
						<button
							type="submit"
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							로그인
						</button>
					</form>
				</div>
			</div>
		</>
	)
}
