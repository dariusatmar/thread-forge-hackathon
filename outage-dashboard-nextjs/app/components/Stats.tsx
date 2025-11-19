'use client';

import { motion } from 'framer-motion';
import { formatNumber } from '@/lib/utils';
import type { StatsResponse } from '@/types';
import { Phone, Users } from 'lucide-react';

interface StatsProps {
  data: StatsResponse | undefined;
  isLoading: boolean;
}

export function Stats({ data, isLoading }: StatsProps) {
  const stats = [
    {
      label: 'Total NetOps Calls',
      value: data?.total_calls || 0,
      icon: Phone,
      formatter: formatNumber,
    },
    {
      label: 'Unique Customers Affected',
      value: data?.unique_customers || 0,
      icon: Users,
      formatter: formatNumber,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded bg-white border-2 border-black"
          >
            <div className="px-4 py-3">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-gray-600">
                  {stat.label}
                </p>
                <div className="p-2 rounded bg-gray-100 border border-black">
                  <Icon className="w-4 h-4 text-black" />
                </div>
              </div>
              {isLoading ? (
                <div className="h-6 bg-gray-100 rounded animate-pulse"></div>
              ) : (
                <p className="text-2xl font-bold text-black">
                  {stat.formatter(stat.value)}
                </p>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
