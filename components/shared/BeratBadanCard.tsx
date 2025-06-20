import React from 'react';
import { HiOutlineChevronUpDown } from 'react-icons/hi2';

export const BeratBadanCard = (props: any) => {
  return (
    <div className="text-base font-bold text-fourth flex items-center gap-2 px-6 bg-[#F8FFF0] rounded-[30px]">
      <span className='text-sm w-full'>Berat Badan</span>
      <HiOutlineChevronUpDown size={35}/>
      <span>{props.profile?.weight}</span>
      <span className="underline">Kg</span>
    </div>
  );
};
