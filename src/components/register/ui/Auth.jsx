import { useState } from 'react'
import { useForm } from 'react-hook-form'
const Auth = () => {
	const [password, setPassword] = useState('')
	const [login, setLogin] = useState('')
	const [test, setTest] = useState(false)

	const handlerClick = () => {
		setTest(!test)
	}

	let content = null
	if (test){
		content = <><a className='links' href='/login'>
		Перейти к авторизации
	</a></>
	}

	const { handleSubmit } = useForm({
		mode: 'onChange',
	})

	function auth() {
		try {
			const requestOptions = {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify({
					login: login,
					password: password,
				}),
			}
			fetch(`http://localhost:4200/auth`, requestOptions).then(({ data }) => {
				handlerClick()
				return data
			})
		} catch (e) {
			console.log('Sending error', e)
		}
		
	}

	return (

		
		<div className='auth'>
			<h1>Регистрация</h1>
			<form onSubmit={handleSubmit(auth)}>
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

export default Auth
