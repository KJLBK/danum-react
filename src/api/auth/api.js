import axios from 'axios'

export async function fetchLogin(auth) {
	try {
		console.log(auth)
		const response = await axios.post('/member/login', auth)
		console.log(response)
		return response.data
	} catch (e) {
		console.log(e)
	}
}
