const JoinButton = ({ text, handleSignUp }) => {
	return (
		<div>
			<button
				className="mt-10 bg-gray-700 hover:bg-gray-400 text-white py-3 px-44 rounded-lg inline-flex items-center"
				onClick={handleSignUp} // 버튼 클릭시 handleClick 함수 실행
			>
				{text}
			</button>
		</div>
	)
}

export default JoinButton
