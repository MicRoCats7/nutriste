'use client';

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
import { ChartNutrition } from '@/components/shared/Chart';
import { Progress } from '@/components/ui/progress';
import { ChartAreaInteractive } from '@/components/shared/AreaChart';
import { useLoading } from '@/context/LoadingContext';
import * as API_NUTRITION from '@/service/apiNutrition';
import { toast } from 'sonner';

function MenuUtama() {
  const { setLoading } = useLoading();
  const [profile, setProfile] = useState<any>([]);
  const [mealPlan, setMealPlan] = useState<any[]>([]);
  const [todayNutrition, setTodayNutrition] = useState<any>({});

  const getProfile = async () => {
    setLoading(true);

    await API_NUTRITION.getProfile()
      .then((res) => {
        setProfile(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getMealPlan = async () => {
    setLoading(true);

    await API_NUTRITION.getMealPlan()
      .then((res) => {
        setMealPlan(res.data.suggestion.meal_plan);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getTodayNutrition = async () => {
    setLoading(true);

    await API_NUTRITION.getNutritionToday()
      .then((res) => {
        setTodayNutrition(res.data);
        console.log(res.data.nutritionData[0]?.value);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getProfile();
    getMealPlan();
    getTodayNutrition();
  }, []);

  return (
    <main>
      <Navbar photo={profile?.photo} />
      <div className="flex mt-9 gap-6">
        <div className="w-3/4">
          <div className="grid grid-cols-2 gap-2.5 mb-5">
            <BeratBadanCard profile={profile} />
            <StatusBMICard profile={profile} />
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
                    {meal.food.split('-').map((item: string, idx: number) => (
                      <li key={idx}>{item.trim()}</li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
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
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="#FF7F3A"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 32}
                    strokeDashoffset={2 * Math.PI * 32 * (1 - Math.min((todayNutrition?.nutritionData?.[0]?.percentage || 0) / 100, 1))}
                    strokeLinecap="square"
                    transform="rotate(-90 40 40)"
                  />
                  <text x="50%" y="50%" textAnchor="middle" fontSize="7" fill="#2F3B10" fontWeight="bold">
                    {todayNutrition?.nutritionData?.[0]?.value || 0}kcal
                  </text>
                  <text x="50%" y="60%" textAnchor="middle" fontSize="6" fill="#2F3B10" fontWeight="normal">
                    Kalori
                  </text>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <ChartNutrition data={todayNutrition} />
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
                <Progress value={todayNutrition?.nutritionData?.[0]?.percentage || 0} className="w-full ml-11" />
                <span className="text-sm w-1/3">
                  {todayNutrition?.nutritionData?.[0]?.value || 0}/{todayNutrition?.nutritionData?.[0]?.target || 0} Kcal
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-fourth text-base">Protein</span>
                <Progress value={todayNutrition?.nutritionData?.[1]?.percentage || 0} className="w-full ml-9" />
                <span className="text-sm w-1/3">
                  {todayNutrition?.nutritionData?.[1]?.value || 0}/{todayNutrition?.nutritionData?.[1]?.target || 0} gram
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-fourth text-base">Karbohidrat</span>
                <Progress value={todayNutrition?.nutritionData?.[2]?.percentage || 0} className="w-full" />
                <span className="text-sm w-1/3">
                  {todayNutrition?.nutritionData?.[2]?.value || 0}/{todayNutrition?.nutritionData?.[2]?.target || 0} gram
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-fourth text-base">Lemak</span>
                <Progress value={todayNutrition?.nutritionData?.[3]?.percentage || 0} className="w-full ml-[42px]" />
                <span className="text-sm w-1/3">
                  {todayNutrition?.nutritionData?.[3]?.value || 0}/{todayNutrition?.nutritionData?.[3]?.target || 0} gram
                </span>
              </div>
            </div>
            <div className="flex flex-col mt-7 gap-1.5 w-full">
              {todayNutrition?.nutritionData?.map((item: any, idx: number) => {
                let icon;
                let colorClass = '';
                let textColor = '';

                if (item.status === 'Cukup') {
                  icon = <FaCircleCheck color="#6B994D" size={18} />;
                  textColor = 'text-fourth';
                } else if (item.status === 'Kekurangan') {
                  icon = <IoTimer color="#795548" size={20} />;
                  textColor = 'text-third';
                } else if (item.status === 'Kelebihan') {
                  icon = <IoWarning color="#94994D" size={20} />;
                  textColor = 'text-[#94994D]';
                }

                return (
                  <div key={idx} className="flex items-center gap-2">
                    {icon}
                    <span className={`font-semibold text-sm ${textColor}`}>{item.message}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <ChartAreaInteractive />
    </main>
  );
}

export default MenuUtama;
