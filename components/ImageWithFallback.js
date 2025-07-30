import Image from "next/image";
import { useState } from "react";

export default function ImageWithFallback({ src, alt, fallbackSrc, ...rest }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  return hasError ? (
    <Image src={fallbackSrc} alt={alt} {...rest} />
  ) : (
    <img src={imgSrc} alt={alt} onError={handleImageError} {...rest} />
  );
}
