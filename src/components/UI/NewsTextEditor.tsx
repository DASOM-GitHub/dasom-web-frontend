import React from 'react'

interface TextEditorProps {
  title: string
  content: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  setContent: React.Dispatch<React.SetStateAction<string>>
}

const NewsTextEditor: React.FC<TextEditorProps> = ({
  title,
  content,
  setTitle,
  setContent,
}) => {
  const autoResizeTextarea = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.target as HTMLTextAreaElement
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  const applyFormat = (tag: string, style?: string) => {
    const formattedText = style
      ? `<span style='${style}'></span>`
      : `<${tag}></${tag}>`

    setContent(prev => prev + formattedText)
  }

  return (
    <div className='w-[1220px] font-pretendardRegular'>
      <label className='block mb-2'>제목</label>
      <textarea
        className='text-black w-full p-2 border rounded-[6px] mb-4'
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder='제목을 입력하세요'
      />

      <div className='flex justify-between w-[1220px]'>
        <div className='w-[600px]'>
          <label className='block mb-2'>내용</label>
          <textarea
            className='text-black w-full p-2 border rounded-[6px] mb-4'
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder='내용을 입력하세요'
            onInput={autoResizeTextarea}
          />
          <div className='text-black mb-4 space-x-2'>
            <button
              onClick={() => applyFormat('b')}
              className='bg-gray-200 px-2 py-1 rounded-[6px]'
            >
              굵게
            </button>
            <button
              onClick={() => applyFormat('span', 'color:#00B493')}
              className='bg-gray-200 text-mainColor px-2 py-1 rounded-[6px]'
            >
              다솜색(#00B493)
            </button>
          </div>
        </div>

        {/* 미리보기 화면 */}
        <div className='mb-[20px] w-[600px]'>
          <div className='block mb-2'>미리보기</div>
          <div
            className='text-white p-4 border rounded-[6px] bg-gray-800 break-words'
            dangerouslySetInnerHTML={{
              __html: content.replace(/\n/g, '<br />'), // <br />로 줄바꿈 처리
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default NewsTextEditor
