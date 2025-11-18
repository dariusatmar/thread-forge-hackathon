'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Stats } from './components/Stats';
import { Timeline } from './components/Timeline';
import { TimeRangeSelector } from './components/TimeRangeSelector';
import { useOutageData, useTimelineData, useStats } from '@/lib/hooks';
import { RefreshCw, Map, BarChart3 } from 'lucide-react';

// Dynamic imports for components that use client-side only libraries
const OutageMap = dynamic(() => import('./components/OutageMap').then((mod) => ({ default: mod.OutageMap })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-white/90 dark:bg-gray-800/90 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="animate-pulse h-full bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  ),
});

const ThreeDVisualization = dynamic(
  () => import('./components/ThreeDVisualization').then((mod) => ({ default: mod.ThreeDVisualization })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[600px] bg-white/90 dark:bg-gray-800/90 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="animate-pulse h-full bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    ),
  }
);

export default function DashboardPage() {
  const [selectedHours, setSelectedHours] = useState(24);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [view, setView] = useState<'2d' | '3d'>('2d');

  const {
    data: outageData,
    isLoading: outageLoading,
    refetch: refetchOutage,
  } = useOutageData(selectedHours);
  const {
    data: timelineData,
    isLoading: timelineLoading,
    refetch: refetchTimeline,
  } = useTimelineData(selectedHours);
  const { data: statsData, isLoading: statsLoading, refetch: refetchStats } = useStats(selectedHours);

  const handleRefresh = () => {
    refetchOutage();
    refetchTimeline();
    refetchStats();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Outage Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Real-time Technical Support Analytics
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefresh}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </motion.button>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setView('2d')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    view === '2d'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <Map className="w-4 h-4" />
                  2D Map
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setView('3d')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    view === '3d'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  3D View
                </motion.button>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Auto-refresh</span>
              </label>
            </div>
          </div>

          <div className="mt-6">
            <TimeRangeSelector selectedHours={selectedHours} onSelect={setSelectedHours} />
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Stats Cards */}
          <Stats data={statsData} isLoading={statsLoading} />

          {/* Map or 3D Visualization */}
          {view === '2d' ? (
            <OutageMap data={outageData} isLoading={outageLoading} />
          ) : (
            <ThreeDVisualization data={outageData} isLoading={outageLoading} />
          )}

          {/* Timeline Chart */}
          <Timeline data={timelineData} isLoading={timelineLoading} />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-6 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            Built with Next.js 14, React, TypeScript, Leaflet, Three.js, and Tailwind CSS
          </p>
          <p className="mt-1">
            Last updated: {statsData?.last_call_time ? new Date(statsData.last_call_time).toLocaleString() : 'N/A'}
          </p>
        </div>
      </footer>
    </div>
  );
}
