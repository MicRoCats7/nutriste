'use client';

import { Pie, PieChart } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip } from '@/components/ui/chart';

const chartConfig = {
  price: {
    label: 'Jumlah (g)',
  },
  karbohidrat: {
    label: 'Karbohidrat',
  },
  protein: {
    label: 'Protein',
  },
  lemak: {
    label: 'Lemak',
  },
} satisfies ChartConfig;

function CustomTooltip({ active, payload }: { active: boolean; payload: any }) {
  if (active && payload && payload.length) {
    const data: { type: keyof typeof chartConfig; price: number; fill: string } = payload[0].payload;
    const label = chartConfig[data.type]?.label || data.type;
    return (
      <div className="bg-white p-2 shadow-md rounded-lg flex flex-col items-start">
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: data.fill }} />
          <p className="text-gray-500 font-medium text-sm">{label}</p>
        </div>
        <p className="text-black font-bold text-sm">{data.price.toLocaleString()}g</p>
      </div>
    );
  }
  return null;
}

export function ChartNutrition({ data }: { data: any }) {
  const chartData = [
    { type: 'karbohidrat', price: data?.nutritionData?.[2]?.value || 0, fill: '#FEFEAA' },
    { type: 'protein', price: data?.nutritionData?.[1]?.value || 0, fill: '#6B994D' },
    { type: 'lemak', price: data?.nutritionData?.[3]?.value || 0, fill: '#2F3B10' },
  ];

  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
      <PieChart>
        <ChartTooltip cursor={false} content={<CustomTooltip active={true} payload={chartData} />} />
        <Pie data={chartData} dataKey="price" nameKey="type" innerRadius={60} />
      </PieChart>
    </ChartContainer>
  );
}
