import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SockJS from 'sockjs-client'
import * as Stomp from 'webstomp-client'

export default function ChatRoom() {
	const { roomId } = useParams()
	const [messages, setMessages] = useState([])
	const jwtToken =
		'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhQGEiLCJyb2xlIjpbeyJhdXRob3JpdHkiOiJVU0VSIn1dLCJleHAiOjIwMTYyNjIzNjJ9.azK0eQzXB-JhkBDdqCtf5xQQQOHUfWJ64cx-PA33Mig'

	useEffect(() => {
		// axios로 가져오기 - 이전 메시지들.

		// user와 핸드 쉐이킹 🤝🏻
		const socket = new SockJS(`/seungmin/ws-stomp`)
		// Stomp.over | Stomp.overWS | Stomp.overTCP -> https://www.npmjs.com/package/stompjs
		const client = Stomp.over(socket)
		client.connect({ Authorization: `Bearer ${jwtToken}` }, () => {
			client.subscribe(`/chat/room/enter/${roomId}`, (message) => {
				setMessages((prevMessages) => [
					...prevMessages,
					JSON.parse(message.body),
				])
			})
			console.log('succ')
		})
	})
	/*
	// const socket = new WebSocket('ws://43.203.8.51:8080/ws-stomp') // -> ws이거나 wss 인 경우
	const socket = new SockJS(
		`http://43.203.8.51:8080/chat/room/enter/${roomId}`,
	) // -> http이거나 https 인 경우
	const client = Stomp.over(socket)
	console.log('111111')

	client.connect(
		{},
		(frame) => {
			// eslint-disable no-console
			console.log('연결됌', frame)

			// 구독 예시
			client.subscribe('/topic/messages', (message) => {
				//  eslint-disable no-console
				console.log('메시지 수신:', message.body)
			})

			// 메시지 발송 예시
			client.send(
				'/app/chat',
				JSON.stringify({ content: '안녕하세요!' }),
				{},
			)
		},
		(error) => {
			console.error(error)
		},
	)
	// })
	*/
	/*
	// 웹소켓 서버 URL
	const wsUrl = 'http:///43.203.8.51:8080/ws-stomp'

	// 웹소켓 객체 생성
	const socket = new WebSocket(wsUrl)

	// 연결이 열렸을 때 실행될 함수
	socket.onopen = function (event) {
		console.log('WebSocket is open now.')
		// 서버로 메시지 보내기 예시
		socket.send('Hello Server!')
	}

	// 서버로부터 메시지를 받았을 때 실행될 함수
	socket.onmessage = function (event) {
		console.log('Message from server ', event.data)
		// 수신한 메시지를 처리하는 로직 추가
	}

	// 연결이 닫혔을 때 실행될 함수
	socket.onclose = function (event) {
		if (event.wasClean) {
			console.log(
				'WebSocket connection closed cleanly, code=' +
					event.code +
					' reason=' +
					event.reason,
			)
		} else {
			console.error(
				'WebSocket connection closed unexpectedly, code=' + event.code,
			)
		}
	}

	// 에러가 발생했을 때 실행될 함수
	socket.onerror = function (error) {
		console.error('WebSocket error: ', error)
	}
	*/

	return (
		<div>
			<h1>${roomId}</h1>
		</div>
	)
}
