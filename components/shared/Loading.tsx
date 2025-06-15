import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export const Loading = () => {
    return (
        <div className='flex flex-col items-center justify-center relative'>
            <DotLottieReact
                src="https://lottie.host/275ed865-4d23-4ad5-a5de-931a13249658/KgWfK5w7kO.lottie"
                loop
                autoplay
            />
            <span className='text-bold text-xl text-white absolute bottom-0 text-center'>Sedang Memuat...</span>
        </div>
    )
}
