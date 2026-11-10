// Figma prototype exports: gentle layout spring, slow photograph spring, ease-out dissolve.
export const projectLayoutSpring = {
  type: "spring" as const,
  mass: 1,
  stiffness: 100,
  damping: 15,
};
export const projectPhotoSpring = {
  type: "spring" as const,
  mass: 1,
  stiffness: 80,
  damping: 20,
};
export const projectDissolve = {
  duration: 0.3,
  ease: [0, 0, 0.58, 1] as [number, number, number, number],
};
export const projectPhotoTransitionMs = 1250;
export const projectPhotoHoldMs = 800;

const decodedImages = new Map<string, Promise<void>>();

export function preloadProjectPhoto(url: string) {
  const cached = decodedImages.get(url);
  if (cached) return cached;
  const image = new window.Image();
  image.src = url;
  const loaded = image.decode().catch((error) => {
    decodedImages.delete(url);
    throw error;
  });
  const oldest = decodedImages.keys().next().value;
  if (decodedImages.size >= 32 && oldest) decodedImages.delete(oldest);
  decodedImages.set(url, loaded);
  return loaded;
}

// Normalize Figma's overdamped Slow spring to its specified 1.25-second timeline.
// This retains the exported 80/20 spring response and ends each transition on time.
const root = Math.sqrt(
  projectPhotoSpring.damping ** 2 - 4 * projectPhotoSpring.stiffness,
);
const r1 = (-projectPhotoSpring.damping + root) / 2;
const r2 = (-projectPhotoSpring.damping - root) / 2;
const slowResponse = (seconds: number) =>
  1 - (r2 * Math.exp(r1 * seconds) - r1 * Math.exp(r2 * seconds)) / (r2 - r1);
export const projectPhotoTransition = {
  duration: projectPhotoTransitionMs / 1000,
  ease: (progress: number) =>
    slowResponse((progress * projectPhotoTransitionMs) / 1000) /
    slowResponse(projectPhotoTransitionMs / 1000),
};
