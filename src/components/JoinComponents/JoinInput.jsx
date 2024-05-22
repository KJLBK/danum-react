const JoinInput = ({ type, text, value, onChange, EmptyRef }) => {
	return (
		<>
			<div className="flex items-center mt-10">
				<label className="w-32 mr-4">{text}</label>
				<input
					type={type}
					ref={EmptyRef}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className="border-b border-black focus:outline-none focus:border-black flex-grow"
				/>
			</div>
		</>
	)
}

export default JoinInput
