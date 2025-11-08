import { useState, useEffect } from 'react';

export default function SafeImage({ src, alt = '', fallback, className = '', ...rest }) {
  const [imgSrc, setImgSrc] = useState(src || fallback);

  // if src changes, update the state (important for lists)
  useEffect(() => {
    setImgSrc(src || fallback);
  }, [src, fallback]);

  function handleError() {
    // only switch to fallback once
    if (imgSrc !== fallback) setImgSrc(fallback);
  }

  return (
    // using role="img" isn't necessary if alt is present — keep accessibility by providing alt
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={handleError}
      {...rest}
    />
  );
}
