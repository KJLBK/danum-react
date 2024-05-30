import axios from 'axios'

export async function fetchLogin(auth) {
	try {
		const response = await axios.post('/member/login', auth)

		return response.data
	} catch (e) {
		console.error(e)
	}
}
