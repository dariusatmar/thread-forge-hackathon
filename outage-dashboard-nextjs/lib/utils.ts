import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${Math.round(minutes)}m`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function getHeatmapColor(intensity: number): string {
  // Intensity from 0 to 1
  const colors = [
    { threshold: 0.0, color: '#00ff00' }, // Green
    { threshold: 0.2, color: '#88ff00' },
    { threshold: 0.4, color: '#ffff00' }, // Yellow
    { threshold: 0.6, color: '#ffaa00' }, // Orange
    { threshold: 0.8, color: '#ff5500' },
    { threshold: 1.0, color: '#ff0000' }, // Red
  ];

  for (let i = colors.length - 1; i >= 0; i--) {
    if (intensity >= colors[i].threshold) {
      return colors[i].color;
    }
  }
  return colors[0].color;
}
