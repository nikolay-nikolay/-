import { useState } from 'react'
import { useForm } from 'react-hook-form'
const Login = () => {
	const [password, setPassword] = useState('')
	const [login, setLogin] = useState('')
	const [test, setTest] = useState(false)

	const handlerClick = () => {
		setTest(!test)
	}

	let content = null

	const { handleSubmit } = useForm({
		mode: 'onChange',
	})

	if (test) {
		content = (
			<>
				<a className='links' href='/post'>
					Продолжить
				</a>
			</>
		)
	}

	async function checkLogin() {
		const api_url = 'http://localhost:4200/auth'
		const response = await fetch(api_url)
		const data = await response.json()
		data.find(el => {
			if (el.login === login && el.password === password) {
				handlerClick()
			}
		})
	}

	return (
		<div>
			<h1>Авторизация</h1>
			<form onSubmit={handleSubmit(checkLogin)}>
				<input
					className='input'
					value={login}
					onChange={e => setLogin(e.target.value)}
				/>
				<input
					className='input'
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<button className='btn'>Сохранить</button>
			</form>
			{content}
		</div>
	)
}

export default Login
