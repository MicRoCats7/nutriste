'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import * as API_NUTRITION from '@/service/apiNutrition';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLoading } from '@/context/LoadingContext';

const chartConfig = {
  visitors: { label: 'Visitors' },
  mobile: {
    label: 'Kalori',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState<'7d' | '30d' | '90d'>('7d');
  const [data, setData] = React.useState<any>([]);
  const { setLoading } = useLoading();

  React.useEffect(() => {
    setLoading(true);

    API_NUTRITION.getCalories(timeRange)
      .then((res) => {
        const grouped = res?.data?.history.reduce((acc: Record<string, number>, item: any) => {
          const date = new Date(item.date).toISOString().split('T')[0]; // YYYY-MM-DD
          acc[date] = (acc[date] || 0) + item.totalCalories;
          return acc;
        }, {});

        const formatted = Object.entries(grouped).map(([date, total]) => ({
          date,
          mobile: total,
        }));

        formatted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        setData(formatted);
      })
      .catch((err) => {
        console.error('Error fetching calories:', err);
      })
      .finally(() => setLoading(false));
  }, [timeRange]);
  

  return (
    <Card className="bg-[#F8FFF0] rounded-[30px] p-5 mt-4 border-none">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-2xl text-fourth font-bold">Monitor Konsumsi</CardTitle>
          <CardDescription className="text-sm text-fourth font-normal">Pantau terus kegiatan konsumsi kalorimu!</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={(v) => setTimeRange(v as '7d' | '30d' | '90d')}>
          <SelectTrigger className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex">
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })
                  }
                  indicator="dot"
                />
              }
            />
            <Area dataKey="mobile" type="natural" fill="url(#fillMobile)" stroke="var(--color-mobile)" />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
