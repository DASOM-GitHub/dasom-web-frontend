import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NewsFileUpload from '../../components/UI/NewsFileUpload'
import NewsTextEditor from '../../components/UI/NewsTextEditor'
import { createNews, uploadNewsFiles } from './adminService'

const ManNewsPost: React.FC = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.')
      return
    }
    try {
      const newsId = await createNews(title, content.replace(/\n/g, '<br />'))
      await uploadNewsFiles(newsId, files)

      alert('새 소식이 성공적으로 등록되었습니다.')
      navigate('/admin/news')
    } catch (error: any) {
      const errorCode = error.response?.data?.code
      if (errorCode === 'C028') {
        alert('파일 인코딩에 실패하였습니다.')
      } else {
        console.error('소식 등록 오류:', error)
        alert('소식 등록 중 오류가 발생했습니다.')
      }
    }
  }

  // 입력된 텍스트 높이만큼 textarea 높이 조정
  const autoResizeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  return (
    <div className='h-[100vh] w-[100vw] bg-mainBlack font-pretendardRegular text-white flex flex-col items-center overflow-auto'>
      <div className='flex justify-between w-[1220px] mt-[155px] mb-[12px] font-pretendardSemiBold'>
        <div className='text-[20px]'>소식 작성</div>
        <button
          onClick={handleSubmit}
          className='bg-mainColor text-white px-4 py-1 rounded-[6px] hover:bg-teal-700'
        >
          저장
        </button>
      </div>

      <div className='flex flex-col w-[1220px]'>
        {/* 제목 및 내용 텍스트 편집 */}
        <NewsTextEditor
          title={title}
          content={content}
          setTitle={setTitle}
          setContent={setContent}
        />

        <NewsFileUpload files={files} setFiles={setFiles} />
      </div>
    </div>
  )
}

export default ManNewsPost
