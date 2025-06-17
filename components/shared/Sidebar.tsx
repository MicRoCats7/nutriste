"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import MenuUtama from '@/public/assets/icon_menu/icon_menuUtama.svg';
import AnalisisNutrisi from '@/public/assets/icon_menu/icon_analisisNutrisi.svg';
import SaranMenu from '@/public/assets/icon_menu/icon_saranMenu.svg';
import Chatbot from '@/public/assets/icon_menu/icon_chatbot.svg';
import Resep from '@/public/assets/icon_menu/icon_resep.svg';
import Keluar from '@/public/assets/icon_menu/icon_logout.svg';
import Image from 'next/image';
import * as API_AUTH from '@/service/apiAuth';
import { useLoading } from '@/context/LoadingContext';
import { toast } from 'sonner';

const Sidebar = () => {
    const pathname = usePathname();
    const { setLoading } = useLoading();
    const router = useRouter();

    const items = [
        {
            title: "Menu Utama",
            url: "/menu-utama",
            activeIcon: MenuUtama,
            inactiveIcon: MenuUtama,
        },
        {
            title: "Analisis Nutrisi",
            url: "/analisis-nutrisi",
            activeIcon: AnalisisNutrisi,
            inactiveIcon: AnalisisNutrisi,
        },
        {
            title: "Saran Menu",
            url: "/saran-menu",
            activeIcon: SaranMenu,
            inactiveIcon: SaranMenu,
        },
        {
            title: "AI Chatbot",
            url: "/ai-chatbot",
            activeIcon: Chatbot,
            inactiveIcon: Chatbot,
        },
        {
            title: "Resep & Tips Sehat",
            url: "/resep-tips-sehat",
            activeIcon: Resep,
            inactiveIcon: Resep,
        }
    ];

    const handleLogout = async () => {
      setLoading(true);

      await API_AUTH.Logout()
        .then((res) => {
          toast.success("Logout berhasil");
          router.push("/login");
          localStorage.removeItem("token");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    return (
        <div className="sticky top-4">
            <div className='flex flex-col gap-16'>
                <Image
                    src="/assets/logoSingle.svg"
                    alt='logo'
                    width={113}
                    height={92}
                    draggable={false}
                    className='cursor-pointer'
                />
                <ul className='flex flex-col gap-4'>
                    {items.map((item, index) => {
                        const isActive = pathname === item.url;
                        return (
                            <Link href={item.url} key={index}>
                                <li
                                    className={`flex items-center text-sm gap-3 w-[250px] rounded-[50px] py-3 px-4 
                                ${isActive ? 'bg-[#EAFFB8] text-fourth' : 'bg-transparent text-black'}`}
                                >
                                    <Image src={isActive ? item.activeIcon : item.inactiveIcon} alt={item.title} />
                                    {item.title}
                                </li>
                            </Link>
                        );
                    })}
                </ul>
                <div className='flex items-center gap-3 mt-10 cursor-pointer' onClick={handleLogout}>
                    <Image
                        src={Keluar}
                        alt="Logo"
                        width={40}
                        height={40}
                        draggable={false}
                        className="cursor-pointer"
                    />
                    <span className='text-sm text-black'>
                        Keluar
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
