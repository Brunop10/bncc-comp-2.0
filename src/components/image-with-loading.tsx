import { useState } from "react";
import { ImageLoading } from "./ui/image-loading";

interface ImageWithLoadingProps {
  src: string;
  alt: string;
  className?: string;
}

export function ImageWithLoading({ src, alt, className }: ImageWithLoadingProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return null;
  }

  return (
    <div className="w-full flex justify-center mt-4">
      {isLoading && (
        <div className="flex flex-col items-center justify-center w-full max-w-md space-y-3">
          <ImageLoading size="lg" />
          <p className="text-sm text-muted-foreground">Carregando imagem...</p>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? 'hidden' : ''}`}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}