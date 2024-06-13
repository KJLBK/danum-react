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

const VillageList = () => {
	const [villageList, setVillageList] = useState([])
	const [searchQuery, setSearchQuery] = useState('')
	const navigate = useNavigate()

	const URL = '/api/board/village/show'
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
				setVillageList(response.data)
			})
			.catch((error) => {
				console.error('Error:', error)
			})
	}, [])

	const handleViewDetails = (village_id) => {
		axios
			.get(`/api/board/village/show/${village_id}`, {
				headers: {
					Authorization: `Bearer ${Token}`,
				},
			})
			.then(() => {
				navigate(`/dev-village/${village_id}`)
			})
			.catch((error) => {
				console.error('Error:', error)
			})
	}

	const filteredVillageList = villageList.filter((item) =>
		item.title.toLowerCase().includes(searchQuery.toLowerCase()),
	)

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-100">
			<Card className="w-full max-w-4xl">
				<CardBody>
					<div className="flex justify-between items-center mb-4">
						<Typography variant="h3" className="mb-0 text-center">
							Village List
						</Typography>
						<Button
							color="black"
							onClick={() => navigate('/village-write')}
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
						{filteredVillageList.map((item) => (
							<ListItem
								key={item.village_id}
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
											handleViewDetails(item.village_id)
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

export default VillageList
