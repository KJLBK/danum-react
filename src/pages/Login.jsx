import { useState } from 'react'
import { useAuth } from '../store/useAuth.jsx'
import axios from 'axios'

export default function Login() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const setToken = useAuth((state) => state.setToken)

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const response = await axios.post('/member/login', {
				username,
				password,
			})
			const { jwt } = response.data
			if (jwt) {
				setToken(jwt)
			}
		} catch (error) {
			console.error(error)
		}
	}

	const handleUsernameChange = (e) => {
		setUsername(e.target.value)
	}

	const handlePasswordChange = (e) => {
		setPassword(e.target.value)
	}

	return (
		<>
			<div className="flex justify-center items-center h-screen">
				<div className="bg-gray-100 p-8 rounded-lg shadow-md">
					<h2 className="text-2xl font-semibold mb-4">임시로그인</h2>
					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label htmlFor="email" className="block mb-2">
								이메일
							</label>
							<input
								type="email"
								value={username}
								id="email"
								className="form-input border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
								placeholder="이메일을 입력하세요"
								onChange={handleUsernameChange}
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="password" className="block mb-2">
								비밀번호
							</label>
							<input
								type="password"
								value={password}
								id="password"
								className="form-input border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
								placeholder="비밀번호를 입력하세요"
								onChange={handlePasswordChange}
							/>
						</div>
						<button
							type="submit"
							className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
						>
							로그인
						</button>
					</form>
				</div>
			</div>
		</>
	)
}
