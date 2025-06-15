'use client';

import React from 'react';
import bg from '@/public/assets/bg-onboarding.jpg';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function OnBoard() {
  const navigate = useRouter();

  return (
    <main className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bg.src})` }}>
      <div className="flex flex-col gap-[33px] items-center justify-center min-h-screen">
        <Image className="dark:invert" src="/logo-nutriste.svg" alt="Nutriste logo" width={920} height={216} priority draggable={false} />
        <h3 className="font-dm-serif text-2xl text-center text-[#767948]">“Solusi Tepat untuk Hidup yang lebih panjang”</h3>
        <div className="flex flex-row gap-9">
          <Button
            className="w-[251px] h-[50px] font-libre-baskerville font-bold text-[29px] text-[#4C572D] bg-[#EBFFDE] py-3 border border-main"
            onClick={() => {
              navigate.push('/login');
            }}
          >
            Masuk
          </Button>
          <Button
            className="w-[251px] h-[50px] font-libre-baskerville font-bold text-[29px] text-second bg-main py-3"
            onClick={() => {
              navigate.push('/register');
            }}
          >
            Buat akun
          </Button>
        </div>
      </div>
    </main>
  );
}

export default OnBoard;
