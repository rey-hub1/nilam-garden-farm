export default function Logo({ eager = false }) {
  return (
    <img
      className="brand-logo"
      src="/logo-nilam.jpg"
      alt="Logo Nilam Garden Farm"
      width="48"
      height="48"
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : 'auto'}
    />
  );
}
