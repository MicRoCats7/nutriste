"use client";

import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React, { useRef } from 'react';
import { BiEditAlt } from "react-icons/bi";
import { Input } from '@/components/ui/input';
import { TiArrowLeft, TiArrowRight } from "react-icons/ti";
import { Toggle } from '@/components/ui/toggle';
import { IoIosBody } from 'react-icons/io';
import Image from 'next/image';
import { MdDirectionsWalk, MdFoodBank, MdRecordVoiceOver } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useLoading } from '@/context/LoadingContext';
import * as API_NUTRITION from '@/service/apiNutrition';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

function FormAccount() {
  const { setLoading } = useLoading();
  const navigate = useRouter();
  const [currentStep, setCurrentStep] = React.useState(0);
  const [name, setName] = React.useState<string>("");
  const [selectedGender, setSelectedGender] = React.useState<"pria" | "wanita" | null>(null);
  const [age, setAge] = React.useState<number>(0);
  const [weight, setWeight] = React.useState<number>(0);
  const [height, setHeight] = React.useState<number>(0);
  const [healthHistory, setHealthHistory] = React.useState<string>("");
  const [foodRestrictions, setFoodRestrictions] = React.useState<string>("");
  const [dailyActivity, setDailyActivity] = React.useState<string>("");
  const [activityLevel, setActivityLevel] = React.useState<string>("");
  const [mealsPerDay, setMealsPerDay] = React.useState<string>("");
  const [favoriteFoods, setFavoriteFoods] = React.useState<string>("");
  const [appPurpose, setAppPurpose] = React.useState<string>("");

  const [avatarFile, setAvatarFile] = React.useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const MAX_SIZE = 2 * 1024 * 1024;
      if (file.size > MAX_SIZE) {
        toast.error('Ukuran file maksimal 2MB');
        return;
      }

      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true)

    const formData = new FormData();
    formData.append('name', name);
    if (selectedGender) formData.append('gender', selectedGender);
    formData.append('age', age.toString());
    formData.append('weight', weight.toString());
    formData.append('height', height.toString());
    formData.append('healthCondition', healthHistory);
    formData.append('foodRestrictions', foodRestrictions);
    formData.append('activity', dailyActivity);
    formData.append('activeStatus', activityLevel);
    formData.append('mealsPerDay', mealsPerDay);
    formData.append('favouriteFood', favoriteFoods);
    formData.append('purposes', appPurpose);

    if (avatarFile) {
      formData.append('photo', avatarFile);
    }

    await API_NUTRITION.addProfile(formData)
      .then((res: any) => {
        toast.success(res.data.message)
        setLoading(false);
        navigate.push('/menu-utama')
      })
      .catch((err) => {
        toast.error(err.response.data.message || "Error")
        setLoading(false);
      }).finally(() => {
        setLoading(false);
      })
  }

  return (
    <main className="min-h-screen bg-[#EAFFE4]">
      <div className="flex flex-col gap-[33px] items-center justify-center min-h-screen py-10">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-6 gap-4 mb-10 w-1/3 mx-auto">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center gap-2">
                <span
                  style={{
                    color: idx === currentStep ? '#000' : '#666',
                  }}
                  className='text-2xl font-bold'
                >
                  {idx + 1}
                </span>
                <Separator
                  className={`py-0.5 ${idx === currentStep ? 'bg-fourth my-2' : 'bg-gray-500'}`}
                />
              </div>
            ))}
          </div>
          <div className="bg-white border-[#ACDD8D] border-4 w-full mx-auto flex items-center justify-center gap-10 rounded-[80px] shadow-lg">
            {currentStep === 0 && (
              <div className="flex items-center justify-center w-full max-w-[1200px] py-10">
                <div className='flex flex-col items-center w-1/2 pl-10'>
                  <div className='relative flex flex-col items-center justify-center mb-6'>
                    <Avatar className='w-32 h-32 mb-4'>
                      {avatarPreview ? (
                        <AvatarImage src={avatarPreview} />
                      ) : (
                        <AvatarImage src="https://github.com/shadcn.png" />
                      )}
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div
                      className='bg-[#2F3B10] p-2 rounded-full absolute bottom-4 right-1 cursor-pointer'
                      onClick={handleAvatarClick}
                    >
                      <BiEditAlt size={22} color='EAFFB8' />
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                  <h3 className='text-black opacity-50 font-medium text-sm'>Tambahkan Profil Baru</h3>
                </div>
                <Separator className="py-48 mx-16 bg-fourth" orientation='vertical' />
                <div className="flex flex-col gap-4 items-start pr-10 w-[700px]">
                  <h3 className='font-medium text-black opacity-25 text-lg mb-10'>Jawab Pertanyaannya dengan baik & benar ya!</h3>
                  <div className='flex flex-col gap-2 w-full'>
                    <h3 className='font-bold text-base text-black'>Nama Lengkap</h3>
                    <Input
                      className='border-2 border-black w-full'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className='flex flex-col gap-2 w-full'>
                    <h3 className='font-bold text-base text-black'>Jenis Kelamin</h3>
                    <div className='flex gap-4 w-full'>
                      <Toggle
                        className='border-2 border-black'
                        pressed={selectedGender === "pria"}
                        onPressedChange={() => setSelectedGender("pria")}
                      >
                        Pria
                      </Toggle>
                      <Toggle
                        className='border-2 border-black'
                        pressed={selectedGender === "wanita"}
                        onPressedChange={() => setSelectedGender("wanita")}
                      >
                        Wanita
                      </Toggle>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2 w-full'>
                    <h3 className='font-bold text-base text-black'>Usia</h3>
                    <Input
                      className='border-2 border-black w-full'
                      type="number"
                      value={age || ''}
                      onChange={(e) => setAge(Number(e.target.value))}
                    />
                  </div>
                  <div
                    className='flex items-center justify-end gap-1 w-full mt-10 cursor-pointer'
                    onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 5))}
                  >
                    <span className='font-bold'>Lanjut</span>
                    <TiArrowRight size={20} />
                  </div>
                </div>
              </div>
            )}
            {currentStep === 1 && (
              <div className="flex items-center justify-center w-full max-w-[1200px] py-10">
                <div className='flex flex-col items-center w-1/2 pl-10'>
                  <div className='relative flex flex-col items-center justify-center mb-6'>
                    <IoIosBody size={300} />
                  </div>
                </div>
                <Separator className="py-48 mx-16 bg-fourth" orientation='vertical' />
                <div className="flex flex-col gap-4 items-start pr-10 w-[700px]">
                  <h3 className='font-medium text-black opacity-25 text-lg mb-10'>Jawab Pertanyaannya dengan baik & benar ya!</h3>
                  <div className='flex flex-col gap-2 w-2/3'>
                    <h3 className='font-bold text-base text-black'>Berat Badan</h3>
                    <Input
                      className='border-2 border-black w-2/3'
                      type='number'
                      value={weight || ""}
                      onChange={(e) => setWeight(Number(e.target.value))}
                    />
                  </div>
                  <div className='flex flex-col gap-2 w-2/3'>
                    <h3 className='font-bold text-base text-black'>Tinggi Badan</h3>
                    <Input
                      className='border-2 border-black w-2/3'
                      type='number'
                      value={height || ''}
                      onChange={(e) => setHeight(Number(e.target.value))}
                    />
                  </div>
                  <div className='flex items-center justify-between gap-2 w-full'>
                    <div
                      className='flex items-center justify-start gap-1 w-full mt-10 cursor-pointer'
                      onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
                    >
                      <TiArrowLeft size={20} />
                      <span className='font-bold'>Kembali</span>
                    </div>
                    <div
                      className='flex items-center justify-end gap-1 w-full mt-10 cursor-pointer'
                      onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 5))}
                    >
                      <span className='font-bold'>Lanjut</span>
                      <TiArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div className="flex items-center justify-center w-full max-w-[1200px] py-10">
                <div className='flex flex-col items-center w-1/2 pl-10'>
                  <div className='relative flex flex-col items-center justify-center mb-6'>
                    <Image
                      src="/assets/icon/document-medicine.svg"
                      alt="Health Image"
                      width={300}
                      height={300}
                      className="object-cover"
                      draggable="false"
                    />
                  </div>
                </div>
                <Separator className="py-48 mx-16 bg-fourth" orientation='vertical' />
                <div className="flex flex-col gap-4 items-start pr-10 w-[700px]">
                  <h3 className='font-medium text-black opacity-25 text-lg mb-10'>Jawab Pertanyaannya dengan baik & benar ya!</h3>
                  <div className='flex flex-col gap-2 w-full'>
                    <h3 className='font-bold text-base text-black'>Riwayat kesehatan/penyakit?</h3>
                    <Input
                      className='border-2 border-black w-3/4'
                      type='text'
                      value={healthHistory || ""}
                      onChange={(e) => setHealthHistory(e.target.value)}
                    />
                  </div>
                  <div className='flex flex-col gap-2 w-full'>
                    <h3 className='font-bold text-base text-black'>Memiliki pantangan makanan?</h3>
                    <Input
                      className='border-2 border-black w-3/4'
                      type='text'
                      value={foodRestrictions || ""}
                      onChange={(e) => setFoodRestrictions(e.target.value)}
                    />
                  </div>
                  <div className='flex items-center justify-between gap-2 w-full'>
                    <div
                      className='flex items-center justify-start gap-1 w-full mt-10 cursor-pointer'
                      onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
                    >
                      <TiArrowLeft size={20} />
                      <span className='font-bold'>Kembali</span>
                    </div>
                    <div
                      className='flex items-center justify-end gap-1 w-full mt-10 cursor-pointer'
                      onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 5))}
                    >
                      <span className='font-bold'>Lanjut</span>
                      <TiArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {currentStep === 3 && (
              <div className="flex items-center justify-center w-full max-w-[1200px] py-10">
                <div className='flex flex-col items-center w-1/2 pl-10'>
                  <div className='relative flex flex-col items-center justify-center mb-6'>
                    <MdDirectionsWalk size={300} />
                  </div>
                </div>
                <Separator className="py-48 mx-16 bg-fourth" orientation='vertical' />
                <div className="flex flex-col gap-4 items-start pr-10 w-[700px]">
                  <h3 className='font-medium text-black opacity-25 text-lg mb-10'>Jawab Pertanyaannya dengan baik & benar ya!</h3>
                  <div className='flex flex-col gap-2 w-full'>
                    <h3 className='font-bold text-base text-black'>Aktivitas harian</h3>
                    <Input
                      className='border-2 border-black w-5/6'
                      type='text'
                      value={dailyActivity || ""}
                      onChange={(e) => setDailyActivity(e.target.value)}
                    />
                  </div>
                  <div className='flex flex-col gap-2 w-full'>
                    <h3 className='font-bold text-base text-black'>Seberapa aktif Anda dalam kehidupan sehari-hari?</h3>
                    <div className='w-5/6'>
                      <Select onValueChange={(value) => setActivityLevel(value)}>
                        <SelectTrigger className="w-full border-2 border-black">
                          <SelectValue placeholder="Pilih" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="sangat aktif">Sangat Aktif</SelectItem>
                            <SelectItem value="aktif">Aktif</SelectItem>
                            <SelectItem value="biasa saja">Biasa Saja</SelectItem>
                            <SelectItem value="tidak aktif">Tidak Aktif</SelectItem>
                            <SelectItem value="sangat tidak aktif">Sangat Tidak Aktif</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className='flex items-center justify-between gap-2 w-full'>
                    <div
                      className='flex items-center justify-start gap-1 w-full mt-10 cursor-pointer'
                      onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
                    >
                      <TiArrowLeft size={20} />
                      <span className='font-bold'>Kembali</span>
                    </div>
                    <div
                      className='flex items-center justify-end gap-1 w-full mt-10 cursor-pointer'
                      onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 5))}
                    >
                      <span className='font-bold'>Lanjut</span>
                      <TiArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {currentStep === 4 && (
              <div className="flex items-center justify-center w-full max-w-[1200px] py-10">
                <div className='flex flex-col items-center w-1/2 pl-10'>
                  <div className='relative flex flex-col items-center justify-center mb-6'>
                    <MdFoodBank size={300} />
                  </div>
                </div>
                <Separator className="py-48 mx-16 bg-fourth" orientation='vertical' />
                <div className="flex flex-col gap-4 items-start pr-10 w-[700px]">
                  <h3 className='font-medium text-black opacity-25 text-lg mb-10'>Jawab Pertanyaannya dengan baik & benar ya!</h3>
                  <div className='flex flex-col gap-2 w-full'>
                    <h3 className='font-bold text-base text-black'>Berapa kali anda makan dalam satu hari</h3>
                    <Input
                      className='border-2 border-black w-5/6'
                      type='text'
                      value={mealsPerDay || ""}
                      onChange={(e) => setMealsPerDay(e.target.value)}
                    />
                  </div>
                  <div className='flex flex-col gap-2 w-full'>
                    <h3 className='font-bold text-base text-black'>Makanan apa yang anda sukai</h3>
                    <Input
                      className='border-2 border-black w-5/6'
                      type='text'
                      value={favoriteFoods || ""}
                      onChange={(e) => setFavoriteFoods(e.target.value)}
                    />
                  </div>
                  <div className='flex items-center justify-between gap-2 w-full'>
                    <div
                      className='flex items-center justify-start gap-1 w-full mt-10 cursor-pointer'
                      onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
                    >
                      <TiArrowLeft size={20} />
                      <span className='font-bold'>Kembali</span>
                    </div>
                    <div
                      className='flex items-center justify-end gap-1 w-full mt-10 cursor-pointer'
                      onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 5))}
                    >
                      <span className='font-bold'>Lanjut</span>
                      <TiArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {currentStep === 5 && (
              <div className="flex items-center justify-center w-full max-w-[1200px] py-10">
                <div className='flex flex-col items-center w-1/2 pl-10'>
                  <div className='relative flex flex-col items-center justify-center mb-6'>
                    <MdRecordVoiceOver size={300} />
                  </div>
                </div>
                <Separator className="py-48 mx-16 bg-fourth" orientation='vertical' />
                <div className="flex flex-col gap-4 items-start pr-10 w-[700px]">
                  <h3 className='font-medium text-black opacity-25 text-lg mb-10'>Jawab Pertanyaannya dengan baik & benar ya!</h3>
                  <div className='flex flex-col gap-2 w-full'>
                    <h3 className='font-bold text-base text-black'>Tujuan utama anda menggunakan aplikasi ini</h3>
                    <Input
                      className='border-2 border-black w-5/6'
                      type='text'
                      value={appPurpose || ""}
                      onChange={(e) => setAppPurpose(e.target.value)}
                    />
                  </div>
                  <div className='flex items-center justify-between gap-2 w-full'>
                    <div
                      className='flex items-center justify-start gap-1 w-full mt-10 cursor-pointer'
                      onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
                    >
                      <TiArrowLeft size={20} />
                      <span className='font-bold'>Kembali</span>
                    </div>
                    <div
                      className='flex items-center justify-end gap-1 w-full mt-10 cursor-pointer'
                      onClick={() => handleSubmit()}
                    >
                      <span className='font-bold'>Kirim</span>
                      <TiArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default FormAccount;
