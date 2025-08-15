import React from 'react'
import './assets/styles/index.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import {
  Main,
  AdminMain,
  Login,
  RecruitMeeting,
  RecruitSubmitMeeting,
  News,
  NewsInfo,
  ManApplicants,
  ManNewsList,
  ManNewsDetail,
  ManNewsPost,
  ManNewsEdit,
  ManRecruitDate,
  ManInterviewee,
  UserMain,
  Recruit,
  CoreMembers,
  RecruitResult,
  FAQ,
  RecruitSubmit,
  RecruitCheck,
  RecruitCheckFinal,
  SomkathonRecruit,
  SomkathonSubmit,
  SomkatonApplicants,
  RecruitInfo,
} from './pages'
import Header from './components/layout/Header'
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
        <Route path='/recruitinfo' element={<RecruitInfo />} />
        <Route path='/recruit/submit' element={<RecruitSubmit />} />
        <Route path='/recruit/result' element={<RecruitResult />} />
        <Route path='/recruit/check' element={<RecruitCheck />} />
        <Route path='/recruit/check/final' element={<RecruitCheckFinal />} />
        <Route path='/recruit/meeting' element={<RecruitMeeting />} />
        <Route
          path='/recruit/meeting/submit'
          element={<RecruitSubmitMeeting />}
        />
        <Route path='/somkathon' element={<SomkathonRecruit />} />
        <Route path='/somkathon/submit' element={<SomkathonSubmit />} />

        {/* 관리자 페이지 */}
        <Route
          path='/admin'
          element={
            <ProtectedRoute>
              <AdminMain />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin/applicants'
          element={
            <ProtectedRoute>
              <ManApplicants />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin/applicants/interviewee'
          element={
            <ProtectedRoute>
              <ManInterviewee />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin/date'
          element={
            <ProtectedRoute>
              <ManRecruitDate />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin/news'
          element={
            <ProtectedRoute>
              <ManNewsList />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin/news/:no'
          element={
            <ProtectedRoute>
              <ManNewsDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin/news/post'
          element={
            <ProtectedRoute>
              <ManNewsPost />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin/news/edit/:no'
          element={
            <ProtectedRoute>
              <ManNewsEdit />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin/somkathon'
          element={
            <ProtectedRoute>
              <SomkatonApplicants />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
