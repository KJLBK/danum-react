import InfoInput from '../components/InfoInput.jsx'
const SignUp = () => {
	return (
		<>
			<div className="flex justify-center items-center h-screen">
				<div className="p-12 border border-gray-300 rounded-lg shadow-lg">
					<h1 className="mb-10 text-2xl font-bold">회원가입</h1>
					<InfoInput />
				</div>
			</div>
		</>
	)
}

export default SignUp
