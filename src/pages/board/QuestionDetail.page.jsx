import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function QuestionDetail() {
	const { id } = useParams()
	const [questionData, setQuestionData] = useState('')
	//const [likes, setLikes] = useState(0)
	const [comment, setComment] = useState('') // 댓글 내용을 상태로 관리합니다.

	const URL = `/board/question/show/${id}`
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
				setQuestionData(response.data)
				//setLikes(response.data.like)
			})
			.catch((error) => {
				console.error('Error:', error)
			})
	}, [URL, Token])

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

	// const handleCommentSubmit = () => {
	// 	axios
	// 		.post(
	// 			'/board/question/comment/new',
	// 			{
	// 				board_id: id,
	// 				member_email: questionData.email,
	// 				content: comment,
	// 			},
	// 			{
	// 				headers: {
	// 					Authorization: `Bearer ${Token}`,
	// 				},
	// 			},
	// 		)
	// 		.then((response) => {
	// 			//console.log('Comment submitted successfully')
	// 			// 댓글 전송이 성공했을 때의 작업 추가 (예: 성공 메시지 출력 또는 페이지 새로고침)
	// 		})
	// 		.catch((error) => {
	// 			console.error('Error:', error)
	// 		})
	// }
	return (
		<div className="flex justify-center items-center min-h-screen mx-8 my-8">
			<div className="bg-white border border-gray-300 rounded-lg p-8 shadow-lg mx-4 md:mx-0">
				<div className="px-4 sm:px-0">
					<h3 className="text-base font-semibold leading-7 text-gray-900">
						{questionData.title}
					</h3>
					<p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
						작성자 : {questionData.id}, 작성일 :{' '}
						{questionData.created_at}
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
								{questionData.content}
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
								value={comment}
								onChange={(e) => setComment(e.target.value)}
							></textarea>
						</div>
						<button
							className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
							//onClick={handleCommentSubmit}
						>
							댓글 등록
						</button>
					</dl>
				</div>
			</div>
		</div>
	)
}
