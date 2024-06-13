/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SockJS from 'sockjs-client'
import * as Stomp from 'webstomp-client'

export default function ChatRoom() {
	const { roomId } = useParams()
	const [messages, setMessages] = useState([])
	const [client, setClient] = useState(null)

	const [newMessage, setNewMessage] = useState('')
	const sender = 'user'
	const jwtToken =
		'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhQGEiLCJyb2xlIjpbeyJhdXRob3JpdHkiOiJVU0VSIn1dLCJleHAiOjIwMTYyNjIzNjJ9.azK0eQzXB-JhkBDdqCtf5xQQQOHUfWJ64cx-PA33Mig'

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
					JSON.stringify(
						{
							type: 'ENTER',
							roomId: roomId,
							sender: sender,
							message: '',
						},
						{},
					),
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
					console.log('3333333')
					try {
						const parsedMessage = JSON.parse(message.body)
						console.log('444444')
						setMessages((prevMessages) => [
							...prevMessages,
							// parsedMessage,
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
			console.log(messagePayload)
			client.send('/pub/chat/message', JSON.stringify(messagePayload), {})
			setNewMessage('')
		}
	}

	// 컴포넌트가 처음 렌더링될 때 연결 초기화
	useEffect(() => {
		initializeWebSocketConnection()
		return () => cleanupWebSocketConnection()
	})

	return (
		<div>
			<h1>{roomId}</h1>
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
