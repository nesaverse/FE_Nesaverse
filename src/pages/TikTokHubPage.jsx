import { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import SEO from '../components/SEO';
import { fetchTikTok } from '../utils/api';
import { WA_TEMPLATES } from '../utils/whatsapp';
import styles from './TikTokHubPage.module.css';

const CATS = ['All', 'Gaming', 'AI-Art', 'Memes', 'Tech', 'Lifestyle'];
const TAGS = ['#NesaVerse', '#PixelArmy', '#GamingIndonesia', '#AIArt', '#TechTok', '#Memes2025'];

const VideoCard = ({ v }) => (
  <article className={styles.card}>
    <div className={styles.thumbWrap}>
      <img src={v.thumb} alt={v.title} className={styles.thumb} loading="lazy" />
      <div className={styles.thumbOverlay} />
      <span className={styles.duration}>{v.duration}</span>
      {v.trending && (
        <span className={styles.trendBadge}>
          <span className="material-symbols-outlined" style={{ fontSize: '12px', fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
          Trending
        </span>
      )}
      <a href={v.link || '#'} target="_blank" rel="noopener noreferrer" className={styles.playBtn} aria-label="Tonton">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '40px' }}>play_circle</span>
      </a>
    </div>
    <div className={styles.cardInfo}>
      <div className={styles.creatorRow}>
        <img src={v.avatar} alt={v.creator} className={styles.creatorAvatar} loading="lazy" />
        <span className={styles.creatorHandle}>{v.creator}</span>
        <Badge label={v.category} color="primary" size="sm" />
      </div>
      <h3 className={styles.videoTitle}>{v.title}</h3>
      <div className={styles.metaRow}>
        <span className={styles.meta}><span className="material-symbols-outlined" style={{ fontSize: '14px' }}>visibility</span>{v.views}</span>
        <span className={styles.meta}><span className="material-symbols-outlined" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>favorite</span>{v.likes}</span>
      </div>
    </div>
  </article>
);

const TikTokHubPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (activeCategory !== 'All') params.category = activeCategory;
    fetchTikTok(params)
      .then(setVideos)
      .catch(() => setVideos([]))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  return (
    <div className={styles.page}>
      <SEO 
        title="TikTok Hub — Video Trending Kreator" 
        description="Jelajahi video-video TikTok trending, konten kreatif, gaming, art, dan meme dari para kreator NesaVerse terbaik."
        keywords="tiktok creator indonesia, video viral tiktok, nesaverse tiktok, content creator tiktok"
      />
      <div className={styles.meshBg} aria-hidden="true" />
      <div className={`${styles.orb1} orb orb1`} aria-hidden="true" />
      <div className={`${styles.orb2} orb orb2`} aria-hidden="true" />
      <header className={`container ${styles.pageHeader}`}>
        <div className={styles.ttBadge}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '18px' }}>play_circle</span>
          TikTok Hub
        </div>
        <h1 className={styles.pageTitle}>Video <span className={styles.gradTitle}>Trending</span> NesaVerse</h1>
        <p className={styles.pageDesc}>Konten viral dari kreator terbaik — gaming, art, tech, dan memes terpanas.</p>
      </header>

      <div className={`container ${styles.filterRow}`}>
        {CATS.map((cat) => (
          <button key={cat} className={`${styles.catBtn} ${activeCategory === cat ? styles.catActive : ''}`} onClick={() => setActiveCategory(cat)}>
            {cat === 'All' ? '🔥 All' : cat}
          </button>
        ))}
      </div>

      <section className={`container ${styles.grid}`}>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <div key={i} className={`skeleton ${styles.skeletonCard}`} />)
          : videos.map((v) => <VideoCard key={v.id} v={v} />)
        }
      </section>

      <div className={styles.tickerWrap}>
        <div className={styles.tickerLabel}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '16px' }}>local_fire_department</span>
          Trending
        </div>
        <div className={styles.ticker}>
          <div className={styles.tickerTrack}>
            {[...TAGS, ...TAGS].map((tag, i) => <span key={i} className={styles.tickerTag}>{tag}</span>)}
          </div>
        </div>
      </div>

      <section className={`container ${styles.cta}`}>
        <div className={styles.ctaInner}>
          <div className={styles.ctaGlow1} /><div className={styles.ctaGlow2} />
          <h2 className={styles.ctaTitle}>Creator TikTok Berbakat?</h2>
          <p className={styles.ctaDesc}>Submit video terbaikmu dan dapatkan fitur placement di halaman utama NesaVerse.</p>
          <div className={styles.ctaBtns}>
            <a href={WA_TEMPLATES.tiktok} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="lg">Submit Video</Button>
            </a>
            <a href={WA_TEMPLATES.tiktok} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg">Join Creator Program</Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TikTokHubPage;
