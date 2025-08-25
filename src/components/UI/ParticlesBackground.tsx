import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SparklesCore } from './sparkles'

const ParticlesBackground: React.FC = () => {
  const { scrollYProgress } = useScroll() // 현재 스크롤 위치 감지
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]) // 스크롤할수록 사라짐

  return (
    <motion.div
      style={{
        opacity, // 스크롤 시 점점 사라지게 적용
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))', // 아래쪽으로 갈수록 페이드아웃
        WebkitMaskImage:
          'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))',
      }}
      animate={{ opacity: [0.9, 1, 0.9] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className='absolute inset-0 w-full h-full'
    >
      <SparklesCore
        background='transparent'
        minSize={0.5}
        maxSize={1.5}
        particleDensity={600}
        className='w-full h-full'
        particleColor='#FFFFFF'
      />
    </motion.div>
  )
}

export default ParticlesBackground
