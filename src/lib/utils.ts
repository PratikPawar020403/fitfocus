
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(value: number, decimals: number = 1): string {
  return value.toFixed(decimals);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

export function showToast(
  message: string, 
  type: 'success' | 'error' | 'info' | 'warning' = 'info'
) {
  toast[type](message, {
    position: 'top-center',
    duration: 3000,
  });
}

export function clampValue(value: number, min: number, max: number): number {
  if (value < min) {
    showToast(`Value must be at least ${min}`, 'warning');
    return min;
  }
  if (value > max) {
    showToast(`Value must be at most ${max}`, 'warning');
    return max;
  }
  return value;
}

export function getStaticBasePath(): string {
  // In a real app, you might want to use environment variables here
  return '';
}

// Health status determination
export type HealthStatus = 'optimal' | 'warning' | 'risk' | 'neutral';

export function getStatusColor(status: HealthStatus): string {
  switch (status) {
    case 'optimal': return 'text-emerald-600 dark:text-emerald-400';
    case 'warning': return 'text-amber-600 dark:text-amber-400';
    case 'risk': return 'text-rose-600 dark:text-rose-400';
    default: return 'text-blue-600 dark:text-blue-400';
  }
}

export function getProgressBgColor(status: HealthStatus): string {
  switch (status) {
    case 'optimal': return 'bg-emerald-100 dark:bg-emerald-900/30';
    case 'warning': return 'bg-amber-100 dark:bg-amber-900/30';
    case 'risk': return 'bg-rose-100 dark:bg-rose-900/30';
    default: return 'bg-gray-100 dark:bg-gray-800';
  }
}

export function getProgressFillColor(status: HealthStatus): string {
  switch (status) {
    case 'optimal': return 'bg-emerald-500';
    case 'warning': return 'bg-amber-500';
    case 'risk': return 'bg-rose-500';
    default: return 'bg-blue-500';
  }
}

// Helper function to convert kg to lbs
export function kgToLbs(kg: number): number {
  return kg * 2.20462;
}

// Helper function to convert lbs to kg
export function lbsToKg(lbs: number): number {
  return lbs / 2.20462;
}

// Helper function to convert cm to inches
export function cmToInches(cm: number): number {
  return cm / 2.54;
}

// Helper function to convert inches to cm
export function inchesToCm(inches: number): number {
  return inches * 2.54;
}

// Format time (for sleep efficiency, etc.)
export function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}
