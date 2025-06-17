'use client';

import Navbar from '@/components/shared/Navbar';
import { useLoading } from '@/context/LoadingContext';
import React from 'react';
import * as API_NUTRITION from '@/service/apiNutrition';
import { toast } from 'sonner';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';

function DetailResep() {
  const [profile, setProfile] = React.useState<any>([]);
  const [recipe, setRecipe] = React.useState<any>(null);
  const { setLoading } = useLoading();
  const router = useRouter();
  const params = useParams();

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

  const getDetailResep = async () => {
    setLoading(true);
    const index = params.id as string;

    await API_NUTRITION.getDetailResep(index)
      .then((res) => {
        setRecipe(res.data);
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
    getDetailResep();
  }, []);

  return (
    <main>
      <Navbar photo={profile?.photo} />
      <div className="w-full">
        <div className="mt-10 rounded-[30px] p-5">
          <div className="flex items-start justify-between gap-2 mb-5">
            <ArrowLeft className="text-fourth w-7 h-7 mb-2 mt-4 cursor-pointer" onClick={() => router.back()} />
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-4xl text-fourth font-bold">Rincian Resep Makanan</h1>
              <p className="font-normal text-fourth text-sm">Ini dia resep sehat untuk kamu!</p>
            </div>
            <div></div>
          </div>
          <div className="mt-10 flex items-start justify-center gap-10">
            <div className="flex flex-col items-center justify-center gap-2 w-full max-w-[300px]">
              <div className="w-full h-[200px] overflow-hidden rounded-[18px]">
                <Image src={recipe?.image} alt="Sarapan" className="w-full h-full rounded-[18px] object-cover" width={500} height={500} />
              </div>
              <h2 className="text-sm font-bold text-fourth text-center">"{recipe?.recipe?.food_name}"</h2>
            </div>
            <div className="flex flex-col items-start justify-center gap-2">
              <div>
                <h3 className="text-lg font-bold text-fourth">Bahan-bahan:</h3>
                <ul className="list-disc pl-5 text-sm text-fourth">
                  {recipe?.recipe?.ingredients.map((ingredient: string, index: number) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-fourth">Cara Membuat:</h3>
                <ol className="list-decimal pl-5 text-sm text-fourth">
                  {recipe?.recipe?.step_by_step.map((step: string, index: number) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DetailResep;
