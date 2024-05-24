import { useEffect, useState } from 'react'
import axios from 'axios'

const dummyData = [
	{ idx: 1, title: 'Board 1', category: 'A' },
	{ idx: 2, title: 'Board 2', category: 'B' },
	{ idx: 3, title: 'Board 3', category: 'A' },
]

const BoardList = () => {
	const [data, setData] = useState([]) // 배열로 초기화합니다.
	const [selectedCategory, setSelectedCategory] = useState('') // 선택된 카테고리 상태를 관리합니다.

	useEffect(() => {
		const fetchData = async () => {
			try {
				const Token =
					'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhQGEiLCJyb2xlIjpbeyJhdXRob3JpdHkiOiJVU0VSIn1dLCJleHAiOjIwMTYyNjIzNjJ9.azK0eQzXB-JhkBDdqCtf5xQQQOHUfWJ64cx-PA33Mig'
				// localStorage.getItem('accessToken')
				const response = await axios.get('/board/viewlist', {
					headers: {
						Authorization: `Bearer ${Token}`,
					},
				})
				setData(response.data)
			} catch (error) {
				//console.error('Error fetching board list:', error)
				setData(dummyData)
			}
		}
		fetchData()
	}, [])

	// 카테고리가 변경될 때마다 해당 카테고리의 게시글만 필터링하여 출력합니다.
	const filteredData = selectedCategory
		? data.filter((item) => item.category === selectedCategory)
		: data

	return (
		<div>
			<select
				value={selectedCategory}
				onChange={(e) => setSelectedCategory(e.target.value)}
			>
				<option value="">All</option>
				<option value="A">Category A</option>
				<option value="B">Category B</option>
			</select>
			<ul>
				{filteredData.map((item, index) => (
					<li key={index}>{item.title}</li>
				))}
			</ul>
		</div>
	)
}

export default BoardList
