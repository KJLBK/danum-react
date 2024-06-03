import axios from 'axios'
import { useState } from 'react'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

export default function Chat() {
	const [roomId, setRoomId] = useState(null)
	const [messages, setMessages] = useState([])
	const [stompClient, setStompClient] = useState(null)
	const [newMessage, setNewMessage] = useState('')
	// TODO: 임시로 sender 저장 / zustand 구현 이후 수정
	const sender = 'user1'
	const jwtToken =
		'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhQGEiLCJyb2xlIjpbeyJhdXRob3JpdHkiOiJVU0VSIn1dLCJleHAiOjIwMTYyNjIzNjJ9.azK0eQzXB-JhkBDdqCtf5xQQQOHUfWJ64cx-PA33Mig'

	const createRoom = async () => {
		const response = await axios.post(
			'/chat/createroom',
			// TODO: name 수정
			{ name: 'test-chat-room-2' },
			{ headers: { Authorization: `Bearer ${jwtToken}` } },
		)
		setRoomId(response.data.room_id)
		enterRoom(response.data.room_id)
	}

	const enterRoom = (roomId) => {
		const socket = new SockJS('http://43.203.8.51:8080/ws/chat')
		//
		const client = Stomp.over(socket)
		client.connect({ Authorization: `Bearer ${jwtToken}` }, () => {
			client.subscribe(`/topic/room/${roomId}`, (message) => {
				setMessages((prevMessages) => [
					...prevMessages,
					JSON.parse(message.body),
				])
			})
			//
			client.send(
				'/app/chat',
				{},
				JSON.stringify({
					type: 'ENTER',
					room_id: roomId,
					sender: sender,
					message: '',
				}),
			)
			// set
			setStompClient(client)
		})
	}

	const sendMessage = () => {
		if (stompClient) {
			const messagePayload = {
				type: 'TALK',
				room_id: roomId,
				sender: sender,
				message: newMessage,
			}
			stompClient.send('/app/chat', {}, JSON.stringify(messagePayload))
			setNewMessage('')
		}
	}

	return (
		<div>
			<h1>Chat APP</h1>
			<button onClick={createRoom}>Create ROOM</button>
			<div>
				{messages.map((message, index) => (
					<div key={index}>
						{message.sender}: {message.message}
					</div>
				))}
			</div>
			<input
				type="text"
				value={newMessage}
				onChange={(e) => setNewMessage(e.target.value)}
			/>
			<button onClick={sendMessage}>Send</button>
		</div>
	)
}
