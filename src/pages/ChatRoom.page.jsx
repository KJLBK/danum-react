// import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SockJS from 'sockjs-client'
import * as Stomp from 'webstomp-client'

export default function ChatRoom() {
	const { roomId } = useParams()
	// const [messages, setMessages] = useState([])
	// const jwtToken =
	// 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhQGEiLCJyb2xlIjpbeyJhdXRob3JpdHkiOiJVU0VSIn1dLCJleHAiOjIwMTYyNjIzNjJ9.azK0eQzXB-JhkBDdqCtf5xQQQOHUfWJ64cx-PA33Mig'

	// useEffect(() => {
	// axios로 가져오기 - 이전 메시지들.

	// // user와 핸드 쉐이킹 🤝🏻
	// const socket = new SockJS('ws://43.203.8.51:8080/ws/chat')
	// // Stomp.over | Stomp.overWS | Stomp.overTCP -> https://www.npmjs.com/package/stompjs
	// const client = Stomp.overWS(socket)
	// client.connect({ Authorization: `Bearer ${jwtToken}` }, () => {
	// 	client.subscribe(
	// 		`
	//     /topic/room/${roomId}
	//   `,
	// 		(message) => {
	// 			setMessages((prevMessages) => [
	// 				...prevMessages,
	// 				JSON.parse(message.body),
	// 			])
	// 		},
	// 	)
	// 	console.log('succ')
	// })

	// const socket = new WebSocket(`ws://43.203.8.51:8080/ws/chat/`) // -> ws이거나 wss 인 경우
	const socket = new SockJS(`/api/ws-stomp`) // -> http이거나 https 인 경우
	const client = Stomp.over(socket)

	client.connect(
		{},
		(frame) => {
			/* eslint-disable no-console */
			console.log('연결됌', frame)

			// 구독 예시
			client.subscribe('/chat/room/enter/${roomId}', (message) => {
				/* eslint-disable no-console */
				console.log('메시지 수신:', message.body)
			})

			// 메시지 발송 예시
			client.send(
				'/chat/message',
				JSON.stringify({ content: '안녕하세요!' }),
				{},
			)
		},
		(error) => {
			console.error(error)
		},
	)
	// })

	return (
		<div>
			<h1>${roomId}</h1>
		</div>
	)
}
