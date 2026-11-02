import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const Arrow = ({ diagonal = false }) => <svg viewBox="0 0 24 24" aria-hidden="true"><path d={diagonal ? 'M5 19 19 5M7 5h12v12' : 'M4 12h15M13 6l6 6-6 6'} /></svg>;
const Leaf = () => <svg className="leaf" viewBox="0 0 36 36" aria-hidden="true"><path d="M29 5C17 5 7 10 6 20c-.5 4.5 2 7 6 7 9 0 15-10 17-22Z"/><path d="M5 30c6-9 12-14 21-20"/></svg>;

const cards = [
  { image: '/kebun-1.jpg', number: '01', category: 'Kebun', title: 'Tumbuh dengan perhatian', alt: 'Barisan tanaman di kebun Nilam dilihat dari udara' },
  { image: '/kebun-2.jpg', number: '02', category: 'Kehidupan', title: 'Dekat dengan alam', alt: 'Suasana kebun Nilam dilihat dari udara' },
  { image: '/kebun-3.jpg', number: '03', category: 'Tanaman', title: 'Mengikuti ritme musim', alt: 'Tanaman kacang panjang di kebun Nilam' },
];

function App() {
  return <main id="top">
    <section className="hero">
      <div className="hero-inner shell">
        <nav className="nav" aria-label="Navigasi utama">
          <a className="brand" href="#top" aria-label="Nilam Garden Farm, kembali ke atas"><Leaf/><span>Nilam <strong>Garden Farm</strong></span></a>
          <div className="nav-links"><a className="active" href="#top">Beranda</a><a href="#story">Cerita kami</a><a href="#garden">Kebun</a><a href="#visit">Kunjungi</a></div>
          <a className="nav-cta" href="#visit">Mari terhubung <Arrow diagonal /></a>
        </nav>
        <div className="hero-copy">
          <p className="location-label">Subang, Jawa Barat</p>
          <h1>Tumbuh bersama<br/>Nilam Garden Farm.</h1>
          <p className="hero-intro">Kebun di Subang, tempat kami merawat tanaman dan berbagi cerita.</p>
          <a className="button button-dark" href="#story">Jelajahi cerita kami <Arrow /></a>
        </div>
      </div>
      <div className="hero-image">
        <video className="hero-video" autoPlay muted loop playsInline preload="metadata" poster="/hero-video-poster.jpg" aria-label="Video suasana kebun Nilam dari udara"><source src="/hero-video.mp4" type="video/mp4" /></video>
        <div className="hero-image-inner shell"><p>Dirawat dengan rasa.<br/>Bertumbuh bersama alam.</p><a href="#garden">Kenali kebun kami <Arrow diagonal /></a></div>
      </div>
    </section>

    

    <section className="story shell" id="story"><div className="section-side"><p className="section-label">Cerita kami</p></div><div className="story-content"><h2>Sebuah kebun untuk tumbuh bersama.</h2><div className="story-bottom"><p>Kami percaya pertanian bukan hanya tentang apa yang dipanen. Ia tentang tanah yang dijaga, pengetahuan yang dibagi, dan hubungan yang tumbuh pelan-pelan.</p><a className="text-link" href="#garden">Lihat kehidupan di kebun <Arrow diagonal /></a></div></div></section>

    <section className="garden shell" id="garden"><div className="section-heading"><div><p className="section-label">Dari kebun kami</p><h2>Di sekitar kebun.</h2></div><p>Setiap sudut punya ritme sendiri. Kami membiarkan musim, tanah, dan tanaman bercerita.</p></div><div className="garden-grid">{cards.map(card => <article className="garden-card" key={card.number}><div className="card-image"><img src={card.image} alt={card.alt} loading="lazy"/><span>{card.category}</span></div><div className="card-meta"><span>{card.number}</span><h3>{card.title}</h3></div></article>)}</div></section>

    <section className="visit shell" id="visit"><div className="visit-background"/><div className="visit-content"><p className="section-label">Subang, Jawa Barat</p><h2>Mari berkunjung<br/>ke kebun.</h2><p>Ingin tahu lebih banyak tentang kebun kami? Hubungi kami lewat WhatsApp.</p><a className="button button-light" href="https://wa.me/6285287405950">Hubungi kami <Arrow /></a><div className="visit-location">Subang, Jawa Barat, Indonesia</div></div></section>
    <footer className="footer shell"><a className="brand" href="#top"><Leaf/><span>Nilam <strong>Garden Farm</strong></span></a><p>Dirawat dengan rasa, tumbuh bersama alam.</p><a href="#top">Kembali ke atas ↑</a><span>© 2026 Agung Nilam</span></footer>
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
