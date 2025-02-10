import React from 'react'

interface InputFieldProps {
  label: string;
  subLabel?: string;
  type?: 'text' | 'email' | 'textarea' | 'select' | 'checkbox' | 'test';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  checkboxLabel?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  subLabel,
  type = 'text',
  placeholder,
  required = false,
  options = [],
  checkboxLabel = '확인했습니다.',
}) => {
  
  // 📌 공통 스타일 변수
  const containerStyles = 'mb-4 p-3 shadow-[0px_2px_3px_rgba(255,255,255,0.2)] text-white'
  const baseInputStyles = 'w-full bg-mainBlack border-b border-white  p-2 focus:outline-none text-[10px]'
  const inputStyles = 'w-4 h-4 bg-mainBlack border border-white focus:ring-white border-2 appearance-none checked:bg-white checked:border-white" '

  return (
    <div className={containerStyles}>
      <label className="block text-white text-[10px] font-bold mb-1">
        {label.split('대면으로').map((part, index) => (
          <span key={index}>
            {part}
            {index !== label.split('대면으로').length - 1 && (
              <span className="text-red-500">대면으로</span>
            )}
          </span>
        ))}
        {type !== 'checkbox' && type !== 'test' && required && <span className="text-red-500 pl-1">*</span>}
      </label>

      {subLabel && <p className=" font-bold text-[10px] mb-3">{subLabel}</p>}

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
