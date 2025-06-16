import { BeratBadanCard } from '@/components/shared/BeratBadanCard'
import Navbar from '@/components/shared/Navbar'
import { StatusBMICard } from '@/components/shared/StatusBMICard'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import React from 'react'

function ResepTips() {
    return (
        <main>
            <Navbar />
            <div className="flex flex-col mt-9 gap-2">
                <div className="grid grid-cols-2 gap-2.5 mb-5 w-[42%]">
                    <BeratBadanCard />
                    <StatusBMICard />
                </div>
                <div className="w-full">
                    <div className="bg-[#F8FFF0] rounded-[30px] p-5">
                        <div className="flex flex-col items-center justify-center">
                            <h1 className="text-4xl text-fourth font-bold">Resep Sehat</h1>
                            <p className="font-normal text-fourth text-sm">Ini dia resep sehat untuk kamu!</p>
                        </div>
                        <div className='grid grid-cols-6 gap-4 mt-7'>
                            <div className='flex flex-col items-center justify-center gap-2'>
                                <Image
                                    src="/assets/img-resep.svg"
                                    alt="Sarapan"
                                    className="w-full h-auto rounded-[18px] object-cover"
                                    width={400}
                                    height={300}
                                />
                                <h2 className="text-sm font-bold text-fourth text-center">
                                    "Smoothie Bayam dan Pisang"
                                </h2>
                                <p className="text-sm text-fourth font-medium">±120 kalori</p>
                                <span className='text-sm text-[#6B994D] font-medium cursor-pointer'>Lihat Menu</span>
                            </div>
                            <div className='flex flex-col items-center justify-center gap-2'>
                                <Image
                                    src="/assets/img-resep.svg"
                                    alt="Sarapan"
                                    className="w-full h-auto rounded-[18px] object-cover"
                                    width={400}
                                    height={300}
                                />
                                <h2 className="text-sm font-bold text-fourth text-center">
                                    "Smoothie Bayam dan Pisang"
                                </h2>
                                <p className="text-sm text-fourth font-medium">±120 kalori</p>
                                <span className='text-sm text-[#6B994D] font-medium cursor-pointer'>Lihat Menu</span>
                            </div>
                            <div className='flex flex-col items-center justify-center gap-2'>
                                <Image
                                    src="/assets/img-resep.svg"
                                    alt="Sarapan"
                                    className="w-full h-auto rounded-[18px] object-cover"
                                    width={400}
                                    height={300}
                                />
                                <h2 className="text-sm font-bold text-fourth text-center">
                                    "Smoothie Bayam dan Pisang"
                                </h2>
                                <p className="text-sm text-fourth font-medium">±120 kalori</p>
                                <span className='text-sm text-[#6B994D] font-medium cursor-pointer'>Lihat Menu</span>
                            </div>
                            <div className='flex flex-col items-center justify-center gap-2'>
                                <Image
                                    src="/assets/img-resep.svg"
                                    alt="Sarapan"
                                    className="w-full h-auto rounded-[18px] object-cover"
                                    width={400}
                                    height={300}
                                />
                                <h2 className="text-sm font-bold text-fourth text-center">
                                    "Smoothie Bayam dan Pisang"
                                </h2>
                                <p className="text-sm text-fourth font-medium">±120 kalori</p>
                                <span className='text-sm text-[#6B994D] font-medium cursor-pointer'>Lihat Menu</span>
                            </div>
                            <div className='flex flex-col items-center justify-center gap-2'>
                                <Image
                                    src="/assets/img-resep.svg"
                                    alt="Sarapan"
                                    className="w-full h-auto rounded-[18px] object-cover"
                                    width={400}
                                    height={300}
                                />
                                <h2 className="text-sm font-bold text-fourth text-center">
                                    "Smoothie Bayam dan Pisang"
                                </h2>
                                <p className="text-sm text-fourth font-medium">±120 kalori</p>
                                <span className='text-sm text-[#6B994D] font-medium cursor-pointer'>Lihat Menu</span>
                            </div>
                            <div className='flex flex-col items-center justify-center gap-2'>
                                <Image
                                    src="/assets/img-resep.svg"
                                    alt="Sarapan"
                                    className="w-full h-auto rounded-[18px] object-cover"
                                    width={400}
                                    height={300}
                                />
                                <h2 className="text-sm font-bold text-fourth text-center">
                                    "Smoothie Bayam dan Pisang"
                                </h2>
                                <p className="text-sm text-fourth font-medium">±120 kalori</p>
                                <span className='text-sm text-[#6B994D] font-medium cursor-pointer'>Lihat Menu</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#F8FFF0] rounded-[30px] p-5">
                        <div className='flex justify-between items-center gap-5'>
                            <div className="flex flex-col">
                                <div className='flex gap-2'>
                                    <div className="flex flex-col">
                                        <h1 className="text-4xl text-fourth font-bold">Tips Sehat</h1>
                                        <p className="font-normal text-fourth text-sm">Tips Sehat untuk hidup lebih sehat!</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-4 mt-4'>
                                    <div className='flex flex-col gap-2'>
                                        <h2 className="text-sm p-1.5 font-bold text-[#FEFEAA] bg-[#6B994D] rounded-[8px]">
                                            1. Minum Air Putih Setelah Bangun Tidur
                                        </h2>
                                        <p className="text-sm text-fourth font-medium">Membantu menghidrasi tubuh setelah semalaman tanpa cairan, dan mendukung fungsi organ di pagi hari.</p>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <h2 className="text-sm p-1.5 font-bold text-[#FEFEAA] bg-[#6B994D] rounded-[8px]">
                                            2. Berjemur di Pagi Hari
                                        </h2>
                                        <p className="text-sm text-fourth font-medium">Sinar matahari pagi membantu tubuh memproduksi vitamin D yang penting untuk tulang dan imun tubuh.</p>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <h2 className="text-sm p-1.5 font-bold text-[#FEFEAA] bg-[#6B994D] rounded-[8px]">
                                            3. Sarapan Sehat
                                        </h2>
                                        <p className="text-sm text-fourth font-medium">Sarapan dengan makanan bergizi memberikan energi untuk memulai hari dan meningkatkan konsentrasi.</p>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <h2 className="text-sm p-1.5 font-bold text-[#FEFEAA] bg-[#6B994D] rounded-[8px]">
                                            4. Olahraga Ringan
                                        </h2>
                                        <p className="text-sm text-fourth font-medium">Olahraga ringan seperti jalan kaki atau yoga membantu meningkatkan sirkulasi darah dan kesehatan jantung.</p>
                                    </div>
                                </div>
                            </div>
                            <div className='w-1'>
                                <Separator className='py-52' />
                            </div>
                            <div className="flex flex-col w-2/3">
                                <h1 className='font-bold text-2xl text-fourth text-center'>Mulai Latihan!</h1>
                                <div className='flex flex-col items-center justify-center gap-3 w-full'>
                                    <div className='flex flex-col p-3 rounded-[12px] bg-[#EAFFB8] items-center w-full'>
                                        <span className='text-base font-semibold text-black'>Jalan Kaki Cepat</span>
                                        <span className='text-sm font-medium text-black'>(30 menit/hari)</span>
                                    </div>
                                    <div className='flex flex-col p-3 rounded-[12px] bg-[#EAFFB8] items-center w-full'>
                                        <span className='text-base font-semibold text-black'>Jalan Kaki Cepat</span>
                                        <span className='text-sm font-medium text-black'>(30 menit/hari)</span>
                                    </div>
                                    <div className='flex flex-col p-3 rounded-[12px] bg-[#EAFFB8] items-center w-full'>
                                        <span className='text-base font-semibold text-black'>Jalan Kaki Cepat</span>
                                        <span className='text-sm font-medium text-black'>(30 menit/hari)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ResepTips