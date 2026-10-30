import { useState, type ImgHTMLAttributes } from 'react';
import { ImageOff } from 'lucide-react';

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'onLoad' | 'onError'> & {
  alt: string;
  wrapperClassName?: string;
};

/** Image with a shimmer placeholder while loading and a graceful fallback if it fails. */
export const SmoothImage = ({ alt, className = '', wrapperClassName = '', loading = 'lazy', ...rest }: Props) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  return (
    <div className={`relative overflow-hidden bg-beige-100 ${wrapperClassName}`}>
      {status !== 'loaded' && status !== 'error' && <div className="skeleton absolute inset-0" aria-hidden="true" />}
      {status === 'error' ? (
        <div
          role="img"
          aria-label={alt}
          className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blush-100 to-gold-100 text-cocoa-500"
        >
          <ImageOff className="h-8 w-8" aria-hidden="true" />
        </div>
      ) : (
        <img
          alt={alt}
          loading={loading}
          decoding="async"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={`h-full w-full object-cover transition-opacity duration-700 ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          {...rest}
        />
      )}
    </div>
  );
};
