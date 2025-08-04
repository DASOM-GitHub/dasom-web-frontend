import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import NewsFileUpload from '../../components/UI/NewsFileUpload'
import NewsTextEditor from '../../components/UI/NewsTextEditor'

interface Image {
  id: number
  fileFormat: string
  encodedData: string
}

interface News {
  id: string
  title: string
  content: string
  createdAt: string
  images: Image[]
}

const ManNewsEdit: React.FC = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [images, setImages] = useState<Image[]>([]) // 기존 업로드된 파일들
  const [files, setFiles] = useState<File[]>([]) // 새로 첨부된 파일들
  const [deleteImageIds, setDeleteImageIds] = useState<number[]>([])
  const { no } = useParams<{ no: string }>()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get<News>(
          `https://dmu-dasom-api.or.kr/api/news/${no}`
        )
        const { title, content, images } = response.data
        setTitle(title)
        setContent(content)
        setImages(images)
      } catch (error) {
        console.error('소식 불러오기 오류:', error)
        alert('소식을 불러오는 중 오류가 발생했습니다.')
      }
    }

    if (no) fetchNews()
  }, [no])

  // 이미지 삭제 목록에 추가 (기존 업로드된 파일 목록에서)
  const handleImageDelete = (imageId: number) => {
    setDeleteImageIds(prev => [...prev, imageId])
    setImages(prevImages => prevImages.filter(image => image.id !== imageId))
  }

  // 수정 완료 버튼
  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.')
      return
    }

    try {
      const token = localStorage.getItem('accessToken')

      // 뉴스 수정 요청
      const updateResponse = await axios.put(
        `https://dmu-dasom-api.or.kr/api/news/${no}`,
        {
          title,
          content: content.replace(/\n/g, '<br />'),
          deleteImageIds,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      console.log({
        title,
        content: content.replace(/\n/g, '<br />'),
        deleteImageIds,
      })

      const newsId = updateResponse.data.id

      // 새로 첨부된 파일들 업로드
      const formData = new FormData()
      files.forEach(file => formData.append('files', file))
      formData.append('fileType', 'NEWS')
      formData.append('targetId', newsId)

      if (files.length > 0) {
        // 첨부된 파일이 있을 때만 업로드
        await axios.post(
          'https://dmu-dasom-api.or.kr/api/files/upload',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        )
      }
      alert('소식이 성공적으로 수정되었습니다.')
      navigate(`/admin/news/${no}`)
    } catch (error) {
      console.error('소식 수정 오류:', error)
      alert('소식 수정 중 오류가 발생했습니다.')
    }
  }

  return (
    <div className='h-[100vh] w-[100vw] bg-mainBlack font-pretendardRegular text-white flex flex-col items-center overflow-auto'>
      <div className='flex justify-between w-[1220px] mt-[155px] mb-[12px] font-pretendardSemiBold'>
        <div className='text-[20px]'>소식 수정</div>
        <button
          onClick={handleSubmit}
          className='bg-mainColor text-white px-4 py-1 rounded-[6px] hover:bg-teal-700'
        >
          수정 완료
        </button>
      </div>

      <div className='flex flex-col w-[1220px]'>
        {/* 제목 및 내용텍스트 편집 */}
        <NewsTextEditor
          title={title}
          content={content}
          setTitle={setTitle}
          setContent={setContent}
        />

        <div className='mt-8 mb-4'>
          <div className='mb-2'>기존 업로드 파일 목록</div>
          {Array.isArray(images) && images.length > 0 ? ( // 이미지가 있을 때만 렌더링
            images.map(image => (
              <div key={image.id} className='flex items-center'>
                <img
                  src={`data:${image.fileFormat};base64,${image.encodedData}`}
                  alt={`image-${image.id}`}
                  className='w-24 h-auto object-cover'
                />
                <button
                  onClick={() => handleImageDelete(image.id)}
                  className='ml-2 text-red-500'
                >
                  삭제
                </button>
              </div>
            ))
          ) : (
            <div className='text-[14px]'>업로드된 파일이 없습니다.</div>
          )}
        </div>

        <NewsFileUpload files={files} setFiles={setFiles} />
      </div>
    </div>
  )
}

export default ManNewsEdit
