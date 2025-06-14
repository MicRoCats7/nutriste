"use client";

import bg from '@/public/assets/bg-onboarding-form.svg';
import { useRouter } from 'next/navigation';
import React from 'react'

function OnBoardForm() {
  const navigate = useRouter();

  return (
    <main className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bg.src})` }}>
      <div className="flex flex-col gap-[33px] items-center justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center font-normal text-black">
          <h1 className='text-6xl'>Hai, <strong>Amri</strong></h1>
          <h3 className="text-xl text-center">Ayo Jawab pertanyaan ini dulu yuk!</h3>
        </div>
        <span
          className='underline text-xl font-bold cursor-pointer'
          onClick={() => {
            navigate.push('on-board-form/form-account');
          }}
        >
          Tekan Lanjut
        </span>
      </div>
    </main>
  )
}

export default OnBoardForm