import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
	Input,
	Button,
	Card,
	CardBody,
	Typography,
	List,
	ListItem,
} from '@material-tailwind/react'

export default function ChatRoomList() {
	const [rooms, setRooms] = useState([])
	const [roomName, setRoomName] = useState('')
	const jwtToken =
		'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhQGEiLCJyb2xlIjpbeyJhdXRob3JpdHkiOiJVU0VSIn1dLCJleHAiOjIwMTYyNjIzNjJ9.azK0eQzXB-JhkBDdqCtf5xQQQOHUfWJ64cx-PA33Mig'

	const createRoom = async () => {
		const response = await axios.post(
			'/api/chat/room',
			{ name: roomName },
			{ headers: { Authorization: `Bearer ${jwtToken}` } },
		)
		setRooms([...rooms, response.data.roomId])
		setRoomName('')
	}

	return (
		<div className="flex flex-col items-center p-4">
			<Typography variant="h6" className="mb-4">
				Chat Rooms
			</Typography>
			<div className="flex w-full max-w-md mb-4">
				<Input
					type="text"
					value={roomName}
					onChange={(e) => setRoomName(e.target.value)}
					className="flex-1"
					placeholder="Enter room name"
				/>
				<Button onClick={createRoom} className="ml-2">
					create
				</Button>
			</div>
			<Card className="w-full max-w-md">
				<CardBody>
					<List>
						{rooms.map((room) => (
							<ListItem key={room}>
								<Link to={`/chat/${room}`}>
									<Typography>{room}</Typography>
								</Link>
							</ListItem>
						))}
					</List>
				</CardBody>
			</Card>
		</div>
	)
}
