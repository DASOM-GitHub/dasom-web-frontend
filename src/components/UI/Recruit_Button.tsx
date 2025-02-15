import React from 'react'

interface ButtonProps {
  text: string;
  className?: string;  // 추가적인 Tailwind 스타일 적용 가능
}

// 📌 button 컴포넌트
export const Button: React.FC<ButtonProps> = ({ text, className }) => {
  return (
    <div className='w-full max-w-[395px] h-[50px] flex justify-center'>
      <button type="submit"
        className={`bg-[#00B493] max-w-[395px] h-[22px] text-white font-bold px-4 text-[12px] transition-all hover:bg-[#00937A] active:scale-95 ${className}`}
      >
        {text}
      </button>
    </div>
  )
}




