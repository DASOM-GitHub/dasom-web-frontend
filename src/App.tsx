import React from 'react'
import './assets/styles/index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Main from './pages/Main'
import RecruitMeeting from './pages/RecruitMeeting'
import RecruitSubmitMeeting from './pages/RecruitSubmitMeeting'

function App() {
	return (
		<div className='App'>
			<Router>
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/recruit-meeting' element={<RecruitMeeting />} />
					<Route path='/recruit-meeting/submit' element={<RecruitSubmitMeeting />} />
				</Routes>
			</Router>
		</div>
	)
}

export default App
