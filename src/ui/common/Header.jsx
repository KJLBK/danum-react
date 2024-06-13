import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Header() {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		// Check if the user is authenticated (this could be a token check or an API call)
		const token = localStorage.getItem('accessToken')
		setIsAuthenticated(!!token)
	}, [])

	const handleLogout = async () => {
		await axios.get('/api/logout')
		// Remove token and update authentication state
		localStorage.removeItem('token')
		setIsAuthenticated(false)
		navigate('/login')
	}

	return (
		<header className="bg-gray-800 text-white p-4 shadow-md">
			<div className="container mx-auto flex justify-between items-center">
				<h1 className="text-2xl font-bold">
					<Link to="/" className="text-white hover:text-gray-400">
						DANUM
					</Link>
				</h1>
				<nav className="space-x-4">
					<Link to="/dev-question" className="hover:text-gray-400">
						Question
					</Link>
					<Link to="/dev-village" className="hover:text-gray-400">
						Village
					</Link>
					{isAuthenticated && (
						<Link to="/mypage" className="hover:text-gray-400">
							마이페이지
						</Link>
					)}
					<Link to="/chat/roomlist" className="hover:text-gray-400">
						Chat
					</Link>
					{isAuthenticated ? (
						<button
							onClick={handleLogout}
							className="hover:text-gray-400 focus:outline-none"
						>
							로그아웃
						</button>
					) : (
						<Link to="/login" className="hover:text-gray-400">
							로그인
						</Link>
					)}
				</nav>
			</div>
		</header>
	)
}
