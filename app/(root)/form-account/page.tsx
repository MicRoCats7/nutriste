import { Separator } from '@/components/ui/separator';
import React from 'react';

function FormAccount() {
  return (
    <main className="min-h-screen bg-[#EAFFE4]">
      <div className="flex flex-col gap-[33px] items-center justify-center min-h-screen py-10">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-6 gap-4 mb-10">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center gap-2 cursor-pointer">
                <span
                    style={{
                        color: idx === 0 ? '#000' : '#666',
                    }}
                    className='text-2xl font-bold'
                >
                    {idx + 1}
                </span>
                {idx === 0 && <Separator className="my-2 py-0.5 bg-fourth" />}
                {idx > 0 && <Separator className="py-0.5 bg-gray-500" />}
              </div>
            ))}
          </div>
          <div className="bg-[#F1FFE0] w-full flex items-center justify-center gap-10 rounded-[80px] shadow-lg">
            <div className="flex flex-col items-center justify-center w-full max-w-[1100px] py-10 pl-10">
              <div className="flex flex-col gap-2 items-center">
                <span className="font-bold text-4xl text-third">Buat Akun</span>
                <p className="font-normal font-base text-third opacity-50">Selamat Datang - Ayo buat akun dulu!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default FormAccount;
