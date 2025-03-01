import React from 'react'

interface FileUploadProps {
    files: File[]
    setFiles: React.Dispatch<React.SetStateAction<File[]>>
}

const NewsFileUpload: React.FC<FileUploadProps> = ({ files, setFiles }) => {
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files)
            setFiles((prevFiles) => [...prevFiles, ...selectedFiles])
        }
    }

    const handleFileRemove = (index: number) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
    }

    return (
        <div className='mb-16'>
            <label className='block mt-4 mb-1'>이미지 첨부</label>
            <input
                type='file'
                multiple
                onChange={handleImageChange}
                className='mb-3'
            />

            <div className='mb-4'>
                <div className='mb-2'>업로드 된 파일 목록</div>
                {Array.isArray(files) && files.length > 0 ? ( 
                    files.map((file, index) => (
                        <div key={index} className='text-white cursor-pointer' onClick={() => handleFileRemove(index)}>
                            {file.name}
                        </div>
                    ))
                ) : (
                    <div className='text-[14px]'>새로 업로드된 파일이 없습니다.</div>
                )}
            </div>
        </div>
    )
}

export default NewsFileUpload