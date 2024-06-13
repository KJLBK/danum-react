import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	Card,
	CardBody,
	Typography,
	Input,
	Button,
	List,
	ListItem,
	ListItemPrefix,
	ListItemSuffix,
} from '@material-tailwind/react'

const QuestionList = () => {
	const [questionList, setQuestionList] = useState([])
	const [searchQuery, setSearchQuery] = useState('')
	const navigate = useNavigate()

	const URL = '/api/board/question/show'
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
				setQuestionList(response.data)
			})
			.catch((error) => {
				console.error('Error:', error)
			})
	}, [])

	const handleViewDetails = (question_id) => {
		axios
			.get(`/api/board/question/show/${question_id}`, {
				headers: {
					Authorization: `Bearer ${Token}`,
				},
			})
			.then(() => {
				navigate(`/dev-question/${question_id}`)
			})
			.catch((error) => {
				console.error('Error:', error)
			})
	}

	const filteredQuestionList = questionList.filter((item) =>
		item.title.toLowerCase().includes(searchQuery.toLowerCase()),
	)

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-100">
			<Card className="w-full max-w-4xl">
				<CardBody>
					<div className="flex justify-between items-center mb-4">
						<Typography variant="h3" className="mb-0 text-center">
							Question List
						</Typography>
						<Button
							color="black"
							onClick={() => navigate('/question-write')}
						>
							질문 작성
						</Button>
					</div>
					<div className="flex justify-between items-center mb-4">
						<Input
							type="text"
							placeholder="Search..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="flex-grow mr-4"
						/>
					</div>
					<List>
						{filteredQuestionList.map((item) => (
							<ListItem
								key={item.question_id}
								className="flex justify-between items-center py-4"
							>
								<ListItemPrefix>
									<Typography
										variant="h5"
										className="font-semibold"
									>
										{item.title}
									</Typography>
									<Typography
										variant="small"
										className="text-gray-600"
									>
										작성자: {item.email}
									</Typography>
								</ListItemPrefix>
								<ListItemSuffix>
									<Button
										color="blue"
										onClick={() =>
											handleViewDetails(item.question_id)
										}
									>
										자세히 보기
									</Button>
								</ListItemSuffix>
							</ListItem>
						))}
					</List>
				</CardBody>
			</Card>
		</div>
	)
}

export default QuestionList
