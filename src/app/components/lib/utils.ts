import { clsx, type ClassValue } from 'clsx';
import type { SyntheticEvent } from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleImageError(
  event: SyntheticEvent<HTMLImageElement>,
  fallbackSrc: string,
) {
  const img = event.currentTarget;
  if (img.dataset.fallbackApplied !== 'true') {
    img.dataset.fallbackApplied = 'true';
    img.src = fallbackSrc;
    return;
  }
  img.style.display = 'none';
}
