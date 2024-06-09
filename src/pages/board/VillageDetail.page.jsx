import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

export default function VillageDetail() {
	const { village_id } = useParams()
	const [villageData, setVillageData] = useState('')
	//const [likes, setLikes] = useState(0)
	const [comments, setComments] = useState([]) // 댓글 상태 추가
	const [content, setContent] = useState('') // 댓글 내용을 상태로 관리합니다.
	const [email, setEmail] = useState('') // 이메일 상태를 추가합니다.
	const [editingCommentId, setEditingCommentId] = useState(null) // 현재 수정 중인 댓글 ID 상태 추가
	const [editedContent, setEditedContent] = useState('') // 수정할 댓글 내용을 상태로 관리합니다.

	const URL = `/api/board/village/show/${village_id}`

	const Token =
		'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhQGEiLCJyb2xlIjpbeyJhdXRob3JpdHkiOiJVU0VSIn1dLCJleHAiOjIwMTYyNjIzNjJ9.azK0eQzXB-JhkBDdqCtf5xQQQOHUfWJ64cx-PA33Mig'

	useEffect(() => {
		axios
			.get(URL, {
				headers: {
					Authorization: `Bearer ${Token}`,
				},
			})
			.then((response) => {
				setVillageData(response.data)
				//setLikes(response.data.like)
			})
			.catch((error) => {
				console.error('Error:', error)
			})
	}, [URL, Token])

	useEffect(() => {
		const token = localStorage.getItem('accessToken') // 로컬 스토리지에서 토큰 가져오기
		if (token) {
			const decoded = jwtDecode(token) // 토큰 디코드
			if (decoded && decoded.sub) {
				setEmail(decoded.sub) // 이메일 상태 업데이트
			}
		}
	}, [])

	useEffect(() => {
		// 댓글을 가져오는 API 호출
		axios
			.get(`/api/board/village/comment/show/${village_id}`, {
				headers: {
					Authorization: `Bearer ${Token}`,
				},
			})
			.then((response) => {
				setComments(response.data) // 댓글 상태 업데이트
			})
			.catch((error) => {
				console.error('Error:', error)
			})
	}, [village_id, Token])

	// const handleLike = () => {
	// 	axios
	// 		.put(
	// 			`/board/question/like/${id}`,
	// 			{ id: id, type: 'LIKE' },
	// 			{
	// 				headers: {
	// 					Authorization: `Bearer ${Token}`,
	// 				},
	// 			},
	// 		)
	// 		.then(() => {
	// 			// PUT 요청이 성공한 후 최신 좋아요 숫자를 받아옴
	// 			return axios.get(`/board/question/like/${id}`, {
	// 				headers: {
	// 					Authorization: `Bearer ${Token}`,
	// 				},
	// 			})
	// 		})
	// 		.then((response) => {
	// 			// 최신 좋아요 숫자로 상태 업데이트
	// 			setLikes(response.data.likes)
	// 		})
	// 		.catch((error) => {
	// 			console.error('Error:', error)
	// 		})
	// }

	const handleCommentSubmit = () => {
		axios
			.post(
				'/api/board/village/comment/new',
				{
					village_id: village_id,
					member_email: email,
					content: content,
				},
				{
					headers: {
						Authorization: `Bearer ${Token}`,
					},
				},
			)
			.then(() => {
				alert('댓글이 성공적으로 생성되었습니다.')
				setContent('')
				return axios.get(
					`/api/board/village/comment/show/${village_id}`,
					{
						headers: {
							Authorization: `Bearer ${Token}`,
						},
					},
				)
			})
			.then((response) => {
				setComments(response.data) // 새 댓글 목록으로 상태 업데이트
			})
			.catch((error) => {
				console.error('Error:', error)
				alert('댓글 생성에 실패하였습니다.')
			})
	}

	const handleCommentDelete = (comment_id) => {
		axios
			.delete(`/api/board/village/comment/delete/${comment_id}`, {
				headers: {
					Authorization: `Bearer ${Token}`,
				},
			})
			.then(() => {
				alert('댓글이 성공적으로 삭제되었습니다.')
				return axios.get(
					`/api/board/village/comment/show/${village_id}`,
					{
						headers: {
							Authorization: `Bearer ${Token}`,
						},
					},
				)
			})
			.then((response) => {
				setComments(response.data) // 새 댓글 목록으로 상태 업데이트
			})
			.catch((error) => {
				console.error('Error:', error)
				alert('댓글 삭제에 실패하였습니다.')
			})
	}

	const handleCommentEdit = (comment_id, content) => {
		setEditingCommentId(comment_id)
		setEditedContent(content)
	}

	const handleCommentUpdate = (comment_id) => {
		axios
			.put(
				`/api/board/village/comment/update`,
				{
					id: comment_id,
					content: editedContent,
				},
				{
					headers: {
						Authorization: `Bearer ${Token}`,
					},
				},
			)
			.then(() => {
				alert('댓글이 성공적으로 수정되었습니다.')
				setEditingCommentId(null)
				setEditedContent('')
				return axios.get(
					`/api/board/village/comment/show/${village_id}`,
					{
						headers: {
							Authorization: `Bearer ${Token}`,
						},
					},
				)
			})
			.then((response) => {
				setComments(response.data) // 새 댓글 목록으로 상태 업데이트
			})
			.catch((error) => {
				console.error('Error:', error)
				alert('댓글 수정에 실패하였습니다.')
			})
	}

	return (
		<div className="flex justify-center items-center min-h-screen mx-8 my-8">
			<div className="bg-white border border-gray-300 rounded-lg p-8 shadow-lg mx-4 md:mx-0">
				<div className="px-4 sm:px-0">
					<h3 className="text-base font-semibold leading-7 text-gray-900">
						{villageData.title}
					</h3>
					<p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
						작성자 : {villageData.email}, 작성일 :{' '}
						{villageData.created_at}
					</p>
				</div>
				<div className="mt-6 border-t border-gray-100">
					<dl className="divide-y divide-gray-100">
						<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
							<dt className="text-sm font-medium leading-6 text-gray-900">
								내용
							</dt>
							<br></br>
							<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
								{villageData.content}
							</dd>
						</div>
						{/* <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
							조회수 : {questionData.count}
						</p> */}
						{/* <button
							className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
							onClick={handleLike}
						>
							좋아요 {likes}
						</button> */}
						<div className="mt-4">
							<textarea
								className="w-full border border-gray-300 rounded-lg p-2"
								rows="4"
								placeholder="댓글을 입력하세요..."
								value={content}
								onChange={(e) => setContent(e.target.value)}
							></textarea>
						</div>
						<button
							className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
							onClick={handleCommentSubmit}
						>
							댓글 등록
						</button>
						<div className="mt-4">
							<h4 className="text-sm font-medium leading-6 text-gray-900">
								댓글
							</h4>
							<div className="mt-2">
								{comments.map((comment) => (
									<div
										key={comment.comment_id}
										className="border border-gray-300 rounded-lg p-4 mb-4"
									>
										{editingCommentId ===
										comment.comment_id ? (
											<>
												<textarea
													className="w-full border border-gray-300 rounded-lg p-2"
													rows="4"
													value={editedContent}
													onChange={(e) =>
														setEditedContent(
															e.target.value,
														)
													}
												></textarea>
												<button
													className="mt-3 mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
													onClick={() =>
														handleCommentUpdate(
															comment.comment_id,
														)
													}
												>
													저장
												</button>
												<button
													className="mt-3 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
													onClick={() =>
														setEditingCommentId(
															null,
														)
													}
												>
													취소
												</button>
											</>
										) : (
											<>
												<p className="text-sm leading-6 text-gray-700">
													{comment.content}{' '}
												</p>
												<p className="text-xs leading-5 text-gray-500">
													작성자: {comment.email},
													작성일: {comment.created_at}
												</p>
												{email === comment.email && (
													<>
														<button
															className="bg-red-500 mr-2 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
															onClick={() =>
																handleCommentDelete(
																	comment.comment_id,
																)
															}
														>
															삭제
														</button>
														<button
															className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
															onClick={() =>
																handleCommentEdit(
																	comment.comment_id,
																	comment.content,
																)
															}
														>
															수정
														</button>
													</>
												)}
											</>
										)}
									</div>
								))}
							</div>
						</div>
					</dl>
				</div>
			</div>
		</div>
	)
}
