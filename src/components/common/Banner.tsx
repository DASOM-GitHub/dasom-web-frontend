import React, { ReactNode } from 'react'

interface BannerProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  children?: ReactNode;
  className?: string;
}

const Banner: React.FC<BannerProps> = ({
  imageUrl,
  title,
  subtitle,
  children,
  className = '',
}) => {
  return (
    <header className={`w-full relative ${className}`}>
      <img
        src={imageUrl}
        alt="banner"
        className='w-full h-full object-cover'
      />
      <div className='absolute inset-0 flex flex-col items-center justify-center bg-black/30 px-4 text-center'>
        <h1 className='text-2xl sm:text-2xl md:text-5xl font-black text-mainColor font-pretendardBlack'>
          {title}
        </h1>
        <p className='text-sm sm:text-xl md:text-2xl font-bold text-white font-pretendardBold'>
          {subtitle}
        </p>
        {children}
      </div>
    </header>
  )
}

export default Banner
