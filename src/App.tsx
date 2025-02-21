import React from 'react'
import './assets/styles/index.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Main from './pages/Main'
import AdminMain from './pages/admin/AdminMain'
import Login from './pages/Login'
import RecruitMeeting from './pages/RecruitMeeting'
import RecruitSubmitMeeting from './pages/RecruitSubmitMeeting'
import News from './pages/News'
import NewsInfo from './pages/NewsInfo'
import ManApplicants from './pages/admin/ManApplicants'
import UserMain from './pages/UserMain'
import Recruit from './pages/Recruit'
import CoreMembers from './pages/CoreMembers'
import { Header } from './components/UI/Header'
import { RecruitResult } from './pages/RecruitResult'
import FAQ from './pages/FAQ'
import { RecruitSubmit } from './pages/RecruitSubmit'
import RecruitCheck from './pages/RecruitCheck'

function App() {
	return (
		<div className='App'>
			<Router>
				<AppContent />
			</Router>
		</div>
	)
}

function AppContent() {
	const location = useLocation()
	const hideHeader = ['/login'] // 헤더를 숨길 페이지

	return (
		<>
			{/* 지정한 페이지 header 숨기기 */}
			{!hideHeader.includes(location.pathname) && <Header />}
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/login' element={<Login />} />
				<Route path='/usermain' element={<UserMain />} />
				<Route path='/news' element={<News />} />
				<Route path='/news/:no' element={<NewsInfo />} />
				<Route path='/coremember' element={<CoreMembers />} />
				<Route path='/faq' element={<FAQ />} />
				<Route path='/recruit' element={<Recruit />} />
				<Route path='/recruit/submit' element={<RecruitSubmit />} />
				<Route path='/recruit/result' element={<RecruitResult />} />
				<Route path='/recruit/check' element={<RecruitCheck />} />
				<Route path='/recruit/meeting' element={<RecruitMeeting />} />
				<Route path='/recruit/meeting/submit' element={<RecruitSubmitMeeting />} />
				<Route path='/admin' element={<AdminMain />} />
				<Route path='/admin/applicants' element={<ManApplicants />} />
			</Routes>
		</>
	)
}

export default App
