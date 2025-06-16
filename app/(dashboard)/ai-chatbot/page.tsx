import Navbar from '@/components/shared/Navbar'
import Image from 'next/image'
import React from 'react'
import iconAI from '@/public/assets/icon/icon_ai.svg'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'

function ChatAI() {
    return (
        <main>
            <Navbar />
            <div className='bg-[#6B994D] flex items-center gap-5 px-6 py-2 rounded-t-[30px] mt-7'>
                <Image
                    src={iconAI}
                    alt="AI Icon"
                    width={60}
                    height={60}
                />
                <h1 className='font-bold text-[56px] text-[#F0FFCD]'>Nibit.</h1>
            </div>
            <div className='bg-[#F8FFF0] p-6 rounded-b-[30px] max-h-[80vh] overflow-y-auto relative'>
                <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pb-20">
                    {/* Contoh chat dari user */}
                    <div className="flex justify-end items-start gap-2">
                        <div className="bg-[#6B994D] text-white px-4 py-2 rounded-2xl rounded-br-sm max-w-xs">
                            Halo, Nibit! Apa rekomendasi makanan sehat hari ini?
                        </div>
                        <Avatar className="cursor-pointer w-12 h-12">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                    {/* Contoh chat dari AI */}
                    <div className="flex justify-start items-start gap-2">
                        <Image
                            src={iconAI}
                            alt="AI Icon"
                            width={45}
                            height={45}
                            className="mt-1"
                        />
                        <div className="bg-white text-[#6B994D] px-4 py-2 rounded-2xl rounded-bl-sm max-w-xs border border-[#6B994D]">
                            Hai! Untuk hari ini, kamu bisa coba salad sayur dengan dada ayam panggang dan quinoa. Sehat dan lezat!
                        </div>
                    </div>
                </div>
                <div className="mt-4 absolute bottom-0 left-0 right-0 flex items-center gap-3 bg-[#E9E9E948] p-3 rounded-lg shadow-lg">
                    <Input
                        className="w-full p-5 border-none focus:ring-0 focus:border-none bg-white rounded-lg"
                        placeholder="Ketik Pertanyaan untuk Nibit......"
                    />
                    <Send size={24} />
                </div>
            </div>
        </main>
    )
}

export default ChatAI