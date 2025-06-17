'use client';

import Navbar from '@/components/shared/Navbar';
import React, { useRef } from 'react';
import * as API_NUTRITION from '@/service/apiNutrition';
import { useLoading } from '@/context/LoadingContext';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BiEditAlt } from 'react-icons/bi';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function Profile() {
  const [profile, setProfile] = React.useState<any>({});
  const router = useRouter();
  const { setLoading } = useLoading();
  const [editField, setEditField] = React.useState<string | null>(null);
  const [avatarFile, setAvatarFile] = React.useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = React.useState('');
  const [selectedGender, setSelectedGender] = React.useState('');
  const [age, setAge] = React.useState<number | string>(0);
  const [weight, setWeight] = React.useState<number | string>(0);
  const [height, setHeight] = React.useState<number | string>(0);
  const [healthHistory, setHealthHistory] = React.useState('');
  const [foodRestrictions, setFoodRestrictions] = React.useState('');
  const [dailyActivity, setDailyActivity] = React.useState('');
  const [activityLevel, setActivityLevel] = React.useState('');
  const [mealsPerDay, setMealsPerDay] = React.useState('');
  const [favoriteFoods, setFavoriteFoods] = React.useState('');
  const [appPurpose, setAppPurpose] = React.useState('');

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const toggleEdit = (field: string) => {
    setEditField((prev) => (prev === field ? null : field));
  };

  const getProfile = async () => {
    setLoading(true);
    try {
      const res = await API_NUTRITION.getProfile();
      const data = res.data.data;

      setProfile(data);
      setName(data?.name || '');
      setSelectedGender(data?.gender || '');
      setAge(data?.age || 0);
      setWeight(data?.weight || 0);
      setHeight(data?.height || 0);
      setHealthHistory(data?.healthCondition || '');
      setFoodRestrictions(data?.foodRestrictions || '');
      setDailyActivity(data?.activity || '');
      setActivityLevel(data?.activeStatus || '');
      setMealsPerDay(data?.mealsPerDay || '');
      setFavoriteFoods(data?.favouriteFood || '');
      setAppPurpose(data?.purposes || '');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Gagal memuat profil');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    if (selectedGender) formData.append('gender', selectedGender);
    formData.append('age', String(age));
    formData.append('weight', String(weight));
    formData.append('height', String(height));
    formData.append('healthCondition', healthHistory);
    formData.append('foodRestrictions', foodRestrictions);
    formData.append('activity', dailyActivity);
    formData.append('activeStatus', activityLevel);
    formData.append('mealsPerDay', mealsPerDay);
    formData.append('favouriteFood', favoriteFoods);
    formData.append('purposes', appPurpose);
    if (avatarFile) formData.append('photo', avatarFile);

    try {
      const res = await API_NUTRITION.addProfile(formData);
      toast.success(res.data.message || 'Profil berhasil diperbarui');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Gagal memperbarui profil');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getProfile();
  }, []);

  return (
    <main className="p-4">
      <Navbar photo={profile?.photo} />

      <div className="mt-6 bg-white">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="w-24 h-24">
              <AvatarImage src={avatarPreview || profile?.photo} alt="Avatar" />
              <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <button type="button" className="absolute bottom-0 right-0 bg-gray-200 p-1 rounded-full" onClick={handleAvatarClick}>
              <BiEditAlt className="text-xl" />
            </button>
            <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileChange} className="hidden" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-sm text-gray-500">{selectedGender}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <label>Nama</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label>Gender</label>
            <Select value={selectedGender} onValueChange={setSelectedGender}>
              <SelectTrigger className="hidden w-full rounded-lg sm:ml-auto sm:flex">
                <SelectValue placeholder="Pilih Gender" defaultValue={selectedGender} />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="Pria" className="rounded-lg">
                    Pria
                </SelectItem>
                <SelectItem value="Wanita" className="rounded-lg">
                    Wanita
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label>Usia</label>
            <Input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
          </div>
          <div>
            <label>Berat Badan (kg)</label>
            <Input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} />
          </div>
          <div>
            <label>Tinggi Badan (cm)</label>
            <Input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
          </div>
          <div>
            <label>Riwayat Kesehatan</label>
            <Input value={healthHistory} onChange={(e) => setHealthHistory(e.target.value)} />
          </div>
          <div>
            <label>Pantangan Makanan</label>
            <Input value={foodRestrictions} onChange={(e) => setFoodRestrictions(e.target.value)} />
          </div>
          <div>
            <label>Aktivitas Harian</label>
            <Input value={dailyActivity} onChange={(e) => setDailyActivity(e.target.value)} />
          </div>
          <div>
            <label>Status Aktif</label>
            <Input value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} />
          </div>
          <div>
            <label>Jumlah Makan Per Hari</label>
            <Input value={mealsPerDay} onChange={(e) => setMealsPerDay(e.target.value)} />
          </div>
          <div>
            <label>Makanan Favorit</label>
            <Input value={favoriteFoods} onChange={(e) => setFavoriteFoods(e.target.value)} />
          </div>
          <div>
            <label>Tujuan Menggunakan Aplikasi</label>
            <Input value={appPurpose} onChange={(e) => setAppPurpose(e.target.value)} />
          </div>
        </div>

        <div className="mt-6">
          <Button onClick={handleSubmit}>Simpan Perubahan</Button>
        </div>
      </div>
    </main>
  );
}

export default Profile;