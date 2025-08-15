import React from 'react'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'

interface NavItem {
  title: string
  links: { name: string; path: string }[]
}

interface MobileNavProps {
  navItems: NavItem[]
  onClose: () => void
}

const MobileNav = ({ navItems, onClose }: MobileNavProps) => {
  return (
    <div className="fixed inset-0 bg-mainBlack z-50 flex flex-col items-center justify-center text-white">
      <button onClick={onClose} className="absolute top-5 right-5 text-4xl hover:text-mainColor transition-colors duration-300">
        <X />
      </button>
      <nav className="flex flex-col items-center space-y-8">
        {navItems.map((item) => (
          <div key={item.title} className="text-center">
            <h3 className="text-xl font-pretendardBold mb-4 hover:text-mainColor transition-colors duration-300">{item.title}</h3>
            <div className="flex flex-col space-y-3">
              {item.links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={onClose}
                  className="text-lg font-pretendardRegular hover:text-mainColor transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
        <Link to="/auth/login" onClick={onClose} className="text-xl font-pretendardBold mt-8 hover:text-mainColor transition-colors duration-300">
          로그인 / 회원가입
        </Link>
      </nav>
    </div>
  )
}

export default MobileNav
