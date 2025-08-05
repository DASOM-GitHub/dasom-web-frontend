import React from 'react'

interface ButtonProps {
  text: string
  className?: string
  onClick?: () => void // 클릭 이벤트 핸들러
  disabled?: boolean // 비활성화 여부
}

// button 컴포넌트
export const Button: React.FC<ButtonProps> = ({
  text,
  className,
  onClick,
  disabled,
}) => {
  return (
    <div className='w-full max-w-[395px] mt-20 mb-20 flex justify-center '>
      <button
        type='submit'
        className={`bg-[#00B493] max-w-[395px] h-[30px]  text-white font-pretendardBold px-4 text-[12px] transition-all ${!disabled ? 'hover:bg-[#00937A] active:scale-95' : null}  ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  )
}
