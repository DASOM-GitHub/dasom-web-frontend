import React from 'react'
import ParticlesBackground from '../../components/UI/ParticlesBackground'

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="relative w-full" style={{ paddingTop: '56%' }}>
        <img
          src="/dasomMain.png"
          alt="hero background"
          className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm"
        />
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="w-full max-w-screen-xl mx-auto px-4">
            <ParticlesBackground />
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-pretendardBlack tracking-tight">DASOM</h1>
              <p className="mt-4 text-lg md:text-2xl font-pretendardBold">
                동양미래대 컴퓨터공학부 전공동아리 다솜
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
