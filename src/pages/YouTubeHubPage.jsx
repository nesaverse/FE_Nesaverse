import { useState, useEffect } from 'react';
import { fetchYouTube } from '../utils/api';
import { WA_TEMPLATES } from '../utils/whatsapp';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import SEO from '../components/SEO';
import styles from './YouTubeHubPage.module.css';

const CATS = ['All', 'Gaming', 'AI-Art', 'Tech', 'Lifestyle', 'Education'];

const fmt = (n) => {
  const num = parseInt(String(n).replace(/\D/g, '')) || 0;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(0)}K`;
  return String(n);
};

const ChannelCard = ({ c }) => (
  <article className={`${styles.card} glass-panel`}>
    <div className={styles.thumbWrap}>
      <img src={c.thumbnail} alt={c.name} className={styles.thumb} loading="lazy" />
      <div className={styles.thumbOverlay} />
      <span className={styles.ytBadge}>
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '14px' }}>play_circle</span>
        YouTube
      </span>
    </div>
    <div className={styles.cardBody}>
      <div className={styles.titleRow}>
        <h3 className={styles.channelName}>{c.name}</h3>
        <Badge label={c.category} color="primary" size="sm" />
      </div>
      <p className={styles.desc}>{c.description}</p>
      <div className={styles.subRow}>
        <span className={styles.subCount}>
          <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>group</span>
          {c.subscribers} Subscribers
        </span>
      </div>
      <a href={c.link} target="_blank" rel="noopener noreferrer" className={styles.visitBtn}>
        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>open_in_new</span>
        Kunjungi Channel
      </a>
    </div>
  </article>
);

const YouTubeHubPage = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (activeCategory !== 'All') params.category = activeCategory;
    if (search) params.search = search;
    const t = setTimeout(() => {
      fetchYouTube(params)
        .then(setChannels)
        .catch(() => setChannels([]))
        .finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(t);
  }, [activeCategory, search]);

  return (
    <div className={styles.page}>
      <SEO 
        title="YouTube Hub — Kumpulan Channel Terbaik" 
        description="Jelajahi dan ikuti channel YouTube terbaik dari para konten kreator NesaVerse. Temukan video gaming, edukasi, teknologi, dan gaya hidup."
        keywords="youtube creator indonesia, channel youtube terbaik, nesaverse youtube, content creator youtube"
      />
      <div className={styles.meshBg} aria-hidden="true" />

      <header className={`container ${styles.pageHeader}`}>
        <div className={styles.ytBadgeHeader}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '20px' }}>smart_display</span>
          YouTube Hub
        </div>
        <h1 className={styles.pageTitle}>
          Discover Top{' '}
          <span className={styles.gradTitle}>YouTube Channels</span>
        </h1>
        <p className={styles.pageDesc}>
          Temukan channel YouTube terbaik dari kreator NesaVerse — gaming, tech, AI art, dan lebih banyak lagi.
        </p>
      </header>

      <div className={`container ${styles.searchWrap}`}>
        <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
        <input
          type="search"
          placeholder="Cari channel YouTube..."
          className={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search YouTube channels"
        />
      </div>

      <div className={`container ${styles.filterRow}`}>
        {CATS.map((cat) => (
          <button
            key={cat}
            className={`${styles.catBtn} ${activeCategory === cat ? styles.catActive : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <section className={`container ${styles.grid}`}>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <div key={i} className={`skeleton ${styles.skeletonCard}`} />)
          : channels.length === 0
            ? (
              <div className={styles.empty}>
                <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--color-outline)' }}>search_off</span>
                <p>Tidak ada channel ditemukan</p>
              </div>
            )
            : channels.map((c) => <ChannelCard key={c.id} c={c} />)
        }
      </section>

      <section className={`container ${styles.cta}`}>
        <div className={styles.ctaInner}>
          <div className={styles.ctaGlow} />
          <h2 className={styles.ctaTitle}>Punya Channel YouTube?</h2>
          <p className={styles.ctaDesc}>
            Daftarkan channel YouTube-mu dan dapatkan exposure ke ribuan member komunitas NesaVerse.
          </p>
          <div className={styles.ctaBtns}>
            <a href={WA_TEMPLATES.youtube} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="lg">Submit Channel</Button>
            </a>
            <a href={WA_TEMPLATES.youtube} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg">Partner With Us</Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default YouTubeHubPage;
