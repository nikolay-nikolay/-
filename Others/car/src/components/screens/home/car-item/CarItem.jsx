import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import styles from '../Home.module.css'
import Price from './Price'
import UpdateCar from './UpdateCar'
import { useMutation, useQueryClient } from '@tanstack/react-query'
function CarItem({ car }) {
	

	return (
		<div key={car.id} className={styles.item}>
			<div
				className={styles.image}
				style={{
					backgroundImage: `url(${car.image})`,
				}}
			/>
			<div className={styles.info}>
				<h2>{car.name}</h2>
				<Price price={car.price}></Price>
				<Link className='btn' to={`car/${car.id}`}>
					Read more
				</Link>
			<UpdateCar data={car.id}/>
			</div>
		</div>
	)
}
export default CarItem
