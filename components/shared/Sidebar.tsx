"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MenuUtama from '@/public/assets/icon_menu/icon_menuUtama.svg';
import AnalisisNutrisi from '@/public/assets/icon_menu/icon_analisisNutrisi.svg';
import SaranMenu from '@/public/assets/icon_menu/icon_saranMenu.svg';
import MonitorKonsumsi from '@/public/assets/icon_menu/icon_monitor.svg';
import Chatbot from '@/public/assets/icon_menu/icon_chatbot.svg';
import Resep from '@/public/assets/icon_menu/icon_resep.svg';
import PusatInformasi from '@/public/assets/icon_menu/icon_pusatInformasi.svg';
import Keluar from '@/public/assets/icon_menu/icon_logout.svg';
import Image from 'next/image';

const Sidebar = () => {
    const pathname = usePathname();

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
            title: "Monitor Konsumsi",
            url: "/monitor-konsumsi",
            activeIcon: MonitorKonsumsi,
            inactiveIcon: MonitorKonsumsi,
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
        },
        {
            title: "Pusat Informasi",
            url: "/pusat-informasi",
            activeIcon: PusatInformasi,
            inactiveIcon: PusatInformasi,
        }
    ];

    return (
        <div className="sticky">
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
                                    className={`flex items-center gap-3 w-[250px] rounded-[50px] py-3 px-4 
                                ${isActive ? 'bg-[#EAFFB8] text-fourth' : 'bg-transparent text-black'}`}
                                >
                                    <Image src={isActive ? item.activeIcon : item.inactiveIcon} alt={item.title} />
                                    {item.title}
                                </li>
                            </Link>
                        );
                    })}
                </ul>
                <div className='flex items-center gap-3'>
                    <Image
                        src={Keluar}
                        alt="Logo"
                        width={50}
                        height={50}
                        draggable={false}
                        className="cursor-pointer"
                    />
                    <span>
                        Keluar
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
