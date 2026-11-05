import { useEffect, useRef, useState } from 'react';
import Skeleton from './Skeleton';

// Video lazy: sumber diset HANYA saat elemen mendekati viewport
// (IntersectionObserver, rootMargin besar agar selesai buffering sebelum
// pengguna scroll ke sana). Poster gantikan skeleton begitu decode selesai.
// Autoplay dipause di luar viewport → hemat baterai & kuota.
export default function LazyVideo({
  src,
  poster,
  label,
  className,
  ratio = '16/9',
  eager = false,
  autoPlay = true,
  fill = false,
}) {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const [near, setNear] = useState(eager);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    if (eager || !('IntersectionObserver' in window)) {
      setNear(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [eager]);

  // Pause saat keluar viewport, lanjutkan saat kembali (hanya autoplay).
  useEffect(() => {
    const el = wrapRef.current;
    const video = videoRef.current;
    if (!el || !video || !autoPlay) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near, autoPlay]);

  return (
    <span
      ref={wrapRef}
      className={`lazy-video${fill ? ' lazy-video-fill' : ''}`}
      style={{ aspectRatio: ratio }}
    >
      {!ready && !failed && <Skeleton label={label} ratio={ratio} dark />}
      {!failed && (
        <video
          ref={videoRef}
          className={`${className ?? ''}${ready ? ' media-in' : ' media-fade'}`}
          muted
          loop
          playsInline
          autoPlay={autoPlay && near}
          preload={near ? 'auto' : 'none'}
          poster={poster}
          aria-label={label}
          onCanPlay={() => setReady(true)}
          onError={() => setFailed(true)}
          src={near ? src : undefined}
          style={ready ? undefined : { position: 'absolute', visibility: 'hidden', opacity: 0 }}
        />
      )}
    </span>
  );
}
