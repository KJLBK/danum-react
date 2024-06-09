import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

export async function fetchLogin(auth) {
	try {
		const response = await axios.post('/api/member/login', auth)
		const code = response.status
		if (response.data) {
			localStorage.setItem('accessToken', response.data)
			try {
				const decoded = jwtDecode(response.data)
				return { code, decoded }
			} catch (err) {
				console.error(err.message)
			}
		}
	} catch (e) {
		const jsonObject = JSON.parse(e.request.responseText)

		const code = jsonObject.code
		const message = jsonObject.message

		return { code, message }
	}
}
