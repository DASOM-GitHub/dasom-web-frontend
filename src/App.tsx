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
import ManNewsList from './pages/admin/ManNewsList'
import ManNewsDetail from './pages/admin/ManNewsDetail'
import ManNewsPost from './pages/admin/ManNewsPost'
import ManRecruitDate from './pages/admin/ManRecruitDate'
import UserMain from './pages/UserMain'
import Recruit from './pages/Recruit'
import CoreMembers from './pages/CoreMembers'
import { Header } from './components/UI/Header'
import { RecruitResult } from './pages/RecruitResult'
import FAQ from './pages/FAQ'
import { RecruitSubmit } from './pages/RecruitSubmit'
import RecruitCheck from './pages/RecruitCheck'
import RecruitCheckFinal from './pages/RecruitCheckFinal'
import ProtectedRoute from './components/layout/ProtectRoute'

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
				<Route path='/recruit/check/final' element={<RecruitCheckFinal />} />
				<Route path='/recruit/meeting' element={<RecruitMeeting />} />
				<Route path='/recruit/meeting/submit' element={<RecruitSubmitMeeting />} />

				{/* 관리자 페이지 */}
				<Route path='/admin' element={<ProtectedRoute><AdminMain /></ProtectedRoute>} />
				<Route path='/admin/applicants' element={<ProtectedRoute><ManApplicants /></ProtectedRoute>} />
				<Route path='/admin/date' element={<ProtectedRoute><ManRecruitDate /></ProtectedRoute>} />
        <Route path='/admin/news' element={<ProtectedRoute><ManNewsList /></ProtectedRoute>} />
				<Route path='/admin/news/:no' element={<ProtectedRoute><ManNewsDetail /></ProtectedRoute>} />
				<Route path='/admin/news/post' element={<ProtectedRoute><ManNewsPost /></ProtectedRoute>} />
			</Routes>
		</>
	)
}

export default App
