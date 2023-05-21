import { useQuery } from '@tanstack/react-query'
import { CarService } from '../../../services/car.service.js'
import Catalog from '../../ui/Catalog.jsx'
import Header from './../../ui/Header'
import CreateCarForm from './create-car-form/CreateCarForm.jsx'
import CreateUser from '../home/car-item/CreateUser'

function Home() {
	const { data, isLoading } = useQuery(['cars'], () => CarService.getAll())

	if (isLoading) return <p>Loading...</p>

	return (
		<div>
			<h1>Cars catalog</h1>
			<CreateUser/>
			<Header />
			<CreateCarForm />
			<Catalog data={data} />
		</div>
	)
}
export default Home
