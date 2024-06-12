/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SockJS from 'sockjs-client'
import * as Stomp from 'webstomp-client'

export default function ChatRoom() {
	const { roomId } = useParams()
	const [messages, setMessages] = useState([])
	const [client, setClient] = useState(null) //no-unused-vars

	useEffect(() => {
		const socket = new SockJS('/api/ws/chat')
		const stompClient = Stomp.over(socket)
		setClient(stompClient)

		stompClient.connect(
			{},
			(frame) => {
				console.log('Connected: ', frame) //no-unused-vars

				stompClient.subscribe(
					`/chat/room/enter/${roomId}`,
					(message) => {
						console.log('Received message: ', message.body) //no-unused-vars
						setMessages((prevMessages) => [
							...prevMessages,
							JSON.parse(message.body),
						])
					},
				)

				// 테스트 메시지 발송
				stompClient.send(
					'/chat/message',
					JSON.stringify({ content: '안녕하세요!' }),
					{},
				)
			},
			(error) => {
				console.error('Connection error: ', error)
			},
		)

		return () => {
			if (stompClient && stompClient.connected) {
				stompClient.disconnect(() => {
					console.log('Disconnected') //no-unused-vars
				})
			}
		}
	}, [roomId])

	return (
		<div>
			<h1>{roomId}</h1>
			<div>
				{messages.map((msg, index) => (
					<div key={index}>{msg.content}</div>
				))}
			</div>
		</div>
	)
}
