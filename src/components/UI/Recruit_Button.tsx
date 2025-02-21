import React from 'react'

interface ButtonProps {
  text: string;
  className?: string;  // 추가적인 Tailwind 스타일 적용 가능
  onClick?: () => void;  // 클릭 이벤트 핸들러 추가
  disabled?: boolean;  // 비활성화 여부 추가
}

// 📌 button 컴포넌트
export const Button: React.FC<ButtonProps> = ({ text, className, onClick, disabled }) => {
  return (
    <div className='w-full max-w-[395px] mt-20 mb-20 flex justify-center '>
      <button type="submit"
        className={`bg-[#00B493] max-w-[395px] h-[30px]  text-white font-pretendardBold px-4 text-[12px] transition-all hover:bg-[#00937A] active:scale-95 ${className}`}
        onClick={onClick}  
        disabled={disabled}  
      >
        {text}
      </button>
    </div>
  )
}




