import { BeratBadanCard } from '@/components/shared/BeratBadanCard'
import Navbar from '@/components/shared/Navbar'
import { StatusBMICard } from '@/components/shared/StatusBMICard'
import Image from 'next/image'
import React from 'react'
import { BiSolidCoffeeAlt } from 'react-icons/bi'
import { FaBowlFood, FaPlusMinus } from 'react-icons/fa6'
import { GiChickenOven } from 'react-icons/gi'
import { IoFastFoodSharp } from 'react-icons/io5'

function SaranMenu() {
    return (
        <main>
            <Navbar />
            <div className="flex flex-col mt-9 gap-2">
                <div className="grid grid-cols-2 gap-2.5 mb-5 w-[42%]">
                    <BeratBadanCard />
                    <StatusBMICard />
                </div>
                <div className="bg-[#F8FFF0] rounded-[30px] p-5">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <h1 className="text-2xl text-fourth font-bold">Saran Menu</h1>
                            <p className="font-normal text-fourth text-sm">Ada menu apa hari ini?</p>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-5'>
                        <div className="mt-7 flex flex-col gap-1.5">
                            <div className="flex items-center gap-1.5">
                                <BiSolidCoffeeAlt size={20} color="2F3B10" />
                                <span className="text-fourth font-semibold">Sarapan</span>
                            </div>
                            <div className="flex items-center justify-between bg-[#EAFFB8] px-3 py-1.5 rounded-xl">
                                <span className="font-semibold text-third text-sm">07.00 AM</span>
                                <div className="flex items-center font-semibold text-third text-sm">
                                    <FaPlusMinus />
                                    450kcal
                                </div>
                            </div>
                            <ul className="list-disc pl-5 text-fourth font-normal text-sm">
                                <li>Oatmeal dengan pisang & madu</li>
                                <li>Oatmeal dengan pisang & madu</li>
                                <li>Oatmeal dengan pisang & madu</li>
                            </ul>
                        </div>
                        <div className="mt-7 flex flex-col gap-1.5">
                            <div className="flex items-center gap-1.5">
                                <GiChickenOven size={20} color="2F3B10" />
                                <span className="text-fourth font-semibold">Makan Siang</span>
                            </div>
                            <div className="flex items-center justify-between bg-[#EAFFB8] px-3 py-1.5 rounded-xl">
                                <span className="font-semibold text-third text-sm">07.00 AM</span>
                                <div className="flex items-center font-semibold text-third text-sm">
                                    <FaPlusMinus />
                                    450kcal
                                </div>
                            </div>
                            <ul className="list-disc pl-5 text-fourth font-normal text-sm">
                                <li>Oatmeal dengan pisang & madu</li>
                                <li>Oatmeal dengan pisang & madu</li>
                                <li>Oatmeal dengan pisang & madu</li>
                            </ul>
                        </div>
                        <div className="mt-7 flex flex-col gap-1.5">
                            <div className="flex items-center gap-1.5">
                                <FaBowlFood size={20} color="2F3B10" />
                                <span className="text-fourth font-semibold">Makan Malam</span>
                            </div>
                            <div className="flex items-center justify-between bg-[#EAFFB8] px-3 py-1.5 rounded-xl">
                                <span className="font-semibold text-third text-sm">07.00 AM</span>
                                <div className="flex items-center font-semibold text-third text-sm">
                                    <FaPlusMinus />
                                    450kcal
                                </div>
                            </div>
                            <ul className="list-disc pl-5 text-fourth font-normal text-sm">
                                <li>Oatmeal dengan pisang & madu</li>
                                <li>Oatmeal dengan pisang & madu</li>
                                <li>Oatmeal dengan pisang & madu</li>
                            </ul>
                        </div>
                        <div className="mt-7 flex flex-col gap-1.5">
                            <div className="flex items-center gap-1.5">
                                <IoFastFoodSharp size={20} color="2F3B10" />
                                <span className="text-fourth font-semibold">Cemilan</span>
                            </div>
                            <div className="flex items-center justify-between bg-[#EAFFB8] px-3 py-1.5 rounded-xl">
                                <span className="font-semibold text-third text-sm">07.00 AM</span>
                                <div className="flex items-center font-semibold text-third text-sm">
                                    <FaPlusMinus />
                                    450kcal
                                </div>
                            </div>
                            <ul className="list-disc pl-5 text-fourth font-normal text-sm">
                                <li>Oatmeal dengan pisang & madu</li>
                                <li>Oatmeal dengan pisang & madu</li>
                                <li>Oatmeal dengan pisang & madu</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-6 mt-4'>
                    <div className="bg-[#F8FFF0] rounded-[30px] p-5 flex flex-col items-center justify-center">
                        <h1 className='font-bold text-4xl text-fourth'>Fakta Menarik</h1>
                        <p className='font-normal text-base text-fourth'>Ini dia beberapa Fakta Menarik!</p>
                        <p className='font-semibold text-xl text-fourth my-10'>“Brokoli tinggi akan vitamin C dan serat”</p>
                    </div>
                    <div className="bg-[#F8FFF0] rounded-[30px] p-5">
                        <div className='flex items-center justify-between'>
                            <h1 className='font-bold text-2xl text-fourth'>Saran Menu Berdasarkan Waktu</h1>
                            <span className='font-semibold text-base text-fourth bg-[#E2FF9F] p-1.5 rounded-md'>12:00 PM</span>
                        </div>
                        <p className='font-normal text-base text-fourth'>Ini dia beberapa Fakta Menarik!</p>

                        <div className='flex items-center gap-5'>
                            <div className='w-[200px] mt-5'>
                                <Image
                                    src="/assets/img-resep.svg"
                                    alt="Sarapan"
                                    className="w-full h-auto rounded-[18px] object-cover"
                                    width={200}
                                    height={100}
                                />
                            </div>
                            <div className="mt-7 flex flex-col gap-1.5 w-full">
                                <div className="flex items-center gap-1.5">
                                    <GiChickenOven size={20} color="2F3B10" />
                                    <span className="text-fourth font-semibold">Makan Siang</span>
                                </div>
                                <div className="flex items-center justify-between bg-[#EAFFB8] px-3 py-1.5 rounded-xl">
                                    <span className="font-semibold text-third text-sm">07.00 AM</span>
                                    <div className="flex items-center font-semibold text-third text-sm">
                                        <FaPlusMinus />
                                        450kcal
                                    </div>
                                </div>
                                <ul className="list-disc pl-5 text-fourth font-normal text-sm">
                                    <li>Oatmeal dengan pisang & madu</li>
                                    <li>Oatmeal dengan pisang & madu</li>
                                    <li>Oatmeal dengan pisang & madu</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SaranMenu