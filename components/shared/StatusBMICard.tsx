import React from 'react';
import { Badge } from '../ui/badge';

export const StatusBMICard = (props: any) => {
  return (
    <div className="text-base text-fourth flex flex-col items-center gap-2 py-1 px-6 bg-[#F8FFF0] rounded-[30px]">
      <span className="font-semibold">Status BMI</span>
      <div className="flex items-center gap-2">
        <span>{props.profile?.BMI?.toFixed(2)}</span>
        <Badge className="bg-[#EAFFE4] text-[#52713E]">Normal</Badge>
      </div>
    </div>
  );
};
