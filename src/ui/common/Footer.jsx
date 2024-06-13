import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Footer() {
	const [hello, setHello] = useState(false)

	// Backend Test Code
	useEffect(() => {
		axios
			.get('/api/test')
			.then(() => {
				setHello(true)
			})
			.catch(() => {
				setHello(false)
			})
	}, [])

	return (
		<footer className="bg-gray-800 text-white p-4 shadow-md mt-8">
			<div className="container mx-auto text-center">
				<p className="mt-4 text-gray-300">
					API 테스트 / Backend Data :{' '}
					<span className={hello ? 'text-green-500' : 'text-red-500'}>
						{hello ? '연결성공' : '연결실패'}
					</span>
				</p>
				<h2 className="text-m font-bold text-gray-300 mt-4">
					Local Storage(authStorage)
				</h2>
				<p className="text-xs text-gray-800 bg-gray-200 rounded px-3 py-1.5 shadow-sm overflow-wrap break-words">
					{localStorage.getItem('accessToken')}
				</p>
			</div>
		</footer>
	)
}
