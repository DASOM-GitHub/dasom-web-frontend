import React from 'react'
import { Github, Instagram } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
            <footer className="bg-mainColor text-white font-pretendardRegular h-auto md:h-[140px] py-7">
      <div className="w-full max-w-screen-xl mx-auto flex flex-col justify-center h-full px-4 md:px-12">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <p className="text-xs md:text-lg font-normal">© 2025 DASOM. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-2">
            <Link to="https://www.instagram.com/dasom___official/" target="_blank" rel="noopener noreferrer">
              <Instagram className="size-6" />
            </Link>
            <Link to="https://github.com/DASOM-GitHub" target="_blank" rel="noopener noreferrer">
              <Github className="size-6" />
            </Link>
          </div>
        </div>

        <div className="w-full my-4 border-t border-white" />

        <div className="flex flex-col md:flex-row justify-between w-full gap-4">
                    <p className="text-sm md:text-lg font-bold">Made by DASOM Makers</p>
          <div className="text-left md:text-right">
                        <p className="text-[10px] md:text-sm font-normal">서울특별시 구로구 경인로 445, 3호관 511호</p>
                        <a href="mailto:dmu_dasom@naver.com" className="text-[10px] md:text-sm font-normal underline">
              dmu_dasom@naver.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
