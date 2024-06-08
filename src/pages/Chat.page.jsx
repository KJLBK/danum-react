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
		try {
			const response = await axios.get(
				'/api/chat/room',
				{ name: 'test-chat-room-2' },
				{ headers: { Authorization: `Bearer ${jwtToken}` } },
			)
			setRoomId(response.data.roomId)
			enterRoom(response.data.roomId)
		} catch (error) {
			console.error(
				'Error creating room:',
				error.response ? error.response.data : error.message,
			)
		}
	}

	const enterRoom = (roomId) => {
		const socket = new SockJS('/api/ws-stomp')
		/* eslint-disable no-console */
		console.log(socket)
		const client = Stomp.over(socket)
		/* eslint-disable no-console */
		console.log(client)
		client.connect(
			{ Authorization: `Bearer ${jwtToken}` },
			(frame) => {
				/* eslint-disable no-console */
				console.log('Connected:', frame)
				client.subscribe(`/topic/chat/room/${roomId}`, (message) => {
					/* eslint-disable no-console */
					console.log('Message received:', message)

					setMessages((prevMessages) => [
						...prevMessages,
						JSON.parse(message.body),
					])
				})
				/* eslint-disable no-console */
				console.log('Subscription to room:', roomId)
				client.send(
					'/app/chat/message',
					{},
					JSON.stringify({
						type: 'ENTER',
						roomId: roomId,
						sender: sender,
						message: '',
					}),
				)
				/* eslint-disable no-console */
				console.log('Sent ENTER message to room:', roomId)
				setStompClient(client)
				/* eslint-disable no-console */
				console.log('Stomp client set:', client)
			},
			(error) => {
				/* eslint-disable no-console */
				console.log('gjgj')
				console.error('Error connecting to WebSocket:', error)
			},
		)
	}

	const sendMessage = () => {
		if (stompClient) {
			const messagePayload = {
				type: 'TALK',
				roomId: roomId,
				sender: sender,
				message: newMessage,
			}
			stompClient.send(
				'/app/chat/message',
				{},
				JSON.stringify(messagePayload),
			)
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
