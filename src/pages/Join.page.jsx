import JoinInput from '../components/JoinComponents/JoinInput.jsx'
import JoinButton from '../components/JoinComponents/JoinButton.jsx'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Join = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		passwordCheck: '',
		phone: '',
	})

	const inputRefs = {
		name: useRef(null),
		email: useRef(null),
		password: useRef(null),
		passwordCheck: useRef(null),
		phone: useRef(null),
	}

	const navigate = useNavigate()
	const [error, setError] = useState('')
	const [validationMessage, setValidationMessage] = useState({
		name: ' ',
		email: ' ',
		password: ' ',
		passwordCheck: '',
		phone: ' ',
	})

	const handleInputChange = (e, fieldName) => {
		const value = e.target.value
		setFormData({ ...formData, [fieldName]: value })
	}

	const handleSignUp = async () => {
		let validationErrors = {
			name: ' ',
			email: ' ',
			password: ' ',
			passwordCheck: '',
			phone: ' ',
		}

		if (formData.name.length < 2) {
			validationErrors.name = '이름은 최소 2자 이상이어야 합니다.'
			setValidationMessage(validationErrors)
			inputRefs.name.current.focus()
			return
		}
		if (formData.email.length < 10) {
			validationErrors.email = '이메일은 최소 10자 이상이어야 합니다.'
			setValidationMessage(validationErrors)
			inputRefs.email.current.focus()
			return
		}
		if (formData.password.length < 8) {
			validationErrors.password = '비밀번호는 최소 8자 이상이어야 합니다.'
			setValidationMessage(validationErrors)
			inputRefs.password.current.focus()
			return
		}
		if (formData.password !== formData.passwordCheck) {
			validationErrors.passwordCheck = '비밀번호 일치하지 않습니다.'
			setValidationMessage(validationErrors)
			inputRefs.passwordCheck.current.focus()
			return
		}
		if (formData.phone.length < 10) {
			validationErrors.phone = '전화번호는 최소 10자 이상이어야 합니다.'
			setValidationMessage(validationErrors)
			inputRefs.phone.current.focus()
			return
		}

		try {
			const response = await axios.post('/api/member/join', formData)
			/* eslint-disable no-console */
			console.log(response)
			if (response.status === 200) {
				navigate('/') // 홈 페이지로 이동
			}
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
						value={formData.name}
						onChange={(e) => handleInputChange(e, 'name')}
						EmptyRef={inputRefs.name}
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
						value={formData.email}
						onChange={(e) => handleInputChange(e, 'email')}
						EmptyRef={inputRefs.email}
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
						value={formData.password}
						onChange={(e) => handleInputChange(e, 'password')}
						EmptyRef={inputRefs.password}
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
						value={formData.passwordCheck}
						onChange={(e) => handleInputChange(e, 'passwordCheck')}
						EmptyRef={inputRefs.passwordCheck}
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
						value={formData.phone}
						onChange={(e) => handleInputChange(e, 'phone')}
						EmptyRef={inputRefs.phone}
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
