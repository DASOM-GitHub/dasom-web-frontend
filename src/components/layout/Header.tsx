import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react'
import MobileNav from './MobileNav'

const Header = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const navItems = [
    {
      title: 'About',
      links: [
        { name: '소개', path: '/about/introduction' },
        { name: '조직도', path: '/about/organization' },
      ],
    },
    {
      title: '활동 기록',
      links: [
        { name: '활동 현황', path: '/activities/status' },
        { name: '다솜 소식', path: '/activities/news' },
      ],
    },
    {
      title: '가입안내',
      links: [{ name: '지원하기', path: '/join/apply' }],
    },
  ]

  return (
    <header
      onMouseLeave={() => setActiveMenu(null)}
      className={`w-full relative shadow-[2px_6px_11px_0px_rgba(0,0,0,0.25)] bg-mainBlack text-white transition-all duration-300 ease-in-out ${activeMenu ? 'md:h-[120px]' : 'md:h-[56px]'} h-[56px]`}>

      <div className="w-full max-w-screen-xl mx-auto px-4">
        {/* 모바일 헤더 */}
        <div className="w-full h-[56px] flex md:hidden items-center justify-between">
          <Link to="/" className="text-mainColor text-2xl font-pretendardBlack">
            DASOM
          </Link>
          <button onClick={toggleMobileMenu} className="text-3xl hover:text-mainColor transition-colors duration-300">
            <Menu />
          </button>
        </div>

        {/* 데탑용 헤더 */}
        <div className="w-full hidden md:block">
          <div className="flex items-center justify-between h-[56px]">
            <Link to="/" className="text-mainColor text-2xl font-pretendardBlack">DASOM</Link>
            <div className="flex items-center space-x-16">
              <nav className="flex items-center space-x-16 h-full">
                {navItems.map((item) => (
                  <div
                    key={item.title}
                    onMouseEnter={() => setActiveMenu(item.title)}
                    className="flex items-center h-[56px] cursor-pointer w-20 justify-center"
                  >
                    <span className="text-sm font-pretendardBold">{item.title}</span>
                  </div>
                ))}
              </nav>
              <Link to="/auth/login" className="text-sm font-pretendardBold whitespace-nowrap">로그인 / 회원가입</Link>
            </div>
          </div>
        </div>
      </div>

      {/* 메뉴바 */}
      <div className={`absolute top-[56px] left-0 w-full bg-mainBlack transition-all duration-300 ease-in-out overflow-hidden hidden md:block ${activeMenu ? 'max-h-40' : 'max-h-0'}`}>
        <div className="w-full max-w-screen-xl mx-auto flex justify-end px-4">
          <div className="flex items-center space-x-16">
            <nav className="flex items-start space-x-16 h-full py-4">
              {navItems.map((item) => (
                <div key={item.title} className="flex h-full w-20 justify-center">
                  <div className="flex flex-col items-center space-y-2">
                    {item.links.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        className={`text-sm font-pretendardRegular hover:text-mainColor whitespace-nowrap transition-opacity ${activeMenu === item.title ? 'opacity-100' : 'opacity-0'}`}>
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
            <div className="invisible">
              <Link to="/auth/login" className="text-sm font-pretendardBold whitespace-nowrap">로그인 / 회원가입</Link>
            </div>
          </div>
        </div>
      </div>

      {/* 모바일 메뉴바 */}
      {isMobileMenuOpen && <MobileNav navItems={navItems} onClose={toggleMobileMenu} />}
    </header>
  )
}

export default Header
