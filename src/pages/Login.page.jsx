import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchLogin } from '../api/auth/api'
import {
	Card,
	CardBody,
	Input,
	Button,
	Typography,
	Alert,
} from '@material-tailwind/react'

export default function Login() {
	const [err, setErr] = useState()
	const [auth, setAuth] = useState({
		email: '',
		password: '',
	})
	const navigator = useNavigate()

	const sendLoginRequest = async (event) => {
		event.preventDefault() // Submit - prevent page refresh
		const authStatus = await fetchLogin(auth)
		if (authStatus.code === 200) {
			navigator('/')
		} else if (authStatus.code === 400) {
			setErr(authStatus.message)
		}
	}

	const handleEmailChange = (e) => {
		setAuth((prevAuth) => ({
			...prevAuth,
			email: e.target.value,
		}))
	}

	const handlePasswordChange = (e) => {
		setAuth((prevAuth) => ({
			...prevAuth,
			password: e.target.value,
		}))
	}

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-50">
			<Card className="w-full max-w-md p-8 space-y-6">
				<CardBody>
					<Typography
						variant="h5"
						className="text-center text-gray-900"
					>
						<Link to="/">임시로그인</Link>
					</Typography>
					<form onSubmit={sendLoginRequest} className="space-y-6">
						<div>
							<label
								htmlFor="email"
								className="text-sm font-medium text-gray-700"
							>
								이메일
							</label>
							<Input
								type="email"
								value={auth.email}
								id="email"
								placeholder="이메일을 입력하세요"
								onChange={handleEmailChange}
								className="mt-1"
							/>
						</div>
						<div>
							<label
								htmlFor="password"
								className="text-sm font-medium text-gray-700"
							>
								비밀번호
							</label>
							<Input
								type="password"
								value={auth.password}
								id="password"
								placeholder="비밀번호를 입력하세요"
								onChange={handlePasswordChange}
								className="mt-1"
							/>
						</div>
						{err && (
							<Alert color="red" className="text-sm">
								{err}
							</Alert>
						)}
						<Button type="submit" fullWidth color="black">
							로그인
						</Button>
						<Button
							type="button"
							fullWidth
							variant="outlined"
							color="black"
							className="mt-2"
							onClick={() => navigator('/join')}
						>
							회원가입
						</Button>
					</form>
				</CardBody>
			</Card>
		</div>
	)
}
