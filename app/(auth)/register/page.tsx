'use client';

import React, { useState } from 'react';
import bg from '@/public/assets/bg-login_register.jpg';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import * as API_AUTH from '@/service/apiAuth';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { useLoading } from '@/context/LoadingContext';

function Register() {
    const { setLoading } = useLoading();
    const navigate = useRouter();
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const query = {
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        };
        await API_AUTH.Register(query)
            .then((res: any) => {
                toast.success(res.data.message)
                navigate.push("/verify")
                localStorage.setItem("email", res.data.savedUser.email);
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
                        <div className="flex flex-col items-center justify-center w-full max-w-[900px] py-10 pl-10">
                            <div className="flex flex-col gap-2 items-center">
                                <span className="font-bold text-4xl text-third">Buat Akun</span>
                                <p className="font-normal font-base text-third opacity-50">Selamat Datang - Ayo buat akun dulu!</p>
                            </div>
                            <form className="flex flex-col mt-6 w-full" onSubmit={handleRegister}>
                                <span className="font-normal text-base text-third mb-2">Nama Pengguna (Username)</span>
                                <Input
                                    type="text"
                                    placeholder="Masukkan Nama Pengguna (Username)"
                                    className="border border-[#4C572D] w-full text-sm py-6 mb-4"
                                    onChange={(e) => { setUsername(e.target.value) }}
                                />
                                <span className="font-normal text-base text-third mb-2">E-mail</span>
                                <Input
                                    type="email"
                                    placeholder="Masukkan E-mail"
                                    className="border border-[#4C572D] w-full text-sm py-6 mb-4"
                                    onChange={(e) => { setEmail(e.target.value) }}
                                />
                                <span className="font-normal text-base text-third mb-2">Buat Kata Sandi</span>
                                <Input
                                    type="password"
                                    placeholder="Buat Kata Sandi"
                                    className="border border-[#4C572D] w-full text-sm py-6 mb-4"
                                    onChange={(e) => { setPassword(e.target.value) }}
                                />
                                <span className="font-normal text-base text-third mb-2">Konfirmasi Kata Sandi</span>
                                <Input
                                    type="password"
                                    placeholder="Konfirmasi Kata Sandi"
                                    className="border border-[#4C572D] w-full text-sm py-6 mb-4"
                                    onChange={(e) => { setConfirmPassword(e.target.value) }}
                                />
                                <Button
                                    type='submit'
                                    className="w-full rounded-[13px] font-medium text-white bg-main py-6"
                                >
                                    Daftar
                                </Button>
                                <div className="flex items-center gap-10 w-[40%] my-5">
                                    <Separator className="my-4" />
                                    <span>atau</span>
                                    <Separator className="my-4" />
                                </div>
                            </form>
                            <Button className="w-full rounded-[13px] font-medium text-black bg-white py-6 border border-[#4C572D]">
                                <FcGoogle size={35} />
                                Masuk dengan Google
                            </Button>
                            <span className="text-sm text-center mt-5 font-normal text-black">
                                Sudah punya akun?{' '}
                                <strong className="cursor-pointer" onClick={() => navigate.push('/login')}>
                                    Masuk
                                </strong>
                            </span>
                        </div>
                        <div className="w-full">
                            <Image src="assets/kotak-register-login.svg" alt="Kotak Register Login" width={970} height={970} draggable={false} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}


export default Register;
