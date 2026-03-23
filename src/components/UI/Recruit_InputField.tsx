import React from 'react'
import { InputFieldProps } from './types'

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  subLabel,
  type = 'text',
  placeholder,
  required = false,
  options = [],
  checkboxLabel = '확인했습니다.',
  phoneNumber = false,
  value,
  minLength,
  maxLength,
  checked,
  onChange,
  onKeyDown,
  highlightLabels = ['전화번호 마지막 4자리', '학번'],
}) => {
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto'
    e.target.style.height = `${e.target.scrollHeight}px`
    onChange(e)
  }

  const containerStyles =
    'mb-4 p-3 shadow-[0px_2px_3px_rgba(255,255,255,0.2)] text-white text-[12px] md:text-base w-full font-pretendardRegular'
  const baseInputStyles =
    'w-full bg-mainBlack border-b border-white p-2 focus:outline-none text-[10px] md:text-sm font-pretendardRegular'
  
  // 1. 체크박스 가시성 개선: 체크 표시(✔) 추가 및 크기 조정
  const inputStyles =
    'w-5 h-5 bg-mainBlack border-2 border-white rounded-[3px] appearance-none cursor-pointer relative transition-all ' +
    'checked:bg-white checked:border-white ' +
    'checked:after:content-["✔"] checked:after:absolute checked:after:text-mainBlack checked:after:text-[14px] ' +
    'checked:after:font-bold checked:after:left-1/2 checked:after:top-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2'

  return (
    <div className={containerStyles}>
      <label className='block text-white mb-1'>
        {label.split(/(전화번호 마지막 4자리|학번)/).map((part, index) => (
          <span
            key={index}
            className={highlightLabels.includes(part) ? 'text-[#00B493]' : ''}
          >
            {part}
          </span>
        ))}
        {required && <span className='text-[#C11100] pl-1'>*</span>}
      </label>

      {subLabel && (
        <p className='pb-[10px] font-pretendardRegular'>
          {subLabel.split(/(대면으로|ex|0542)/).map((part, index) => (
            <span
              key={index}
              className={
                part === '대면으로'
                  ? 'text-red-500'
                  : part === 'ex'
                    ? 'text-[#A5A5A5]'
                    : part === '0542'
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
        <select
          name={name}
          value={value as string}
          onChange={onChange}
          required={required}
          className={baseInputStyles}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          name={name}
          value={value as string}
          onChange={handleTextAreaChange}
          onKeyDown={onKeyDown}
          required={required}
          placeholder={placeholder}
          className={
            baseInputStyles + ' overflow-scroll [&::-webkit-scrollbar]:hidden'
          }
          rows={4}
        />
      ) : type === 'checkbox' ? (
        <div className='flex items-center space-x-3'>
          <input
            type='checkbox'
            id={name}
            name={name}
            checked={checked ?? (value as boolean)}
            onChange={onChange}
            required={required}
            className={inputStyles}
          />
          {/* 라벨 클릭 시에도 체크되도록 htmlFor 추가 */}
          <label htmlFor={name} className='text-white cursor-pointer select-none'>
            {checkboxLabel}
          </label>
        </div>
      ) : (
        <input
          type={type}
          name={name}
          value={value as string}
          onChange={onChange}
          onKeyDown={onKeyDown}
          minLength={minLength}
          maxLength={maxLength}
          required={required}
          placeholder={placeholder}
          className={baseInputStyles}
        />
      )}
    </div>
  )
}