import { useEffect, useRef, useState } from 'react';

// Lazy-loaded image with intrinsic dimensions (no layout shift) and a soft fade-in.
// When optimized WebP versions exist (image.srcSet), it renders <picture>: the browser picks the WebP size that
// fits `sizes`, and falls back to the original JPEG. The <picture> wrapper uses `display: contents`, so the <img>
// lays out exactly as before.
export default function Img({ image, className = '', eager = false, sizes = '100vw', ...rest }) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth) setLoaded(true);
  }, [image.src]);

  const img = (
    <img
      ref={ref}
      src={image.src}
      width={image.width}
      height={image.height}
      alt={image.alt}
      sizes={image.srcSet ? undefined : sizes}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchpriority={eager ? 'high' : undefined}
      onLoad={() => setLoaded(true)}
      className={`img ${loaded ? 'is-loaded' : ''} ${className}`}
      {...rest}
    />
  );

  if (!image.srcSet) return img;
  return (
    <picture className="img-picture">
      <source type="image/webp" srcSet={image.srcSet} sizes={sizes} />
      {img}
    </picture>
  );
}
