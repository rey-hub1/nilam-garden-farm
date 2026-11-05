import { useState } from 'react';
import Skeleton from './Skeleton';

// Gambar yang baru mulai download saat mendekati viewport.
// `eager` untuk hero/LCP. Skeleton ditahan s/d decode selesai.
export default function LazyImage({
  src,
  alt,
  className,
  ratio = '4/3',
  eager = false,
  width,
  height,
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <>
      {!loaded && !failed && <Skeleton label={alt} ratio={ratio} />}
      {!failed && (
        <img
          className={`${className ?? ''}${loaded ? ' media-in' : ' media-fade'}`}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={eager ? 'high' : 'low'}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          style={loaded ? undefined : { position: 'absolute', visibility: 'hidden', opacity: 0 }}
        />
      )}
    </>
  );
}
