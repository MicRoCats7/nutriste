import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';

function Navbar() {
  const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-4xl font-normal text-fourth">
            Halo <strong>{username ? username.split(' ')[0] : ''}!</strong>!
          </h3>
          <p className="text-lg text-fourth opacity-45">Ayo kita mulai hidup lebih sehat!</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-full">
            <Search className="text-[#4C572D] w-5 h-5 absolute top-3.5 left-3" />
            <Input type="text" placeholder="Cari..." className="w-full bg-white border border-[#4C572D] rounded-full pl-10 pr-2 py-6 outline-none" />
          </div>
          <Avatar className="cursor-pointer w-12 h-12">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
