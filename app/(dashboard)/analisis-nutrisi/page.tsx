import { BeratBadanCard } from '@/components/shared/BeratBadanCard'
import Navbar from '@/components/shared/Navbar'
import { StatusBMICard } from '@/components/shared/StatusBMICard'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import iconAI from '@/public/assets/icon/icon_ai.svg'
import Image from 'next/image'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { TbTargetArrow } from "react-icons/tb";
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'

function AnalisisNutrisi() {
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
                        <div className='flex justify-between items-center gap-5'>
                            <div className="flex flex-col">
                                <div className='flex items-center justify-between gap-2'>
                                    <div className="flex flex-col">
                                        <h1 className="text-2xl text-fourth font-bold">Ringkasan Harian</h1>
                                        <p className="font-normal text-fourth text-sm">Rata-rata konsumsi harian</p>
                                    </div>
                                    <Dialog>
                                        <DialogTrigger className='bg-[#6B994D] text-white px-4 py-2 rounded-[8px] hover:bg-[#5a7f3e] transition-colors cursor-pointer'>
                                            Atur Target Nutrisi
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className='flex items-center gap-2 text-fourth'>
                                                    <TbTargetArrow size={24} />
                                                    Atur Target Nutrisi Harian
                                                </DialogTitle>
                                            </DialogHeader>
                                            <div className='flex flex-col gap-5'>
                                                <div className='flex items-center justify-between'>
                                                    <span className='text-fourth text-base font-medium pt-1'>Kalori</span>
                                                    <div className='relative w-1/4'>
                                                        <Input
                                                            type="number"
                                                            className="mt-2 w-full pr-12"
                                                        />
                                                        <span className='text-fourth text-sm font-medium absolute bottom-2 right-3'>kcal</span>
                                                    </div>
                                                </div>
                                                <Slider defaultValue={[33]} max={100} step={1} />
                                                <div className='flex items-center justify-between'>
                                                    <span className='text-fourth text-base font-medium pt-1'>Karbohidrat</span>
                                                    <div className='relative w-1/4'>
                                                        <Input
                                                            type="number"
                                                            className="mt-2 w-full pr-12"
                                                        />
                                                        <span className='text-fourth text-sm font-medium absolute bottom-2 right-3'>gram</span>
                                                    </div>
                                                </div>
                                                <Slider defaultValue={[33]} max={100} step={1} />
                                                <div className='flex items-center justify-between'>
                                                    <span className='text-fourth text-base font-medium pt-1'>Protein</span>
                                                    <div className='relative w-1/4'>
                                                        <Input
                                                            type="number"
                                                            className="mt-2 w-full pr-12"
                                                        />
                                                        <span className='text-fourth text-sm font-medium absolute bottom-2 right-3'>gram</span>
                                                    </div>
                                                </div>
                                                <Slider defaultValue={[33]} max={100} step={1} />
                                                <div className='flex items-center justify-between'>
                                                    <span className='text-fourth text-base font-medium pt-1'>Lemak</span>
                                                    <div className='relative w-1/4'>
                                                        <Input
                                                            type="number"
                                                            className="mt-2 w-full pr-12"
                                                        />
                                                        <span className='text-fourth text-sm font-medium absolute bottom-2 right-3'>gram</span>
                                                    </div>
                                                </div>
                                                <Slider defaultValue={[33]} max={100} step={1} />
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-4 mt-7">
                                        <span className="font-bold text-fourth text-base">Kalori</span>
                                        <Progress value={33} className="w-full ml-11" />
                                        <span className="text-xs w-1/2 font-normal text-[#614034]"><strong>760/2000</strong> Kcal</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold text-fourth text-base">Protein</span>
                                        <Progress value={33} className="w-full ml-9" />
                                        <span className="text-xs w-1/2 font-normal text-[#614034]"><strong>760/2000</strong> Kcal</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold text-fourth text-base">Karbohidrat</span>
                                        <Progress value={33} className="w-full" />
                                        <span className="text-xs w-1/2 font-normal text-[#614034]"><strong>760/2000</strong> Kcal</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-bold text-fourth text-base">Lemak</span>
                                        <Progress value={33} className="w-full ml-[42px]" />
                                        <span className="text-xs w-1/2 font-normal text-[#614034]"><strong>760/2000</strong> Kcal</span>
                                    </div>
                                </div>
                                <div className="flex flex-col mt-5">
                                    <h1 className="text-2xl text-fourth font-bold">Progress Harian</h1>
                                    <p className="font-normal text-fourth text-sm">Penghargaan untuk kerja keras kamu!</p>
                                </div>
                                <div className='mt-3.5 flex items-center gap-1.5'>
                                    <span className='text-fourth font-semibold text-2xl bg-[#FEFEAA] rounded-[8px] p-2'>
                                        1/4
                                    </span>
                                    <p className='text-fourth font-normal text-sm'>
                                        Kamu telah memenuhi <strong>1</strong> dari <strong>4</strong> target hari ini.
                                        Tetap semangat!
                                    </p>
                                </div>
                            </div>
                            <div className='w-1'>
                                <Separator className='py-52' />
                            </div>
                            <div className="flex flex-col w-1/2">
                                <div className="flex items-center gap-2 bg-white px-5 py-9 rounded-[18px]">
                                    <Image
                                        src={iconAI}
                                        alt="Icon AI"
                                        className="w-[28px] h-[28px] object-contain"
                                        width={28}
                                        height={28}
                                    />
                                    <p className='italic text-fourth font-normal text-sm'>
                                        “Hari ini asupan <strong>karbohidrat</strong> kamu lebih sedikit dibanding kemarin, yuk ditingkatkan lagi besok!”
                                    </p>
                                </div>
                                <span className='text-fourth font-semibold text-sm my-5'>Ini dia beberapa saran menu untuk Kamu!</span>
                                <div className='flex flex-col gap-3'>
                                    <div className='grid grid-cols-4 gap-4'>
                                        <Image
                                            src="/assets/img-resep.svg"
                                            alt="Sarapan"
                                            className="w-full h-auto rounded-[18px] object-cover"
                                            width={400}
                                            height={300}
                                        />
                                        <Image
                                            src="/assets/img-resep.svg"
                                            alt="Sarapan"
                                            className="w-full h-auto rounded-[18px] object-cover"
                                            width={400}
                                            height={300}
                                        />
                                        <Image
                                            src="/assets/img-resep.svg"
                                            alt="Sarapan"
                                            className="w-full h-auto rounded-[18px] object-cover"
                                            width={400}
                                            height={300}
                                        />
                                        <Image
                                            src="/assets/img-resep.svg"
                                            alt="Sarapan"
                                            className="w-full h-auto rounded-[18px] object-cover"
                                            width={400}
                                            height={300}
                                        />
                                    </div>
                                    <span className='text-sm font-semibold text-[#6B994D] cursor-pointer text-center mt-10'>Lihat Resep</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AnalisisNutrisi