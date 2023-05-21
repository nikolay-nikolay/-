import { useState } from 'react'
import { useForm } from 'react-hook-form'

const UpdateCar = (data) => {
	const [ name, setName ] = useState('')
	const [ price, setPrice ] = useState('')
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
			method: 'PUT',
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({
				id: id.data,
				name: name,
				price: price,
				image: image
			}),
		}
		fetch(`http://localhost:4200/cars/${id.data}`, requestOptions,)
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
				<input  value={name} onChange={e => setName(e.target.value)}/>
				<p>{name}</p>
				<input  value={price} onChange={e => setPrice(e.target.value)}/>
				<input  value={image} onChange={e => setImage(e.target.value)}/>
				<button>Сохранить</button>
			</form>
		</div>
	)
}

export default UpdateCar
