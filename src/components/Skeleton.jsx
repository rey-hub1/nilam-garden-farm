// Placeholder berbentuk sama dengan media asli → layout tidak lompat (CLS ~0)
// saat foto/video selesai dimuat.
export default function Skeleton({ label, ratio = '4/3', dark = false }) {
  return (
    <span
      className={`media-skeleton${dark ? ' media-skeleton-dark' : ''}`}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={label}
    >
      <span className="media-skeleton-shine" aria-hidden="true" />
    </span>
  );
}
