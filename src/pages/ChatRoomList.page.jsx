import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ChatRoomList() {
	// useState (Room, RoomName)
	const [rooms, setRooms] = useState([])
	const [roomName, setRoomName] = useState('')
	const jwtToken =
		'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhQGEiLCJyb2xlIjpbeyJhdXRob3JpdHkiOiJVU0VSIn1dLCJleHAiOjIwMTYyNjIzNjJ9.azK0eQzXB-JhkBDdqCtf5xQQQOHUfWJ64cx-PA33Mig'
	// Room list?

	// CreateRoom [Post]/chat/createroom
	// { name: 'test-chat-room-2' },
	// { headers: { Authorization: `Bearer ${jwtToken}` } },
	const createRoom = async () => {
		const response = await axios.post(
			'/api/chat/createroom',
			{
				name: roomName,
			},
			{ headers: { Authorization: `Bearer ${jwtToken}` } },
		)
		setRooms([...rooms, response.data]) // 방 리스트들을 뽑아내야해서..s
		// setRooms(response.data.room_Id)
		// console.log(response.data.room_Id)
		// console.log(rooms)
		setRoomName('') // init
	}

	return (
		<div>
			<h1>Chat Rooms</h1>
			<input
				type="text"
				value={roomName}
				onChange={(e) => setRoomName(e.target.value)}
			/>
			<button onClick={createRoom}>Create Room</button>
			<ul>
				{rooms.map((room) => (
					<li key={room.room_Id}>
						<Link to={`/chat/${room.room_Id}`}>{room.name}</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
