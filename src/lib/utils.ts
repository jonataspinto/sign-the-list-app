import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function copyToClipboard(value?: string, callback?: () => void) {
  if (value) {
    navigator.clipboard.writeText(value);
    callback?.();
  }
}
