import React from 'react'

interface InputFieldProps {
  label: string
  name: string
  subLabel?: string
  type?: 'text' | 'email' | 'textarea' | 'select' | 'checkbox'
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
  checkboxLabel?: string
  phoneNumber?: boolean
  value: string | boolean
  checked?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  highlightLabels?: string[]
}


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
  checked,
  onChange,
  onKeyDown,
  highlightLabels = ['전화번호 마지막 4자리', '학번']
}) => {

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto'
    e.target.style.height = `${e.target.scrollHeight}px`
    onChange(e)
  }

  const containerStyles = 'mb-4 p-3 shadow-[0px_2px_3px_rgba(255,255,255,0.2)] text-white text-[12px]'
  const baseInputStyles = 'w-full bg-mainBlack border-b border-white p-2 focus:outline-none text-[10px]'
  const inputStyles = 'w-4 h-4 bg-mainBlack border border-white focus:ring-white border-2 rounded-[3px] appearance-none checked:bg-white checked:border-white'

  return (
    <div className={containerStyles}>
      <label className="block text-white mb-1">
        {label.split(/(전화번호 마지막 4자리|학번)/).map((part, index) => (
          <span key={index} className={highlightLabels.includes(part) ? 'text-[#00B493]' : ''}>
            {part}
          </span>
        ))}
        {required && <span className="text-[#C11100] pl-1">*</span>}
      </label>

      {subLabel && (
        <p className="pb-[10px] font-pretendardRegular">
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
        <select name={name} value={value as string} onChange={onChange} required={required} className={baseInputStyles}>
          {options.map((option) => (
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
          className={baseInputStyles + ' overflow-scroll [&::-webkit-scrollbar]:hidden'}
          rows={4}
        />

      ) : type === 'checkbox' ? (
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name={name}
            checked={checked ?? (value as boolean)}
            onChange={onChange}
            required={required}
            className={inputStyles}
          />
          <span className="text-white">{checkboxLabel}</span>
        </div>

      ) : (
        <input
          type={type}
          name={name}
          value={value as string}
          onChange={onChange}
          onKeyDown={onKeyDown}
          required={required}
          placeholder={placeholder}
          className={baseInputStyles}
        />
      )}
    </div>
  )
}
