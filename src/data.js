// Data ringan — dipisah agar section yang di-lazy bisa import tanpa
// membawa semua data ke chunk awal.
export const Arrow = ({ diagonal = false }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d={diagonal ? 'M5 19 19 5M7 5h12v12' : 'M4 12h15M13 6l6 6-6 6'} />
  </svg>
);

export const cards = [
  { image: '/kebun-1.jpg', number: '01', category: 'Kebun', title: 'Tumbuh dengan perhatian', alt: 'Barisan tanaman di kebun Nilam dilihat dari udara' },
  { video: '/kebun-video.mp4', poster: '/kebun-video-poster.jpg', number: '02', category: 'Kehidupan', title: 'Dekat dengan alam', alt: 'Suasana kebun Nilam dari udara' },
  { image: '/kebun-3.jpg', number: '03', category: 'Tanaman', title: 'Mengikuti ritme musim', alt: 'Tanaman kacang panjang di kebun Nilam' },
];

export const produce = [
  { name: 'Kacang panjang', image: '/kacang-panjang-baru.jpg' },
  { name: 'Timun', image: '/timun.jpeg' },
  { name: 'Terong', image: '/terong.jpeg' },
  { name: 'Tomat', image: '/tomat.jpg' },
  { name: 'Cabai', image: '/cabai.jpg' },
];
