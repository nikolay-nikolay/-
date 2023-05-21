import { useState } from 'react'
import { useForm } from 'react-hook-form'

const UpdateCar = (data) => {
	const [ login, setLogin ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ image, setImage ] = useState('')
	const [ id, setId ] = useState(data)
	

	const {
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
	})

	function update() {
		console.log(id.data)
		try {
		const requestOptions = {
			method: 'POST',
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({
				login: login,
				password: password
			}),
		}
		fetch(`http://localhost:4200/auth`, requestOptions,)
			.then(({ data }) => {
				return data;
				
			});
		} catch (e) {
			console.log("Sending error", e);
		}

	}

	return (
		<div>
			<form onSubmit={handleSubmit(update)}>
				<button className='btn'>Редактировать</button>
				<input  value={login} onChange={e => setLogin(e.target.value)}/>
				<input  value={password} onChange={e => setPassword(e.target.value)}/>
				<button>Сохранить</button>
			</form>
		</div>
	)
}

export default UpdateCar
