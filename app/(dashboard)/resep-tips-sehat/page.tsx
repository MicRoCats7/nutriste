'use client';

import { BeratBadanCard } from '@/components/shared/BeratBadanCard';
import Navbar from '@/components/shared/Navbar';
import { StatusBMICard } from '@/components/shared/StatusBMICard';
import { useLoading } from '@/context/LoadingContext';
import Image from 'next/image';
import React from 'react';
import * as API_NUTRITION from '@/service/apiNutrition';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

function ResepTips() {
  const { setLoading } = useLoading();
  const [profile, setProfile] = React.useState<any>([]);
  const [imagesMealPlan, setImagesMealPlan] = React.useState<any[]>([]);
  const [tips, setTips] = React.useState<any[]>([]);
  const router = useRouter();

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

  const getImagesMealPlan = async () => {
    setLoading(true);

    await API_NUTRITION.getImagesMeal()
      .then((res) => {
        setImagesMealPlan(res.data.updatedMealPlan.meal_plan);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getTips = async () => {
    setLoading(true);

    await API_NUTRITION.getTips()
      .then((res) => {
        const parsedTips = JSON.parse(res.data.data);
        setTips(parsedTips);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getProfile();
    getImagesMealPlan();
    getTips();
  }, []);

  return (
    <main>
      <Navbar photo={profile?.photo} />
      <div className="flex flex-col mt-9 gap-2">
        <div className="grid grid-cols-2 gap-2.5 mb-5 w-[42%]">
          <BeratBadanCard profile={profile} />
          <StatusBMICard profile={profile} />
        </div>
        <div className="w-full">
          <div className="bg-[#F8FFF0] rounded-[30px] p-5">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-4xl text-fourth font-bold">Resep Sehat</h1>
              <p className="font-normal text-fourth text-sm">Ini dia resep sehat untuk kamu!</p>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-7">
              {imagesMealPlan.map((item, index) => (
                <div key={index} className="flex flex-col items-center justify-center gap-2 w-full">
                  {item.image ? (
                    <div className="w-full h-[200px] overflow-hidden rounded-[18px]">
                      <Image src={item.image} alt="Sarapan" className="w-full h-full rounded-[18px] object-cover" width={500} height={500} />
                    </div>
                  ) : (
                    <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center rounded-[18px]">
                      <span className="text-gray-500 text-sm">Gambar tidak tersedia</span>
                    </div>
                  )}
                  <h2 className="text-sm font-bold text-fourth text-center">{item.description}</h2>
                  <p className="text-sm text-fourth font-medium">±{item.calories} kalori</p>
                  <span className="text-sm text-[#6B994D] font-medium cursor-pointer" onClick={() => router.push(`resep-tips-sehat/${item.index}`)}>
                    Lihat Menu
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#F8FFF0] rounded-[30px] p-5">
            <div className="flex justify-between items-center gap-5">
              <div className="flex flex-col">
                <div className="flex gap-2">
                  <div className="flex flex-col">
                    <h1 className="text-4xl text-fourth font-bold">Tips Sehat</h1>
                    <p className="font-normal text-fourth text-sm">Tips Sehat untuk hidup lebih sehat!</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {tips?.map((tip, index) => (
                    <div key={index} className="flex flex-col gap-2">
                      <h2 className="text-sm p-1.5 font-bold text-[#FEFEAA] bg-[#6B994D] rounded-[8px]">{index + 1}. {tip.judul}</h2>
                      <p className="text-sm text-fourth font-medium">{tip.deskripsi}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ResepTips;
