'use client';

import { BeratBadanCard } from '@/components/shared/BeratBadanCard';
import Navbar from '@/components/shared/Navbar';
import { StatusBMICard } from '@/components/shared/StatusBMICard';
import Image from 'next/image';
import React from 'react';
import { BiSolidCoffeeAlt } from 'react-icons/bi';
import { FaBowlFood, FaPlusMinus } from 'react-icons/fa6';
import { GiChickenOven } from 'react-icons/gi';
import { IoFastFoodSharp } from 'react-icons/io5';
import * as API_NUTRITION from '@/service/apiNutrition';
import { useLoading } from '@/context/LoadingContext';
import { toast } from 'sonner';

function SaranMenu() {
  const { setLoading } = useLoading();
  const [profile, setProfile] = React.useState<any>([]);
  const [mealPlan, setMealPlan] = React.useState<any[]>([]);
  const [fact, setFact] = React.useState<any>(null);
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

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

  const getFact = async () => {
    setLoading(true);

    await API_NUTRITION.getFunFact()
      .then((res) => {
        setFact(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const sortedMeals = mealPlan
    .map((meal: any) => {
      let minutes = 0;
      if (meal.time.includes('AM') || meal.time.includes('PM')) {
        const [time, period] = meal.time.split(' ');
        let [h, m] = time.split(':').map(Number);
        if (isNaN(h)) h = 0;
        if (isNaN(m)) m = 0;
        if (period === 'PM' && h !== 12) h += 12;
        if (period === 'AM' && h === 12) h = 0;
        minutes = h * 60 + m;
      } else if (meal.time.includes(':')) {
        const [h, m] = meal.time.split(':').map(Number);
        minutes = (isNaN(h) ? 0 : h) * 60 + (isNaN(m) ? 0 : m);
      } else if (meal.time.includes('.')) {
        const [h, m] = meal.time.split('.').map(Number);
        minutes = (isNaN(h) ? 0 : h) * 60 + (isNaN(m) ? 0 : m);
      }
      return {
        ...meal,
        minutes,
      };
    })
    .sort((a, b) => a.minutes - b.minutes);

  let nextMeal = sortedMeals.find((meal: any) => meal.minutes > nowMinutes);
  if (!nextMeal && sortedMeals.length > 0) {
    nextMeal = sortedMeals[0];
  }

  React.useEffect(() => {
    getProfile();
    getMealPlan();
    getFact();
  }, []);

  return (
    <main>
      <Navbar photo={profile?.photo} />
      <div className="flex flex-col mt-9 gap-2">
        <div className="grid grid-cols-2 gap-2.5 mb-5 w-[42%]">
          <BeratBadanCard profile={profile} />
          <StatusBMICard profile={profile} />
        </div>
        <div className="bg-[#F8FFF0] rounded-[30px] p-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-2xl text-fourth font-bold">Saran Menu</h1>
              <p className="font-normal text-fourth text-sm">Ada menu apa hari ini?</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
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
                  <ul className="list-disc pl-5 text-fourth font-normal text-sm">
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
        <div className="grid grid-cols-2 gap-6 mt-4">
          <div className="bg-[#F8FFF0] rounded-[30px] p-5 flex flex-col items-center justify-center">
            <h1 className="font-bold text-4xl text-fourth">Fakta Menarik</h1>
            <p className="font-normal text-base text-fourth">Ini dia Fakta Menarik!</p>
            <p className="font-semibold text-xl text-fourth my-10 text-center">“{fact}”</p>
          </div>
          <div className="bg-[#F8FFF0] rounded-[30px] p-5">
            <div className="flex items-center justify-between">
              <h1 className="font-bold text-2xl text-fourth">Saran Menu Berdasarkan Waktu</h1>
              <span className="font-semibold text-base text-fourth bg-[#E2FF9F] p-1.5 rounded-md">{nextMeal?.time || '-'}</span>
            </div>
            <p className="font-normal text-base text-fourth">Ini dia menu untuk kamu!</p>
            <div className="flex items-center gap-5">
              <div className="w-[200px] mt-5">
                <Image src="/assets/img-resep.svg" alt="Sarapan" className="w-full h-auto rounded-[18px] object-cover" width={200} height={100} />
              </div>
              <div className="mt-7 flex flex-col gap-1.5 w-full">
                <div className="flex items-center gap-1.5">
                  {nextMeal?.meal_time === 'Sarapan' ? (
                    <BiSolidCoffeeAlt size={20} color="2F3B10" />
                  ) : nextMeal?.meal_time === 'Makan Siang' ? (
                    <GiChickenOven size={20} color="2F3B10" />
                  ) : nextMeal?.meal_time === 'Makan Malam' ? (
                    <FaBowlFood size={20} color="2F3B10" />
                  ) : (
                    <IoFastFoodSharp size={20} color="2F3B10" />
                  )}
                  <span className="text-fourth font-semibold">{nextMeal?.meal_time}</span>
                </div>
                <div className="flex items-center justify-between bg-[#EAFFB8] px-3 py-1.5 rounded-xl">
                  <span className="font-semibold text-third text-sm">{nextMeal?.time}</span>
                  <div className="flex items-center font-semibold text-third text-sm">
                    <FaPlusMinus />
                    {nextMeal?.calories}kcal
                  </div>
                </div>
                <ul className="list-disc pl-5 text-fourth font-normal text-sm">
                    {nextMeal?.food.split('-').map((item: string, idx: number) => (
                        <li key={idx}>{item.trim()}</li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SaranMenu;
