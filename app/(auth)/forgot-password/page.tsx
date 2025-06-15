'use client';

import bg from '@/public/assets/bg-login_register.jpg';
import Image from 'next/image';
import { IoIosLock } from "react-icons/io";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useLoading } from '@/context/LoadingContext';
import { useState } from 'react';
import * as API_AUTH from '@/service/apiAuth';
import { toast } from 'sonner';

function ForgotPassword() {
    const navigate = useRouter();
    const { setLoading } = useLoading();
    const [email, setEmail] = useState<string>('');

    const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);

        const query = {
            email: email
        };
        await API_AUTH.ForgotPassword(query)
            .then((res: any) => {
                toast.success(res.data.message)
                navigate.push("/forgot-password/verify")
                setLoading(false);
                localStorage.setItem("email", email);
            })
            .catch((err) => {
                toast.error(err.response.data.message)
                setLoading(false);
            }).finally(() => {
                setLoading(false);
            })
    };

    return (
        <main className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bg.src})` }}>
            <div className="flex flex-col gap-[33px] items-center justify-center min-h-screen py-10">
                <div className="max-w-[1000px] mx-auto">
                    <div className="bg-[#F1FFE0] w-full flex items-center justify-center gap-10 rounded-[80px] shadow-lg">
                        <div className="flex flex-col items-center justify-center w-full max-w-[900px] py-10 pl-10">
                            <div className="flex flex-col gap-2 items-center">
                                <IoIosLock color='795548' size={80} />
                            </div>
                            <div className='flex items-center flex-col justify-center w-full mt-6'>
                                <h1 className='font-bold text-4xl text-third'>Lupa Kata Sandi</h1>
                                <p className='text-sm text-center font-normal text-third opacity-50 w-3/4'>
                                    Verifikasi E-mail untuk mengatur ulang kata sandi. Silahkan masukkan E-mail yang terdaftar pada akunmu.
                                </p>
                            </div>
                            <div className='flex flex-col items-start justify-start w-3/4 gap-1 mt-6'>
                                <span className="font-normal text-base text-third">Masukkan E-mail</span>
                                <Input
                                    type="email"
                                    placeholder="Masukkan E-mail"
                                    className="border border-[#4C572D] w-full text-sm py-6 mb-4"
                                    onChange={(e) => { setEmail(e.target.value) }}
                                />
                            </div>
                            <Button
                                className="w-3/4 py-6 bg-[#AFCB6B] font-semibold text-lg mt-6"
                                onClick={(e) => handleRegister(e)}
                            >
                                Verifikasi E-mail
                            </Button>
                        </div>
                        <div className="w-full">
                            <Image src="/assets/kotak-register-login.svg" alt="Kotak Register Login" width={970} height={970} draggable={false} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}


export default ForgotPassword;
