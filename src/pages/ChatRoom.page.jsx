import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SockJS from 'sockjs-client'
import * as Stomp from 'webstomp-client'
import {
	Input,
	Button,
	Card,
	CardBody,
	Typography,
} from '@material-tailwind/react'
import { jwtDecode } from 'jwt-decode'

export default function ChatRoom() {
	const { roomId } = useParams()
	const [messages, setMessages] = useState([])
	const [client, setClient] = useState(null)
	const [newMessage, setNewMessage] = useState('')
	const jwtToken =
		'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhQGEiLCJyb2xlIjpbeyJhdXRob3JpdHkiOiJVU0VSIn1dLCJleHAiOjIwMTYyNjIzNjJ9.azK0eQzXB-JhkBDdqCtf5xQQQOHUfWJ64cx-PA33Mig'
	const sender = jwtDecode(jwtToken).sub
	const initializeWebSocketConnection = () => {
		const socket = new SockJS(`/api/ws-stomp`)
		const stompClient = Stomp.over(socket)
		setClient(stompClient)

		stompClient.connect(
			{ Authorization: `Bearer ${jwtToken}` },
			(frame) => {
				console.log('Connected: ', frame)

				subscribeToRoom(stompClient, roomId)

				stompClient.send(
					'/app/chat/message',
					JSON.stringify({
						type: 'ENTER',
						roomId: roomId,
						sender: sender,
						message: '',
					}),
					{},
				)
			},
			(error) => {
				console.error('Connection error: ', error)
			},
		)
	}

	const subscribeToRoom = (stompClient, roomId) => {
		stompClient.subscribe(
			`/sub/chat/room/${roomId}`,
			(message) => {
				console.log(message)
				if (message.body) {
					console.log(
						'Received message from /sub/chat/message: ',
						message.body,
					)
					try {
						const parsedMessage = JSON.parse(message.body)
						setMessages((prevMessages) => [
							...prevMessages,
							parsedMessage,
						])
					} catch (e) {
						console.error('Error parsing message body:', e)
					}
				} else {
					console.error('Received message with undefined body')
				}
			},
			{},
		)
	}

	const cleanupWebSocketConnection = () => {
		if (client && client.connected) {
			client.disconnect(() => {
				console.log('Disconnected')
			})
		}
	}

	const sendMessage = () => {
		if (client) {
			const messagePayload = {
				type: 'TALK',
				roomId: roomId,
				sender: sender,
				message: newMessage,
			}
			client.send('/pub/chat/message', JSON.stringify(messagePayload), {})
			setNewMessage('')
		}
	}

	useEffect(() => {
		initializeWebSocketConnection()
		return () => cleanupWebSocketConnection()
	}, [roomId])

	return (
		<div className="flex flex-col items-center p-4">
			<Typography variant="h6" className="mb-4">
				채팅방 : {roomId}
			</Typography>
			<Card className="w-full max-w-md mb-4">
				<CardBody>
					{messages.map((message, index) => (
						<Typography key={index} className="mb-2">
							<strong>{message.sender}</strong>: {message.message}
						</Typography>
					))}
				</CardBody>
			</Card>
			<div className="flex w-full max-w-md">
				<Input
					type="text"
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					className="flex-1"
				/>
				<Button onClick={sendMessage} className="ml-2">
					Send
				</Button>
			</div>
		</div>
	)
}
