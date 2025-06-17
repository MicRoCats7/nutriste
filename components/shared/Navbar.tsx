"use client";

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

function Navbar(props: any) {
  const router = useRouter();
  const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null;
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState(0);

  const items = [
    { title: "Menu Utama", url: "/menu-utama" },
    { title: "Analisis Nutrisi", url: "/analisis-nutrisi" },
    { title: "Saran Menu", url: "/saran-menu" },
    { title: "AI Chatbot", url: "/ai-chatbot" },
    { title: "Resep & Tips Sehat", url: "/resep-tips-sehat" }
  ];

  const filteredItems = searchTerm
    ? items.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSelect = (item: typeof items[0]) => {
    setSearchTerm('');
    setShowSuggestions(false);
    router.push(item.url);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-4xl font-normal text-fourth">
            Halo <strong className="capitalize">{username ? username.split(' ')[0] : ''}!</strong>
          </h3>
          <p className="text-lg text-fourth opacity-45">Ayo kita mulai hidup lebih sehat!</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-full">
            <Search className="text-[#4C572D] w-5 h-5 absolute top-3.5 left-3" />
            <Input
              type="text"
              placeholder="Cari menu..."
              className="w-full bg-white border border-[#4C572D] rounded-full pl-10 pr-2 py-6 outline-none"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
                setHighlightedIndex(0);
              }}
              onFocus={() => {
                if (searchTerm) setShowSuggestions(true);
              }}
              onBlur={() => {
                setTimeout(() => setShowSuggestions(false), 100);
              }}
              onKeyDown={(e) => {
                if (!filteredItems.length) return;
                if (e.key === 'ArrowDown') {
                  setHighlightedIndex((prev) => (prev + 1) % filteredItems.length);
                } else if (e.key === 'ArrowUp') {
                  setHighlightedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
                } else if (e.key === 'Enter') {
                  handleSelect(filteredItems[highlightedIndex]);
                }
              }}
            />
            {showSuggestions && filteredItems.length > 0 && (
              <ul className="absolute z-10 left-0 right-0 mt-1 bg-white border border-gray-200 rounded shadow">
                {filteredItems.map((item, idx) => (
                  <li
                    key={item.url}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                      idx === highlightedIndex ? 'bg-gray-100' : ''
                    }`}
                    onMouseDown={() => handleSelect(item)}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Avatar className="cursor-pointer w-12 h-12" onClick={() => router.push('/profile')}>
            <AvatarImage src={props.photo} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
