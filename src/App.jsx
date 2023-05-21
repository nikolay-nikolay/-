import './App.css'

import { Route, Routes } from 'react-router-dom'
import Register from './components/register/Register'
import Login from './components/register/ui/Login'
import Post from './components/register/ui/Post'

export const App = () => {
	return (
		<div>
			<Routes>
				<Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/post' element={<Post />} />
			</Routes>
		</div>
	)
}
export default App
