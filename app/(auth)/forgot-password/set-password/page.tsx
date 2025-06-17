'use client';

import bg from '@/public/assets/bg-login_register.jpg';
import Image from 'next/image';
import { IoIosLock } from "react-icons/io";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLoading } from '@/context/LoadingContext';
import * as API_AUTH from '@/service/apiAuth';
import { toast } from 'sonner';

function SetPassword() {
    const navigate = useRouter();
    const { setLoading } = useLoading();
    const [email, setEmail] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setEmail(localStorage.getItem("email") || '');
        }
    }, []);

    const handleSetPassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);

        const query = {
            email: email,
            newPassword: newPassword,
            confirmPassword: confirmNewPassword
        };
        await API_AUTH.ChangePassword(query)
            .then((res: any) => {
                toast.success(res.data.message)
                navigate.push("/forgot-password/set-password/success");
                setLoading(false);
                localStorage.removeItem("email");
            })
            .catch((err) => {
                toast.error(err.response.data.message)
                setLoading(false);
            }).finally(() => {
                setLoading(false);
            })
    };

    const handleAddPassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setLoading(true);

      const query = {
        newPassword: newPassword,
        confirmPassword: confirmNewPassword,
      };
      await API_AUTH.addPassword(query)
        .then((res: any) => {
          toast.success(res.data.message);
          navigate.push('/forgot-password/set-password/success');
          setLoading(false);
          localStorage.removeItem('email');
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    useEffect(() => {
      const localToken = localStorage.getItem('token');

      if (!localToken) {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromURL = urlParams.get('token');

        if (tokenFromURL) {
          localStorage.setItem('token', tokenFromURL);
        }
      }
    }, []);
    

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
                                <h1 className='font-bold text-4xl text-third'>Atur Kata Sandi Baru</h1>
                                <p className='text-base text-center font-normal text-third opacity-50 w-3/4'>
                                    Buat Kata Sandi baru - pastikan berbeda dari Kata Sandi lama
                                </p>
                            </div>
                            <div className='flex flex-col items-start justify-start w-3/4 gap-1 mt-6'>
                                <span className="font-normal text-base text-third">Buat Kata Sandi Baru</span>
                                <Input
                                    type="text"
                                    placeholder="Masukkan Kata Sandi Baru"
                                    className="border border-[#4C572D] w-full text-sm py-6"
                                    onChange={(e) => { setNewPassword(e.target.value) }}
                                />
                            </div>
                            <div className='flex flex-col items-start justify-start w-3/4 gap-1 mt-6'>
                                <span className="font-normal text-base text-third">Konfirmasi Kata Sandi Baru</span>
                                <Input
                                    type="text"
                                    placeholder="Masukkan Kata Sandi Baru Lagi"
                                    className="border border-[#4C572D] w-full text-sm py-6 mb-4"
                                    onChange={(e) => { setConfirmNewPassword(e.target.value) }}
                                />
                            </div>
                            <Button
                                className="w-3/4 py-6 bg-[#AFCB6B] font-semibold text-lg mt-6"
                                onClick={(e) => {
                                    if (email) {
                                        handleSetPassword(e);
                                    } else {
                                        handleAddPassword(e);
                                    }
                                }}
                            >
                                Perbarui Kata Sandi
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


export default SetPassword;