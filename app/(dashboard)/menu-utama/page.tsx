"use client";

import { BeratBadanCard } from '@/components/shared/BeratBadanCard';
import Navbar from '@/components/shared/Navbar';
import { StatusBMICard } from '@/components/shared/StatusBMICard';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import SaranMenu from '@/public/assets/icon_menu/icon_saranMenuHitam.svg';
import { BiSolidCoffeeAlt } from 'react-icons/bi';
import { FaBowlFood, FaCircleCheck, FaPlusMinus } from 'react-icons/fa6';
import { GiChickenOven } from 'react-icons/gi';
import { IoFastFoodSharp, IoTimer, IoWarning } from 'react-icons/io5';
import { ChartPieSimple } from '@/components/shared/Chart';
import { Progress } from '@/components/ui/progress';
import { ChartAreaInteractive } from '@/components/shared/AreaChart';
import { useLoading } from '@/context/LoadingContext';
import * as API_NUTRITION from '@/service/apiNutrition';
import { toast } from 'sonner';

function MenuUtama() {
  const { setLoading } = useLoading();
  const [profile, setProfile] = useState([]);
  const [mealPlan, setMealPlan] = useState<any[]>([]);

  const getProfile = async () => {
    setLoading(true);

    await API_NUTRITION.getProfile()
      .then((res) => {
        setProfile(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const getMealPlan = async () => {
    setLoading(true);

    await API_NUTRITION.getMealPlan()
      .then((res) => {
        setMealPlan(res.data.suggestion.meal_plan);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
      .finally(() => {
        setLoading(false);
      });
  }


  useEffect(() => {
    getProfile();
    getMealPlan();
  }, []);

  return (
    <main>
      <Navbar />
      <div className="flex mt-9 gap-6">
        <div className="w-3/4">
          <div className="grid grid-cols-2 gap-2.5 mb-5">
            <BeratBadanCard
              profile={profile}
            />
            <StatusBMICard
              profile={profile}
            />
          </div>
          <div className="bg-[#F8FFF0] rounded-[30px] p-5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h1 className="text-2xl text-fourth font-bold">Saran Menu</h1>
                <p className="font-normal text-fourth text-sm">Ada menu apa hari ini?</p>
              </div>
              <div className="p-1.5 bg-[#EAFFB8] rounded-[8px]">
                <Image src={SaranMenu} alt="Saran Menu" width={22} height={22} />
              </div>
            </div>
            {mealPlan.length > 0 ? (
              mealPlan.map((meal, index) => (
                <div className="mt-7 flex flex-col gap-1.5" key={index}>
                  <div className="flex items-center gap-1.5">
                    {meal.meal_time === 'Sarapan' ? (
                      <BiSolidCoffeeAlt size={20} color="2F3B10" />
                    ) : meal.meal_time === 'Makan Siang' ? (
                      <GiChickenOven size={20} color="2F3B10" />
                    ) : meal.meal_time === 'Makan Malam' ? (
                      <FaBowlFood size={20} color="2F3B10" />
                    ) : (
                      <IoFastFoodSharp size={20} color="2F3B10" />
                    )}
                    <span className="text-fourth font-semibold">{meal.meal_time}</span>
                  </div>
                  <div className="flex items-center justify-between bg-[#EAFFB8] px-3 py-1.5 rounded-xl">
                    <span className="font-semibold text-third text-sm">{meal.time}</span>
                    <div className="flex items-center font-semibold text-third text-sm">
                      <FaPlusMinus />
                      {meal.calories}kcal
                    </div>
                  </div>
                  <ul className="list-disc pl-5 text-fourth font-normal text-sm capitalize">
                    {meal.food.split(',').map((item: string, idx: number) => (
                      <li key={idx}>{item.trim()}</li>
                    ))}
                  </ul>
                </div>
              )
              )) : (
              <p className="text-fourth font-normal text-sm mt-5">Belum ada saran menu untuk hari ini.</p>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col gap-3">
          <div className="bg-[#F8FFF0] rounded-[30px] p-5">
            <div className="flex flex-col">
              <div className="flex flex-col">
                <h1 className="text-2xl text-fourth font-bold">Analisis Nutrisi</h1>
                <p className="font-normal text-fourth text-sm">Rata-rata konsumsi harian</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-[230px] h-[230px] flex-shrink-0">
                <svg width="100%" height="100%" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="32" stroke="#E0E0E0" strokeWidth="10" fill="none" />
                  <circle cx="40" cy="40" r="32" stroke="#FF7F3A" strokeWidth="10" fill="none" strokeDasharray={2 * Math.PI * 32} strokeDashoffset={2 * Math.PI * 32 * (1 - 0.75)} strokeLinecap="square" transform="rotate(-90 40 40)" />
                  <text x="50%" y="50%" textAnchor="middle" fontSize="7" fill="#2F3B10" fontWeight="bold">
                    75kcal
                  </text>
                  <text x="50%" y="60%" textAnchor="middle" fontSize="6" fill="#2F3B10" fontWeight="normal">
                    Kalori
                  </text>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <ChartPieSimple />
              </div>
            </div>
          </div>
          <div className="bg-[#F8FFF0] rounded-[30px] p-5">
            <div className="flex flex-col">
              <div className="flex flex-col">
                <h1 className="text-2xl text-fourth font-bold">Konsumsi Harian</h1>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4 mt-16">
                <span className="font-bold text-fourth text-base">Kalori</span>
                <Progress value={33} className="w-full ml-11" />
                <span className="text-sm w-1/3">760/2000 Kcal</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-fourth text-base">Protein</span>
                <Progress value={33} className="w-full ml-9" />
                <span className="text-sm w-1/3">760/2000 Kcal</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-fourth text-base">Karbohidrat</span>
                <Progress value={33} className="w-full" />
                <span className="text-sm w-1/3">760/2000 Kcal</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-fourth text-base">Lemak</span>
                <Progress value={33} className="w-full ml-[42px]" />
                <span className="text-sm w-1/3">760/2000 Kcal</span>
              </div>
            </div>
            <div className="flex flex-col mt-7 gap-1.5 w-full">
              <div className="flex items-center gap-2">
                <FaCircleCheck color="6B994D" size={18} />
                <span className="font-semibold text-sm text-fourth">Lemak Cukup!</span>
              </div>
              <div className="flex items-center gap-2">
                <IoWarning color="94994D" size={20} />
                <span className="font-semibold text-sm text-[#94994D]">Kelebihan 50g Protein</span>
              </div>
              <div className="flex items-center gap-2">
                <IoTimer color="795548" size={20} />
                <span className="font-semibold text-sm text-third">Kurang 950g Karbohidrat</span>
              </div>
              <div className="flex items-center justify-center w-full mt-9">
                <span className="text-[#6B994D] font-medium text-base cursor-pointer">Atur Target Nutrisi Baru</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChartAreaInteractive />
    </main>
  );
}

export default MenuUtama;
