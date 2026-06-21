"use client";

import React, { useEffect, useState } from "react";
import { resolveApiAssetUrl } from "@/app/lib/media";
import { handleImageError } from "../lib/utils";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc: string;
}

const SafeImage = ({ src, fallbackSrc, alt, className, ...props }: SafeImageProps) => {
  const resolvedCandidate = resolveApiAssetUrl(typeof src === "string" ? src : undefined) ?? fallbackSrc;
  const [resolvedSrc, setResolvedSrc] = useState(fallbackSrc);

  useEffect(() => {
    if (!resolvedCandidate || resolvedCandidate === fallbackSrc) {
      setResolvedSrc(fallbackSrc);
      return;
    }

    setResolvedSrc(fallbackSrc);

    const img = new Image();
    img.onload = () => setResolvedSrc(resolvedCandidate);
    img.onerror = () => setResolvedSrc(fallbackSrc);
    img.src = resolvedCandidate;
  }, [resolvedCandidate, fallbackSrc]);
  return (
    <img
      {...props}
      src={resolvedSrc}
      alt={alt}
      className={className}
      onError={(e) => handleImageError(e, fallbackSrc)}
    />
  );
};

export default SafeImage;
