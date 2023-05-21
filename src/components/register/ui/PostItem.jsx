import { useState } from 'react'
import { useForm } from 'react-hook-form'

const PostItem = ({ car }) => {
	const [test, setTest] = useState(false)
	const [name, setName] = useState('')
	const [price, setPrice] = useState('')
	const [image, setImage] = useState('')

	const handlerClick = () => {
		setTest(!test)
	}

	let content = null

	const { handleSubmit } = useForm({
		mode: 'onChange',
	})

	async function click() {
		console.log('asd')
		handlerClick()
	}

	async function update() {
		try {
		const requestOptions = {
			method: 'PUT',
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({
				name: name,
				price: price,
				image: image
			}),
		}
		fetch(`http://localhost:4200/cars/${car.id}`, requestOptions,)
			.then(({ data }) => {
				return data;
				
			});
		} catch (e) {
			console.log("Sending error", e);
		}
	}
	if (test) {
		content = (
			<>
				<form onSubmit={handleSubmit(update)}>
					<input
						type='text'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
					<input
						type='text'
						value={price}
						onChange={e => setPrice(e.target.value)}
					/>
					<input
						type='text'
						value={image}
						onChange={e => setImage(e.target.value)}
					/>
					<button>Сохранить</button>
				</form>
			</>
		)
	}

	return (
		<div>
			<div className='post'>
				<div
					className='img'
					style={{
						backgroundImage: `url(${car.image})`,
					}}
				/>
				<div className='info'>
					<p>{car.name}</p>
					<p>{car.price} RUB</p>
				</div>
				<div className='change'>
					<button className='change-btn' onClick={click}>
						Редактировать
					</button>
				</div>
				{content}
			</div>
		</div>
	)
}

export default PostItem
