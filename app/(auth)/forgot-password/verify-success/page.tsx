"use client";

import bg from '@/public/assets/bg-login_register.jpg';
import Image from 'next/image';
import { IoIosLock } from "react-icons/io";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function VerifySuccess() {
    const navigate = useRouter();

    return (
        <main className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bg.src})` }}>
            <div className="flex flex-col gap-[33px] items-center justify-center min-h-screen py-10">
                <div className="max-w-[1100px] mx-auto">
                    <div className="bg-[#F1FFE0] w-full flex items-center justify-center gap-10 rounded-[80px] shadow-lg">
                        <div className="flex flex-col items-center justify-center w-full max-w-[900px] py-10 pl-10">
                            <div className="flex flex-col gap-2 items-center">
                                <IoIosLock color='795548' size={80} />
                            </div>
                            <div className='flex items-center flex-col justify-center w-full mt-6'>
                                <h1 className='font-bold text-4xl text-third'>Berhasil!</h1>
                                <p className='text-base text-center font-normal text-third opacity-50 w-3/4'>
                                    Kata Sandi akun anda berhasil diubah,
                                    tekan tombol <strong>Konfirmasi</strong> untuk mengatur
                                    Kata Sandi baru anda!
                                </p>
                            </div>
                            <Button
                                className="w-full py-6 bg-[#AFCB6B] font-semibold text-lg mt-6"
                                onClick={() => navigate.push('/forgot-password/set-password')}
                            >
                                Konfirmasi
                            </Button>
                        </div>
                        <div className="w-full">
                            <Image src="/assets/kotak-register-login.svg" alt="Kotak Register Login" width={970} height={970} draggable={false} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default VerifySuccess