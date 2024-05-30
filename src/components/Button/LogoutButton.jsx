import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function LogoutButton() {
	const navigate = useNavigate()

	const handleLogout = async () => {
		try {
			// api 로그아웃 요청(쿠키 삭제)
			await axios.get('/logout')

			// localStorage에서 토큰 삭제
			localStorage.removeItem('accessToken')

			// 사용자를 로그인 페이지로 리디렉트
			navigate('/login')
		} catch (error) {
			console.error(error)
		}
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
