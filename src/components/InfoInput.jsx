import { useRef, useState } from 'react'
// import axios from 'axios'

const InfoInput = () => {
	const nameRef = useRef('')
	const emailRef = useRef('')
	const passwordRef = useRef('')
	const passwordCheckRef = useRef('')
	const phoneNumberRef = useRef('')

	const [error, setError] = useState('')

	const handleSignUp = async () => {
		const input = {
			name: nameRef.current.value,
			email: emailRef.current.value,
			password: passwordRef.current.value,
			passwordCheck: passwordCheckRef.current.value,
			phoneNumber: phoneNumberRef.current.value,
		}

		const emptyInputKeys = Object.keys(input).filter(
			(key) => input[key].trim() === '',
		)

		if (emptyInputKeys.length > 0) {
			setError('빈칸을 모두 채워주세요.')
			const firstEmptyInputRef = getFirstEmptyInputRef(emptyInputKeys)
			if (firstEmptyInputRef) {
				firstEmptyInputRef.current.focus()
			}
			return
		}

		if (input.password !== input.passwordCheck) {
			setError('비밀번호와 비밀번호 확인이 일치하지 않습니다.')
			return
		}
		/*
		try {
			const response = await axios.post(
				'http://localhost:8080/member/join',
				input,
			)
			console.log(response.data)
			// 회원가입 성공 처리
		} catch (error) {
			console.error('Error signing up:', error)
		}
		*/
	}

	// 빈칸이 있는 첫 번째 입력란의 Ref를 반환하는 함수
	const getFirstEmptyInputRef = (emptyInputKeys) => {
		if (emptyInputKeys.includes('name')) {
			return nameRef
		}
		if (emptyInputKeys.includes('email')) {
			return emailRef
		}
		if (emptyInputKeys.includes('password')) {
			return passwordRef
		}
		if (emptyInputKeys.includes('passwordCheck')) {
			return passwordCheckRef
		}
		if (emptyInputKeys.includes('phoneNumber')) {
			return phoneNumberRef
		}
		return null
	}

	return (
		<div>
			<div className="flex items-center mb-10">
				<label className="w-32 mr-4">이름</label>
				<input
					ref={nameRef}
					className="border-b border-black focus:outline-none focus:border-black flex-grow"
				/>
			</div>
			<div className="flex items-center mb-10">
				<label className="w-32 mr-4">이메일</label>
				<input
					ref={emailRef}
					type="email"
					className="border-b border-black focus:outline-none focus:border-black flex-grow"
				/>
			</div>
			<div className="flex items-center mb-10">
				<label className="w-32 mr-4">비밀번호</label>
				<input
					ref={passwordRef}
					type="password"
					className="border-b border-black focus:outline-none focus:border-black flex-grow"
				/>
			</div>
			<div className="flex items-center mb-10">
				<label className="w-32 mr-4">비밀번호 확인</label>
				<input
					ref={passwordCheckRef}
					type="password"
					className="border-b border-black focus:outline-none focus:border-black flex-grow"
				/>
			</div>
			<div className="flex items-center mb-10">
				<label className="w-32 mr-4">전화번호</label>
				<input
					ref={phoneNumberRef}
					className="border-b border-black focus:outline-none focus:border-black flex-grow"
				/>
			</div>
			{error && <p className="text-red-500 mt-2">{error}</p>}
			<div>
				<button
					className="bg-gray-700 hover:bg-gray-400 text-white py-3 px-44 rounded-lg inline-flex items-center"
					onClick={handleSignUp}
				>
					회원가입
				</button>
			</div>
		</div>
	)
}

export default InfoInput
