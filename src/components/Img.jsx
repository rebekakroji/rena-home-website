import { useEffect, useRef, useState } from 'react';

// Lazy-loaded image with intrinsic dimensions (no layout shift) and a soft fade-in.
export default function Img({ image, className = '', eager = false, sizes, ...rest }) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth) setLoaded(true);
  }, [image.src]);

  return (
    <img
      ref={ref}
      src={image.src}
      width={image.width}
      height={image.height}
      alt={image.alt}
      sizes={sizes}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchpriority={eager ? 'high' : undefined}
      onLoad={() => setLoaded(true)}
      className={`img ${loaded ? 'is-loaded' : ''} ${className}`}
      {...rest}
    />
  );
}
