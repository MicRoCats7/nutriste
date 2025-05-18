import React from 'react'
import bg from '@/public/assets/bg-login_register.jpg'
import Image from 'next/image'
import { IoPersonCircleSharp } from "react-icons/io5";

function Login() {
    return (
        <main
            className="min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${bg.src})` }}
        >
            <div className='flex flex-col gap-[33px] items-center justify-center min-h-screen'>
                <div>
                    <div className='flex flex-col gap-2 items-center'>
                        <IoPersonCircleSharp size={116} color='795548' />
                        <span className='font-bold text-4xl text-[#795548]'>Masuk</span>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login
