'use client';

import Navbar from '@/components/shared/Navbar';
import { useLoading } from '@/context/LoadingContext';
import React from 'react';
import * as API_NUTRITION from '@/service/apiNutrition';
import { toast } from 'sonner';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

function DetailResep() {
  const [profile, setProfile] = React.useState<any>([]);
  const { setLoading } = useLoading();
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

  React.useEffect(() => {
    getProfile();
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
            <div className="flex flex-col items-center justify-center gap-2">
              <Image src="/assets/img-resep.svg" alt="Sarapan" className="w-full h-auto rounded-[18px] object-cover" width={400} height={300} />
              <h2 className="text-sm font-bold text-fourth text-center">"Smoothie Bayam dan Pisang"</h2>
              <p className="text-sm text-fourth font-medium">±120 kalori</p>
            </div>
            <div className="flex flex-col items-start justify-center gap-2">
              <div>
                <h3 className="text-lg font-bold text-fourth">Bahan-bahan:</h3>
                <ul className="list-disc pl-5 text-sm text-fourth">
                  <li>1 cangkir bayam segar</li>
                  <li>1 buah pisang matang</li>
                  <li>1/2 cangkir yogurt rendah lemak</li>
                  <li>1/2 cangkir susu almond</li>
                  <li>1 sendok makan madu (opsional)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-fourth">Cara Membuat:</h3>
                <ol className="list-decimal pl-5 text-sm text-fourth">
                  <li>Cuci bayam segar dan potong-potong.</li>
                  <li>Masukkan semua bahan ke dalam blender.</li>
                  <li>Blender hingga halus dan tercampur rata.</li>
                  <li>Tuang ke dalam gelas dan nikmati!</li>
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
