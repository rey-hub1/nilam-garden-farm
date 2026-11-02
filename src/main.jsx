import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const Arrow = ({ diagonal = false }) => <svg viewBox="0 0 24 24" aria-hidden="true"><path d={diagonal ? 'M5 19 19 5M7 5h12v12' : 'M4 12h15M13 6l6 6-6 6'} /></svg>;
const Logo = () => <img className="brand-logo" src="/logo-nilam.jpg" alt="" width="48" height="48" />;

const cards = [
  { image: '/kebun-1.jpg', number: '01', category: 'Kebun', title: 'Tumbuh dengan perhatian', alt: 'Barisan tanaman di kebun Nilam dilihat dari udara' },
  { image: '/kebun-2.jpg', number: '02', category: 'Kehidupan', title: 'Dekat dengan alam', alt: 'Suasana kebun Nilam dilihat dari udara' },
  { image: '/kebun-3.jpg', number: '03', category: 'Tanaman', title: 'Mengikuti ritme musim', alt: 'Tanaman kacang panjang di kebun Nilam' },
];

const produce = [
  { name: 'Kacang panjang', image: '/kacang-panjang-baru.jpg' },
  { name: 'Timun', image: '/timun.jpg' },
  { name: 'Terong', image: '/terong.jpg' },
  { name: 'Tomat', image: '/tomat.jpg' },
  { name: 'Cabai', image: '/cabai.jpg' },
];
const mediaFiles = ['/hero-video.mp4', '/hero-video-poster.jpg', '/kebun-1.jpg', '/kebun-2.jpg', '/kebun-3.jpg', ...produce.map(item => item.image)];

function waitForMedia(url, isVideo) {
  if (!isVideo) {
    const image = new Image();
    image.src = url;
    return image.decode();
  }
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'auto';
    video.muted = true;
    video.onloadeddata = () => { video.removeAttribute('src'); video.load(); resolve(); };
    video.onerror = () => reject(new Error('Video tidak bisa dibuka'));
    video.src = url;
    video.load();
  });
}

function LoadingScreen({ progress, error, onRetry }) {
  return <main className="loading-screen" aria-busy={!error}>
    <div className="loading-content">
      <div className="loading-brand"><Logo/><span>Nilam <strong>Garden Farm</strong></span></div>
      <p>{error ? 'Media belum berhasil dimuat.' : 'Menyiapkan kebun untukmu'}</p>
      <div className="loading-track" role="progressbar" aria-label="Memuat foto dan video" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress}><span style={{ width: `${progress}%` }}/></div>
      <div className="loading-status"><span>{error ? 'Periksa koneksi, lalu coba lagi.' : 'Memuat foto dan video'}</span><span>{progress}%</span></div>
      {error && <button className="loading-retry" type="button" onClick={onRetry}>Coba lagi</button>}
    </div>
  </main>;
}

function App() {
  const [media, setMedia] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const urls = [];
    const fractions = Array(mediaFiles.length).fill(0);
    let active = true;
    setProgress(0);
    setError(false);
    const updateProgress = (index, fraction) => {
      fractions[index] = fraction;
      if (active) setProgress(Math.min(99, Math.floor(fractions.reduce((sum, value) => sum + value, 0) / fractions.length * 100)));
    };
    const load = async (path, index) => {
      const response = await fetch(path, { signal: controller.signal });
      if (!response.ok) throw new Error('Media tidak berhasil dimuat');
      const total = Number(response.headers.get('Content-Length'));
      let blob;
      if (response.body && total > 0) {
        const reader = response.body.getReader();
        const chunks = [];
        let received = 0;
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
          received += value.byteLength;
          updateProgress(index, Math.min(.95, received / total * .95));
        }
        blob = new Blob(chunks, { type: response.headers.get('Content-Type') || '' });
      } else {
        blob = await response.blob();
      }
      if (!active) return null;
      const url = URL.createObjectURL(blob);
      urls.push(url);
      await waitForMedia(url, path.endsWith('.mp4'));
      updateProgress(index, 1);
      return [path, url];
    };
    Promise.all(mediaFiles.map(load)).then(entries => {
      if (active) { setProgress(100); setMedia(Object.fromEntries(entries)); }
    }).catch(() => {
      controller.abort();
      if (active) { setError(true); active = false; }
    });
    return () => { active = false; controller.abort(); urls.forEach(url => URL.revokeObjectURL(url)); };
  }, [attempt]);

  if (!media) return <LoadingScreen progress={progress} error={error} onRetry={() => setAttempt(value => value + 1)} />;

  return <main id="top">
    <section className="hero">
      <div className="hero-inner shell">
        <nav className="nav" aria-label="Navigasi utama">
          <a className="brand" href="#top" aria-label="Nilam Garden Farm, kembali ke atas"><Logo/><span>Nilam <strong>Garden Farm</strong></span></a>
          <div className="nav-links"><a className="active" href="#top">Beranda</a><a href="#story">Cerita kami</a><a href="#garden">Kebun</a><a href="#hasil-kebun">Hasil kebun</a><a href="#visit">Kunjungi</a></div>
          <a className="nav-cta" href="#visit">Mari terhubung <Arrow diagonal /></a>
        </nav>
        <div className="hero-copy">
          <p className="location-label">Subang, Jawa Barat</p>
          <h1>Tumbuh bersama<br/>Nilam Garden Farm.</h1>
          <p className="hero-intro">Menyediakan kacang panjang, timun, terong, tomat, dan cabai dari kebun kami di Subang.</p>
          <a className="button button-dark" href="#hasil-kebun">Lihat hasil kebun <Arrow /></a>
        </div>
      </div>
      <div className="hero-image">
        <video className="hero-video" autoPlay muted loop playsInline preload="metadata" poster={media['/hero-video-poster.jpg']} aria-label="Video suasana kebun Nilam dari udara"><source src={media['/hero-video.mp4']} type="video/mp4" /></video>
        <div className="hero-image-inner shell"><p>Dirawat dengan rasa.<br/>Bertumbuh bersama alam.</p><a href="#garden">Kenali kebun kami <Arrow diagonal /></a></div>
      </div>
    </section>

    

    <section className="produce shell" id="hasil-kebun" aria-labelledby="produce-title">
      <div className="produce-heading">
        <p className="section-label">Hasil kebun</p>
        <h2 id="produce-title">Sayuran yang kami sediakan.</h2>
        <p>Untuk informasi ketersediaan, hubungi kami melalui WhatsApp.</p>
      </div>
      <ul className="produce-list">
        {produce.map(item => <li key={item.name}><img src={media[item.image]} alt="" /><span>{item.name}</span></li>)}
      </ul>
      <p className="produce-credit">Foto ilustrasi dari <a href="https://www.pexels.com/" target="_blank" rel="noreferrer">Pexels</a></p>
    </section>

    <section className="story shell" id="story"><div className="section-side"><p className="section-label">Cerita kami</p></div><div className="story-content"><h2>Sebuah kebun untuk tumbuh bersama.</h2><div className="story-bottom"><p>Kami percaya pertanian bukan hanya tentang apa yang dipanen. Ia tentang tanah yang dijaga, pengetahuan yang dibagi, dan hubungan yang tumbuh pelan-pelan.</p><a className="text-link" href="#garden">Lihat kehidupan di kebun <Arrow diagonal /></a></div></div></section>

    <section className="garden shell" id="garden"><div className="section-heading"><div><p className="section-label">Dari kebun kami</p><h2>Di sekitar kebun.</h2></div><p>Setiap sudut punya ritme sendiri. Kami membiarkan musim, tanah, dan tanaman bercerita.</p></div><div className="garden-grid">{cards.map(card => <article className="garden-card" key={card.number}><div className="card-image"><img src={media[card.image]} alt={card.alt} loading="lazy"/><span>{card.category}</span></div><div className="card-meta"><span>{card.number}</span><h3>{card.title}</h3></div></article>)}</div></section>


    <section className="visit shell" id="visit"><div className="visit-background" style={{ backgroundImage: `linear-gradient(90deg, rgba(15,38,24,.74), rgba(15,38,24,.1)), url("${media['/kebun-2.jpg']}")` }}/><div className="visit-content"><p className="section-label">Subang, Jawa Barat</p><h2>Mari berkunjung<br/>ke kebun.</h2><p>Ingin tahu lebih banyak tentang kebun kami? Hubungi kami lewat WhatsApp.</p><a className="button button-light" href="https://wa.me/6285287405950">Hubungi kami <Arrow /></a><div className="visit-location">Subang, Jawa Barat, Indonesia</div></div></section>
    <footer className="footer shell"><a className="brand" href="#top"><Logo/><span>Nilam <strong>Garden Farm</strong></span></a><p>Dirawat dengan rasa, tumbuh bersama alam.</p><a href="#top">Kembali ke atas ↑</a><span>© 2026 Agung Nilam</span></footer>
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
