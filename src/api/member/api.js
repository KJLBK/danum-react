import axios from 'axios'

// [PUT] /member/update , update
// 파라미터 RequestBody: UpdateDto
// email: String, password: String, phone: String, name: String
// 반환 값 org.springframework.http.ResponseEntity<?>

export async function updateUserDetails(answer) {
	try {
		const Token =
			'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhQGEiLCJyb2xlIjpbeyJhdXRob3JpdHkiOiJVU0VSIn1dLCJleHAiOjIwMTYyNjIzNjJ9.azK0eQzXB-JhkBDdqCtf5xQQQOHUfWJ64cx-PA33Mig'
		const response = await axios.put('/member/update', answer, {
			headers: {
				Authorization: `Bearer ${Token}`,
			},
		})
		return response.data
	} catch (e) {
		console.error(e)
	}
}
