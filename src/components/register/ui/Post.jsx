import { useEffect, useState } from 'react'
import PostItem from './PostItem'

const Post = () => {
	const [cars,setCars] = useState([])
		
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('http://localhost:4200/cars')
			const data = await response.json()
			setCars(data)
		}
		fetchData()
	}, [])
 return <div>
	<div className='posts' >
			{cars.map(car => 
				<PostItem key={car.id} car = {car} />

			)}
	</div>
 </div>
}

export default Post