// import React, { useRef } from 'react'
import React from 'react'

interface InputFieldProps {
  label: string;
  subLabel?: string;
  type?: 'text' | 'email' | 'textarea' | 'select' | 'checkbox' | 'test';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  checkboxLabel?: string;
  phoneNumber?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  subLabel,
  type = 'text',
  placeholder,
  required = false,
  options = [],
  checkboxLabel = '확인했습니다.',
  phoneNumber = false,
}) => {

  // const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)

  // const handleKeyDown = (e: React.KeyboardEvent) => {
  //   if (e.key === 'Enter' && type !== 'textarea') {
  //     e.preventDefault() // 기본 엔터 동작(폼 제출) 방지
      
  //     const inputElement = e.currentTarget as HTMLInputElement // 🔹 타입 단언 추가
  //     const form = inputElement.form // 🔹 이제 form 속성 사용 가능
      
  //     if (!form) return
      
  //     const index = Array.from(form.elements).indexOf(inputElement)
  //     const nextElement = form.elements[index + 1] as HTMLElement
    
  //     if (nextElement) {
  //       nextElement.focus() // 다음 input으로 포커스 이동
  //     }
  //   }
  // }


  
  // 📌 공통 스타일 변수
  const containerStyles = 'mb-4 p-3 shadow-[0px_2px_3px_rgba(255,255,255,0.2)] text-white'
  const baseInputStyles = 'w-full bg-mainBlack border-b border-white  p-2 focus:outline-none text-[10px]'
  const inputStyles = 'w-4 h-4 bg-mainBlack border border-white focus:ring-white border-2 appearance-none checked:bg-white checked:border-white" '

  return (
    <div className={containerStyles}>
      <label className="block text-white text-[10px] font-bold mb-1">
        {label.split(/(대면으로|전화번호 마지막 4자리)/).map((part, index) => (
          <span key={index} className={part === '대면으로' ? 'text-red-500' : part === '전화번호 마지막 4자리' ? 'text-[#00B493]' : ''}>
            {part}
          </span>
        ))}
        {type !== 'checkbox' && type !== 'test' && required && <span className="text-red-500 pl-1">*</span>}
      </label>

      {subLabel && (
        <p className="font-bold text-[10px]">
          {subLabel.split(/(ex\)|\d{4})/).map((part, index, array) => (
            <span
              key={index}
              className={
                part === 'ex)'
                  ? 'text-[#A5A5A5]' 
                  : index === array.length - 2 && /\d{4}/.test(part)
                    ? 'text-[#00B493]' 
                    : ''
              }
            >
              {part}
            </span>
          ))}
        </p>
      )}

      {type === 'select' ? (
        <select className={baseInputStyles}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea placeholder={placeholder} className={baseInputStyles} required={required} />

      ) : type === 'checkbox' ? (
        <div className="flex items-center space-x-2">
          <input type="checkbox" className={inputStyles} required={required} />

          <span className="text-white text-[10px]">{checkboxLabel}</span>
        </div>

      ) : (
        <input type={type} placeholder={placeholder} className={baseInputStyles} required={required} />
      )}
    </div>
  )
}
