'use client';

import bg from '@/public/assets/bg-onboarding-form.svg';
import { useRouter } from 'next/navigation';
import React from 'react';

function OnBoardForm() {
  const router = useRouter();

  const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null;

  React.useEffect(() => {
    const localToken = localStorage.getItem('token');
    const localUsername = localStorage.getItem('username');

    if (!localToken && !localUsername) {
      const urlParams = new URLSearchParams(window.location.search);
      const tokenFromURL = urlParams.get('token');
      const username = urlParams.get('username') ? decodeURIComponent(urlParams.get('username') as string) : '';

      if (tokenFromURL && username) {
        localStorage.setItem('token', tokenFromURL);
        localStorage.setItem('username', username);
      }
    }
  }, [username]);

  return (
    <main className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bg.src})` }}>
      <div className="flex flex-col gap-[33px] items-center justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center font-normal text-black">
          <h1 className="text-6xl">
            Hai, <strong className="capitalize">{username ? username.replace(/_/g, ' ') : ''}</strong>
          </h1>
          <h3 className="text-xl text-center">Ayo Jawab pertanyaan ini dulu yuk!</h3>
        </div>
        <span
          className="underline text-xl font-bold cursor-pointer"
          onClick={() => {
            router.push('on-board-form/form-account');
          }}
        >
          Tekan Lanjut
        </span>
      </div>
    </main>
  );
}

export default OnBoardForm;
