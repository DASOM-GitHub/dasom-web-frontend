import React from 'react'
import MobileLayout from '../components/layout/MobileLayout'

const Login: React.FC = () => {
    return (
        <MobileLayout>
            <div className='h-screen flex flex-col items-center justify-center'>
                <div className='font-pretendardBlack text-mainColor text-2xl mb-[32px]'>
                    DASOM
                </div>
                <div className='w-full text-[12px] flex flex-col items-center font-pretendardRegular'>
                    <input type='text' className='bg-subGrey h-[32px] w-[80%] rounded-[6px] mb-[16px] pl-[12px]' placeholder='Email' />
                    <input type='password' className='bg-subGrey h-[32px] w-[80%] rounded-[6px] mb-[16px] pl-[12px]' placeholder='Password' />
                    <div className='cursor-pointer bg-mainColor h-[32px] w-[80%] rounded-[6px] font-pretendardBold tracking-[1px] text-white flex justify-center items-center hover:bg-[#00A889]'>
                        로그인
                    </div>
                </div>
            </div>
        </MobileLayout>
    )
}

export default Login