import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const ManNewsPost: React.FC = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [images, setImages] = useState<string[]>([])
    const navigate = useNavigate()

    // 본문 내용 담기
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value)
    }

    // 굵게, 다솜색 처리
    const applyFormat = (tag: string, style?: string) => {
        const formattedText = style
            ? `<span style='${style}'></span>`
            : `<${tag}></${tag}>`

        setContent((prev) => prev + formattedText)
    }

    // FileReader로 이미지 인코딩
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        const files = Array.from(e.target.files)
    
        const imagePromises = files.map((file) => {
            return new Promise<string>((resolve, reject) => {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onloadend = () => resolve(reader.result as string)
                reader.onerror = reject
            })
        })
    
        Promise.all(imagePromises).then((imageUrls) => {
            setImages((prevImages) => [...prevImages, ...imageUrls])
        })
    }

    // 저장 버튼
    const handleSubmit = async () => {
        try {
            const formattedContent = content.replace(/\n/g, '<br />') // 본문 내용 중 enter br태그로 바꿈
            const token = localStorage.getItem('accessToken')

            const payload = {
                title,
                content: formattedContent,
                imageUrls: images, // Base64로..... 인코딩된 이미지
            }
    
            console.log('전송 데이터:', payload)
    
            await axios.post('https://dmu-dasom.or.kr/api/news', payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })

            alert('새 소식이 성공적으로 저장되었습니다.')
            navigate('/admin/news') // 소식 목록으로 돌아가기
        } catch (error: any) {
            console.error('소식 저장 오류:', error)
            alert('소식 저장 중 오류가 발생했습니다.')

            const errorCode = error.response?.data?.code
            if (errorCode === 'E003') {
                console.log('소식 저장 중 오류: 유효하지 않은 입력입니다.')
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
            <div className='flex justify-between w-[1220px] mt-[155px] mb-[12px]'>
                <div className='text-[20px]'>소식 작성</div>
                <button
                    onClick={handleSubmit}
                    className='bg-mainColor text-white px-4 py-1 rounded-[6px] hover:bg-teal-700'
                >
                    저장
                </button>
            </div>
            
            <div className='flex flex-col w-[1220px]'>
                <label className='block mb-2'>제목</label>
                <textarea
                    className='text-black w-full p-2 border rounded-[6px] mb-4'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='제목을 입력하세요'
                />
                
                
                <div className='flex justify-between w-[1220px]'>
                    <div className='w-[600px]'>
                        <label className='block mb-2'>내용</label>
                        <textarea
                            className='text-black w-full p-2 border rounded-[6px] mb-2'
                            value={content}
                            onChange={handleContentChange}
                            placeholder='내용을 입력하세요'
                            onInput={autoResizeTextarea}
                        />
                        
                        <div className='text-black mb-4 space-x-2'>
                            <button onClick={() => applyFormat('b')} className='bg-gray-200 px-2 py-1 rounded-[6px]'>굵게</button>
                            <button onClick={() => applyFormat('span', 'color:#00B493')} className='bg-gray-200 text-mainColor px-2 py-1 rounded-[6px]'>다솜색(#00B493)</button>
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

                <label className='block mt-4 mb-1'>이미지 첨부</label>
                <input
                    type='file'
                    multiple
                    onChange={handleImageChange}
                    className='mb-8'
                />
            </div>
        </div>
    )
}

export default ManNewsPost
