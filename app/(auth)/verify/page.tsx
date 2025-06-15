'use client';

import { useEffect, useState } from 'react';
import bg from '@/public/assets/bg-login_register.jpg';
import Image from 'next/image';
import { IoIosLock } from "react-icons/io";
import { InputOTPForm } from '@/components/shared/InputOtpForm';
import { useRouter } from 'next/navigation';
import { useLoading } from '@/context/LoadingContext';
import * as API_AUTH from '@/service/apiAuth';
import { toast } from 'sonner';

const EXPIRED_KEY = 'otp_expire_at';
const OTP_DURATION = 60 * 1000;

function Verify() {
    const email = typeof window !== 'undefined' ? localStorage.getItem("email") : null;
    const [timer, setTimer] = useState(0);
    const { setLoading } = useLoading();

    const handleResendEmail = async () => {
        setLoading(true);

        const query = {
            email: email
        };
        await API_AUTH.ResendOtp(query)
            .then((res: any) => {
                toast.success(res.data.message)
                setLoading(false);
            })
            .catch((err) => {
                toast.error(err.response.data.message)
                setLoading(false);
            }).finally(() => {
                setLoading(false);
            })
    }

    useEffect(() => {
        const now = Date.now();
        const savedExpire = localStorage.getItem(EXPIRED_KEY);

        if (savedExpire) {
            const remaining = Math.floor((parseInt(savedExpire) - now) / 1000);
            if (remaining > 0) {
                setTimer(remaining);
            } else {
                localStorage.removeItem(EXPIRED_KEY);
                setTimer(0);
            }
        } else {
            const expireTime = now + OTP_DURATION;
            localStorage.setItem(EXPIRED_KEY, expireTime.toString());
            setTimer(60);
        }
    }, []);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        localStorage.removeItem(EXPIRED_KEY);
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

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
                                <h1 className='font-bold text-4xl text-third'>Verifikasi Kode</h1>
                                <p className='text-base text-center font-normal text-third opacity-50 w-2/3'>
                                    Kami telah mengirimkan Kode Verifikasi Ke
                                    <strong> {email}</strong>
                                </p>
                            </div>
                            <InputOTPForm />
                            <div className='flex items-center justify-center w-full mt-6 gap-2 text-third text-sm'>
                                <span>Belum dapat pesan E-mail?</span>
                                {timer > 0 ? (
                                    <span className='font-bold'>Kirim ulang dalam {timer}</span>
                                ) : (
                                    <span
                                        className='underline font-bold cursor-pointer'
                                        onClick={() => {
                                            const expire = Date.now() + OTP_DURATION;
                                            localStorage.setItem(EXPIRED_KEY, expire.toString());
                                            setTimer(60);
                                            handleResendEmail();
                                        }}
                                    >
                                        Kirim ulang
                                    </span>
                                )}
                            </div>
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


export default Verify;
