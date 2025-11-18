'use client';

import { motion } from 'framer-motion';
import { formatDuration, formatNumber } from '@/lib/utils';
import type { StatsResponse } from '@/types';
import { Phone, Users, Clock, Calendar } from 'lucide-react';

interface StatsProps {
  data: StatsResponse | undefined;
  isLoading: boolean;
}

export function Stats({ data, isLoading }: StatsProps) {
  const stats = [
    {
      label: 'Total Calls',
      value: data?.total_calls || 0,
      icon: Phone,
      color: 'from-blue-500 to-cyan-500',
      formatter: formatNumber,
    },
    {
      label: 'Unique Customers',
      value: data?.unique_customers || 0,
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      formatter: formatNumber,
    },
    {
      label: 'Avg Duration',
      value: data?.avg_duration_minutes || 0,
      icon: Clock,
      color: 'from-orange-500 to-red-500',
      formatter: formatDuration,
    },
    {
      label: 'Last Call',
      value: data?.last_call_time
        ? new Date(data.last_call_time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
        : 'N/A',
      icon: Calendar,
      color: 'from-green-500 to-emerald-500',
      formatter: (val: any) => val,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative overflow-hidden rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`}></div>
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
                <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
              </div>
              {isLoading ? (
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              ) : (
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
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
