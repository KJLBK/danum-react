import JoinInput from '../components/JoinComponents/JoinInput.jsx'
import JoinButton from '../components/JoinComponents/JoinButton.jsx'
import { useState, useRef, useEffect } from 'react'
import axios from 'axios'

const Join = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordCheck, setPasswordCheck] = useState('')
	const [phone, setPhone] = useState('')
	const EmptyRef = useRef([])
	const [isEmpty, setIsEmpty] = useState(false)
	const [passwordMismatch, setPasswordMismatch] = useState(false)
	const [error, setError] = useState('')

	const handleSignUp = async () => {
		let hasEmptyFields = false

		// input 값들을 돌면서 빈칸 체크
		for (let i = 0; i < EmptyRef.current.length; i++) {
			// 빈칸이면 포커스 주고 emptyField를 true로 바꿔서 문구를 띄움
			if (EmptyRef.current[i].value === '') {
				hasEmptyFields = true
				EmptyRef.current[i].focus()
				break
			}
		}

		setIsEmpty(hasEmptyFields)
		// password와 passwordCheck의 값이 같은지 체크
		if (password !== passwordCheck) {
			setPasswordMismatch(true)
			return
		} else {
			setPasswordMismatch(false)
		}

		if (hasEmptyFields || passwordMismatch) {
			return
		}

		try {
			//TO DO: Axios로 로그인 값 반환
			const response = await axios.post('/member/join', {
				name,
				email,
				password,
				phone,
			})
			/* eslint-disable no-console */
			console.log(response)
		} catch (error) {
			console.error(error)
			setError(
				'회원가입 실패: ' +
					(error.message || '알 수 없는 오류가 발생했습니다.'),
			)
		}
	}
	// input에 있는 값이 바뀔 때마다 setIsEmpty 값 변경 (원래 빈칸)
	useEffect(() => {
		setIsEmpty(false)
	}, [name, email, password, passwordCheck, phone])

	return (
		<>
			<div className="flex justify-center items-center h-screen">
				<div className="p-12 border border-gray-300 rounded-lg shadow-lg">
					<h1 className="mb-10 text-2xl font-bold">회원가입</h1>
					<JoinInput
						text={'이름'}
						value={name}
						onChange={setName}
						EmptyRef={(el) => (EmptyRef.current[0] = el)}
					/>
					<JoinInput
						text={'이메일'}
						value={email}
						onChange={setEmail}
						EmptyRef={(el) => (EmptyRef.current[1] = el)}
					/>
					<JoinInput
						text={'비밀번호'}
						value={password}
						onChange={setPassword}
						EmptyRef={(el) => (EmptyRef.current[2] = el)}
					/>
					<JoinInput
						text={'비밀번호 확인'}
						value={passwordCheck}
						onChange={setPasswordCheck}
						EmptyRef={(el) => (EmptyRef.current[3] = el)}
					/>
					<JoinInput
						text={'전화번호'}
						value={phone}
						onChange={setPhone}
						EmptyRef={(el) => (EmptyRef.current[4] = el)}
					/>
					{/* 빈칸이거나 비밀번호가 다를 때 문구 띄우는 부분 */}
					<p
						className="text-red-500 text-sm"
						style={{
							visibility:
								isEmpty || passwordMismatch
									? 'visible'
									: 'hidden',
						}}
					>
						{isEmpty
							? '빈칸을 채워주세요'
							: '비밀번호를 확인해주세요'}
					</p>
					<JoinButton text={'회원가입'} handleSignUp={handleSignUp} />
					{error && (
						<div className="text-red-500 text-sm">{error}</div>
					)}
				</div>
			</div>
		</>
	)
}

export default Join
