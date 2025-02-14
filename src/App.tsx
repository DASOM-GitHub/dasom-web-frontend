import React from 'react'
import './assets/styles/index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Main from './pages/Main'
import AdminMain from './pages/admin/AdminMain'

function App() {
	return (
		<div className='App'>
			<Router>
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/admin' element={<AdminMain />} />
				</Routes>
			</Router>
		</div>
	)
}

export default App