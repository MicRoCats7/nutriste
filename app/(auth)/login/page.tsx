'use client';

import React, { useState } from 'react';
import bg from '@/public/assets/bg-login_register.jpg';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useLoading } from '@/context/LoadingContext';
import * as API_AUTH from '@/service/apiAuth';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

function Login() {
  const navigate = useRouter();
  const { setLoading } = useLoading();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const query = {
      input: email,
      password: password,
    };
    await API_AUTH.Login(query)
      .then((res: any) => {
        const isFilled = res.data.user.isFilled;

        toast.success(res.data.message)
        if (isFilled === false) {
          navigate.push("/on-board-form");
        } else {
          navigate.push("/menu-utama")
        }
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.user.username);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message)
        setLoading(false);
      });
  };

  return (
    <main className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bg.src})` }}>
      <div className="flex flex-col gap-[33px] items-center justify-center min-h-screen py-10">
        <div className="max-w-[1440px] mx-auto">
          <div className="bg-[#F1FFE0] w-full flex items-center justify-center gap-10 rounded-[80px] shadow-lg">
            <div className="flex flex-col items-center justify-center w-full max-w-[1100px] pl-10">
              <div className="flex flex-col gap-2 items-center">
                <span className="font-bold text-4xl text-third">Masuk</span>
                <p className="font-normal font-base text-third opacity-50">Selamat Datang - kita bertemu lagi!</p>
              </div>
              <form className="flex flex-col gap-4 mt-6 w-full" onSubmit={handleLogin}>
                <span className="font-normal text-base text-third">Nama Pengguna (Username)/E-mail</span>
                <Input
                  type="text"
                  placeholder="Masukkan Username/E-mail"
                  className="border border-[#4C572D] w-full text-sm py-6 mb-4"
                  onChange={(e) => { setEmail(e.target.value) }}
                />
                <span className="font-normal text-base text-third">Kata Sandi</span>
                <Input
                  type="password"
                  placeholder="Kata Sandi"
                  className="border border-[#4C572D] w-full text-sm py-6 mb-4"
                  onChange={(e) => { setPassword(e.target.value) }}
                />
                <span
                  className="text-xs text-end font-semibold text-[#CC722E] cursor-pointer"
                  onClick={() => navigate.push('/forgot-password')}
                >
                  Lupa Kata Sandi?
                </span>
                <Button className="w-full rounded-[13px] font-medium text-white bg-main py-6">Masuk</Button>
                <div className="flex items-center gap-10 w-[40%]">
                  <Separator className="my-4" />
                  <span>atau</span>
                  <Separator className="my-4" />
                </div>
                <Button className="w-full rounded-[13px] font-medium text-black bg-white py-6 border border-[#4C572D]">
                  <FcGoogle size={35} />
                  Masuk dengan Google
                </Button>
                <span className="text-sm text-center mt-5 font-normal text-black">
                  Belum punya akun?{' '}
                  <strong className="cursor-pointer" onClick={() => navigate.push('/register')}>
                    Daftar
                  </strong>
                </span>
              </form>
            </div>
            <div className="w-full">
              <Image src="assets/kotak-register-login.svg" alt="Kotak Register Login" width={900} height={900} draggable={false} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
