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
  UserMain,
  Recruit,
  RecruitResult,
  FAQ,
  RecruitSubmit,
  RecruitCheck,
  RecruitCheckFinal,
  SomkathonRecruit,
  SomkathonSubmit,
  SomkatonApplicants,
  RecruitInfo,
  CoreMembers,
} from './pages'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
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
  const hideHeaderFooter = ['/login'] // 헤더와 푸터를 숨길 페이지
  const hideFooterOnly = [
    '/recruit',
    '/recruitinfo',
    '/recruit/submit',
    '/recruit/result',
    '/recruit/check',
    '/recruit/check/final',
    '/recruit/meeting',
    '/recruit/meeting/submit',
    '/somkathon',
    '/somkathon/submit',
    '/admin/applicants'
  ] // 푸터만 숨길 페이지

  return (
    <>
      {/* 지정한 페이지 header 숨기기 */}
      {!hideHeaderFooter.includes(location.pathname) && <Header />}
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/usermain' element={<UserMain />} />
        <Route path='/activities/news' element={<News />} />
        <Route path='/activities/news/:no' element={<NewsInfo />} />
        <Route path='/about/organization' element={<CoreMembers />} />
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
      {!hideHeaderFooter.includes(location.pathname) &&
        !hideFooterOnly.includes(location.pathname) && <Footer />}
    </>
  )
}

export default App
