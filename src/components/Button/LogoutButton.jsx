import { useNavigate } from 'react-router-dom'

function LogoutButton() {
	const navigate = useNavigate()

	const handleLogout = () => {
		// localStorage에서 토큰 삭제
		localStorage.removeItem('auth-storage')

		// 사용자를 로그인 페이지로 리디렉트
		navigate('/login')
	}

	return (
		<button
			onClick={handleLogout}
			className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
		>
			로그아웃
		</button>
	)
}

export default LogoutButton
