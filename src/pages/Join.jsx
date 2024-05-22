import JoinInput from '../components/JoinComponents/JoinInput.jsx'
import JoinButton from '../components/JoinComponents/JoinButton.jsx'
import { useState, useRef } from 'react'
import axios from 'axios'

const Join = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordCheck, setPasswordCheck] = useState('')
	const [phone, setPhone] = useState('')

	const nameRef = useRef(null)
	const emailRef = useRef(null)
	const passwordRef = useRef(null)
	const passwordCheckRef = useRef(null)
	const phoneRef = useRef(null)

	const [error, setError] = useState('')
	const [validationMessage, setValidationMessage] = useState({
		name: ' ',
		email: ' ',
		password: ' ',
		passwordCheck: '',
		phone: ' ',
	})

	const handleSignUp = async () => {
		let validationErrors = {
			name: ' ',
			email: ' ',
			password: ' ',
			passwordCheck: '',
			phone: ' ',
		}

		if (name.length < 2) {
			validationErrors.name = '이름은 최소 2자 이상이어야 합니다.'
			setValidationMessage(validationErrors)
			nameRef.current.focus()
			return
		}
		if (email.length < 10) {
			validationErrors.email = '이메일은 최소 10자 이상이어야 합니다.'
			setValidationMessage(validationErrors)
			emailRef.current.focus()
			return
		}
		if (password.length < 8) {
			validationErrors.password = '비밀번호는 최소 8자 이상이어야 합니다.'
			setValidationMessage(validationErrors)
			passwordRef.current.focus()
			return
		}
		if (password !== passwordCheck) {
			validationErrors.passwordCheck = '비밀번호 일치하지 않습니다.'
			setValidationMessage(validationErrors)
			passwordCheckRef.current.focus()
			return
		}
		if (phone.length < 10) {
			validationErrors.phone = '전화번호는 최소 10자 이상이어야 합니다.'
			setValidationMessage(validationErrors)
			phoneRef.current.focus()
			return
		}

		try {
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

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="p-12 border border-gray-300 rounded-lg shadow-lg">
				<h1 className="mb-10 text-2xl font-bold">회원가입</h1>
				<div className="mb-4">
					<JoinInput
						type={'text'}
						text={'이름'}
						value={name}
						onChange={setName}
						EmptyRef={nameRef}
					/>
					<p
						className={`text-red-500 text-sm ${validationMessage.name ? 'block' : 'hidden'}`}
					>
						{validationMessage.name}
					</p>
				</div>
				<div className="mb-4">
					<JoinInput
						type={'email'}
						text={'이메일'}
						value={email}
						onChange={setEmail}
						EmptyRef={emailRef}
					/>
					<p
						className={`text-red-500 text-sm ${validationMessage.email ? 'block' : 'hidden'}`}
					>
						{validationMessage.email}
					</p>
				</div>
				<div className="mb-4">
					<JoinInput
						type={'password'}
						text={'비밀번호'}
						value={password}
						onChange={setPassword}
						EmptyRef={passwordRef}
					/>
					<p
						className={`text-red-500 text-sm ${validationMessage.password ? 'block' : 'hidden'}`}
					>
						{validationMessage.password}
					</p>
				</div>
				<div className="mb-4">
					<JoinInput
						type={'password'}
						text={'비밀번호 확인'}
						value={passwordCheck}
						onChange={setPasswordCheck}
						EmptyRef={passwordCheckRef}
					/>
					<p
						className={`text-red-500 text-sm ${validationMessage.passwordCheck ? 'block' : 'hidden'}`}
					>
						{validationMessage.passwordCheck}
					</p>
				</div>
				<div className="mb-4">
					<JoinInput
						type={'text'}
						text={'전화번호'}
						value={phone}
						onChange={setPhone}
						EmptyRef={phoneRef}
					/>
					<p
						className={`text-red-500 text-sm ${validationMessage.phone ? 'block' : 'hidden'}`}
					>
						{validationMessage.phone}
					</p>
				</div>
				<JoinButton text={'회원가입'} handleSignUp={handleSignUp} />
				{error && <div className="text-red-500 text-sm">{error}</div>}
			</div>
		</div>
	)
}

export default Join
