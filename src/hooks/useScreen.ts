"use client";
import { useState, useEffect } from "react";

type ScreenSize =
  | "1280x720"
  | "1280x768"
  | "1280x800"
  | "1360x768"
  | "1366x768"
  | "1440x900"
  | "1536x960"
  | "1600x900"
  | "1680x1050"
  | "1512x982"
  | "1728x1117"
  | "1792x1120"
  | "1800x1169"
  | "1920x1080"
  | "1920x1200"
  | "2560x1440"
  | "2560x1600"
  | "2560x1080"
  | "3440x1440"
  | "3840x1600"
  | "3840x2160"
  | "5120x2880"
  | "6016x3384"
  | "desktop"
  | "unknown";

interface ScreenInfo {
  width: number;
  height: number;
  size: ScreenSize;

  // Exact resolution flags (all supported)
  is1280x720: boolean;
  is1280x768: boolean;
  is1280x800: boolean;
  is1360x768: boolean;
  is1366x768: boolean;
  is1440x900: boolean;
  is1536x960: boolean;
  is1600x900: boolean;
  is1680x1050: boolean;

  // MacBooks
  is1512x982: boolean;
  is1728x1117: boolean;
  is1792x1120: boolean;
  is1800x1169: boolean;

  // Full HD & higher
  is1920x1080: boolean;
  is1920x1200: boolean;

  // 2K / 1600p
  is2560x1440: boolean;
  is2560x1600: boolean;

  // Ultrawide
  is2560x1080: boolean;
  is3440x1440: boolean;
  is3840x1600: boolean;

  // 4K/5K/6K
  is3840x2160: boolean;
  is5120x2880: boolean;
  is6016x3384: boolean;

  // Generic fallback
  isDesktop: boolean;
}

export const useScreen = (): ScreenInfo => {
  const [screen, setScreen] = useState<ScreenInfo>({
    width: 0,
    height: 0,
    size: "unknown",

    is1280x720: false,
    is1280x768: false,
    is1280x800: false,
    is1360x768: false,
    is1366x768: false,
    is1440x900: false,
    is1536x960: false,
    is1600x900: false,
    is1680x1050: false,

    is1512x982: false,
    is1728x1117: false,
    is1792x1120: false,
    is1800x1169: false,

    is1920x1080: false,
    is1920x1200: false,

    is2560x1440: false,
    is2560x1600: false,
    is2560x1080: false,
    is3440x1440: false,
    is3840x1600: false,

    is3840x2160: false,
    is5120x2880: false,
    is6016x3384: false,

    isDesktop: false,
  });

  useEffect(() => {
    // Only match width with tolerance (ignore height)
    const matchWidth = (w: number, tw: number) => Math.abs(w - tw) <= 10;

    const getScreenSize = (): ScreenSize => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Width-based matching (sorted by width ascending)
      const widthResolutions: Array<{ width: number; size: ScreenSize }> = [
        { width: 1280, size: "1280x800" },
        { width: 1360, size: "1360x768" },
        { width: 1366, size: "1366x768" },
        { width: 1440, size: "1440x900" },
        { width: 1512, size: "1512x982" },
        { width: 1536, size: "1536x960" },
        { width: 1600, size: "1600x900" },
        { width: 1680, size: "1680x1050" },
        { width: 1728, size: "1728x1117" },
        { width: 1792, size: "1792x1120" },
        { width: 1800, size: "1800x1169" },
        { width: 1920, size: "1920x1080" },
        { width: 2560, size: "2560x1440" },
        { width: 3440, size: "3440x1440" },
        { width: 3840, size: "3840x2160" },
        { width: 5120, size: "5120x2880" },
        { width: 6016, size: "6016x3384" },
      ];

      // Find closest width match
      for (const res of widthResolutions) {
        if (matchWidth(w, res.width)) return res.size;
      }

      // Desktop fallback
      if (w >= 1024) return "desktop";

      return "unknown";
    };

    const update = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const size = getScreenSize();

      setScreen({
        width,
        height,
        size,

        // Auto-generate boolean flags
        ...Object.fromEntries(
          [
            "1280x720",
            "1280x768",
            "1280x800",
            "1360x768",
            "1366x768",
            "1440x900",
            "1536x960",
            "1600x900",
            "1680x1050",
            "1512x982",
            "1728x1117",
            "1792x1120",
            "1800x1169",
            "1920x1080",
            "1920x1200",
            "2560x1440",
            "2560x1600",
            "2560x1080",
            "3440x1440",
            "3840x1600",
            "3840x2160",
            "5120x2880",
            "6016x3384",
          ].map((r) => [`is${r.replace("x", "x")}`, size === r])
        ),

        isDesktop: size === "desktop",
      } as ScreenInfo);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return screen;
};
