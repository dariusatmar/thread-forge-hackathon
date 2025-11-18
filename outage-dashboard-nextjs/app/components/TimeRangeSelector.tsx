'use client';

import { motion } from 'framer-motion';
import type { TimeRangeOption } from '@/types';

interface TimeRangeSelectorProps {
  selectedHours: number;
  onSelect: (hours: number) => void;
}

const TIME_RANGES: TimeRangeOption[] = [
  { label: 'Last Hour', hours: 1 },
  { label: 'Last 6 Hours', hours: 6 },
  { label: 'Last 24 Hours', hours: 24 },
  { label: 'Last Week', hours: 168 },
  { label: 'Last Month', hours: 720 },
];

export function TimeRangeSelector({ selectedHours, onSelect }: TimeRangeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {TIME_RANGES.map((range) => {
        const isSelected = selectedHours === range.hours;
        return (
          <motion.button
            key={range.hours}
            onClick={() => onSelect(range.hours)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              px-4 py-2 rounded-lg font-medium transition-all
              ${
                isSelected
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
              }
            `}
          >
            {range.label}
          </motion.button>
        );
      })}
    </div>
  );
}
