import React from 'react';
import bg from '@/public/assets/bg-login_register.jpg';
import Image from 'next/image';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@/components/ui/button';

function Login() {
  return (
    <main className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bg.src})` }}>
      <div className="flex flex-col gap-[33px] items-center justify-center min-h-screen">
        <div className="bg-[#F1FFE0] w-full max-w-[1100px] flex items-center justify-center rounded-[71px] shadow-lg">
          <div className="flex flex-col items-center justify-center w-full px-20">
            <div className="flex flex-col gap-2 items-center">
              <IoPersonCircleSharp size={90} color="795548" />
              <span className="font-bold text-4xl text-third">Masuk</span>
              <p className="font-normal font-base text-third opacity-50">Selamat Datang - kita bertemu lagi!</p>
            </div>
            <form className="flex flex-col gap-4 mt-6 w-full">
              <span className="font-normal text-base text-third">Nama Pengguna (Username)/E-mail</span>
              <input type="email" placeholder="Masukkan Nama Pengguna (Username)/E-mail" className="p-4 border border-[#4C572D] rounded-[13px] w-full text-sm" />
              <span className="font-normal text-base text-third">Kata Sandi</span>
              <input type="password" placeholder="Kata Sandi" className="p-4 border border-[#4C572D] rounded-[13px] w-full text-sm" />
              <span className="text-xs text-end font-semibold text-[#CC722E] cursor-pointer">Lupa Kata Sandi?</span>
              <Button className="w-full rounded-[13px] font-medium text-white bg-main py-6">Masuk</Button>
              <div className="flex items-center gap-10 w-[36%]">
                <Separator className="my-4" />
                <span>atau</span>
                <Separator className="my-4" />
              </div>
              <Button className="w-full rounded-[13px] font-medium text-black bg-white py-6 border border-[#4C572D]">
                <FcGoogle size={35} />
                Masuk dengan Google
              </Button>
              <span className="text-sm text-center font-normal text-black">
                Belum punya akun? <strong className="cursor-pointer">Daftar</strong>
              </span>
            </form>
          </div>
          <Image src="assets/kotak-register-login.svg" alt="Kotak Register Login" width={510} height={510} draggable={false} />
        </div>
      </div>
    </main>
  );
}

export default Login;
