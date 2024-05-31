import axios from 'axios'

export async function fetchLogin(auth) {
	try {
		const response = await axios.post('/member/login', auth)
		if (response.data) {
			localStorage.setItem('accessToken', response.data)

			return response.status
		}
	} catch (e) {
		const jsonObject = JSON.parse(e.request.responseText)

		const code = jsonObject.code
		const message = jsonObject.message

		return { code, message }
	}
}
