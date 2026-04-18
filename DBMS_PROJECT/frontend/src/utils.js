import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const showToast = (message, type = 'success') => {
  window.dispatchEvent(new CustomEvent('showToast', { detail: { message, type } }));
};
