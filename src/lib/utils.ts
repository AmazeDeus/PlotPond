import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Creates a debounced version of a function that delays its execution until after a specified wait time
 * has elapsed since the last time it was invoked.
 * 
 * @template T - The type of the function to debounce
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @returns A debounced version of the function that will only execute after the wait time has elapsed
 * 
 * @example
 * const debouncedSearch = debounce((query: string) => {
 *   // Perform search
 * }, 300);
 * 
 * // Will only execute after 300ms of no calls
 * debouncedSearch("test");
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};