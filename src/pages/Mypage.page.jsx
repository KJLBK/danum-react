// my-page

import { useState } from 'react'
import { updateUserDetails } from '../api/member/api'

export default function MyPage() {
	const [authInfo, setAuthInfo] = useState({
		email: '',
		password: '',
		phone: '',
		name: '',
	})

	const handleChange = (event) => {
		const { name, value } = event.target
		setAuthInfo({ ...authInfo, [name]: value })
	}

	const AuthRequest = async (event) => {
		try {
			event.preventDefault()
			const modifyUser = await updateUserDetails(authInfo)
			setAuthInfo(modifyUser)
		} catch (err) {
			console.error(err)
		}
	}
	return (
		<>
			<div className="min-h-screen flex items-center justify-center bg-gray-100">
				<form
					onSubmit={AuthRequest}
					className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
				>
					<h2 className="text-2xl font-bold mb-4">
						Update Your Information
					</h2>
					<div className="mb-4">
						<label className="block text-gray-700">Email</label>
						<input
							type="email"
							name="email"
							value={authInfo.email}
							onChange={handleChange}
							className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700">Password</label>
						<input
							type="password"
							name="password"
							value={authInfo.password}
							onChange={handleChange}
							className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700">Phone</label>
						<input
							type="text"
							name="phone"
							value={authInfo.phone}
							onChange={handleChange}
							className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700">Name</label>
						<input
							type="text"
							name="name"
							value={authInfo.name}
							onChange={handleChange}
							className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full"
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
					>
						Update
					</button>
				</form>
			</div>
		</>
	)
}
