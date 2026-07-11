import { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import SEO from '../components/SEO';
import { fetchInstagram } from '../utils/api';
import { WA_TEMPLATES } from '../utils/whatsapp';
import styles from './InstagramHubPage.module.css';

const CATS = ['All', 'Gaming', 'AI-Art', 'Design', 'Tech', 'Lifestyle'];

const CreatorCard = ({ c }) => (
  <article className={`${styles.card} glass-panel`}>
    <div className={styles.cardBanner} style={{ background: c.gradient }} />
    <div className={styles.cardBody}>
      <div className={styles.avatarRow}>
        <div className={styles.avatarWrap}>
          <img src={c.avatar} alt={c.name} className={styles.avatar} loading="lazy" />
          {c.verified && (
            <span className={styles.verified}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '12px' }}>verified</span>
            </span>
          )}
        </div>
        <a href={c.link || '#'} target="_blank" rel="noopener noreferrer">
          <Button variant="primary" size="sm">Selengkapnya</Button>
        </a>
      </div>
      <h3 className={styles.name}>{c.name}</h3>
      <p className={styles.handle}>{c.handle}</p>
      <p className={styles.bio}>{c.bio}</p>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statVal}>{c.followers}</span>
          <span className={styles.statLbl}>Followers</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <span className={styles.statVal}>{Number(c.posts).toLocaleString()}</span>
          <span className={styles.statLbl}>Posts</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <Badge label={c.category} color="primary" />
        </div>
      </div>
    </div>
  </article>
);

const InstagramHubPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (activeCategory !== 'All') params.category = activeCategory;
    if (search) params.search = search;
    fetchInstagram(params)
      .then(setCreators)
      .catch(() => setCreators([]))
      .finally(() => setLoading(false));
  }, [activeCategory, search]);

  return (
    <div className={styles.page}>
      <SEO 
        title="Instagram Hub — Discover Top Creators" 
        description="Temukan dan berkolaborasi dengan kreator Instagram terbaik di NesaVerse. Jelajahi portofolio, statistik, dan niche kreator favoritmu."
        keywords="instagram creator indonesia, influencer instagram, nesaverse instagram, direktori influencer"
      />
      <div className={styles.meshBg} aria-hidden="true" />
      <div className={`${styles.orb1} orb orb1`} aria-hidden="true" />
      <div className={`${styles.orb2} orb orb2`} aria-hidden="true" />

      <header className={`container ${styles.pageHeader}`}>
        <div className={styles.igBadge}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '20px' }}>photo_camera</span>
          Instagram Hub
        </div>
        <h1 className={styles.pageTitle}>
          Discover Top{' '}
          <span style={{ background: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Creators
          </span>
        </h1>
        <p className={styles.pageDesc}>
          Temukan kreator terbaik dalam jaringan NesaVerse — dari gaming, AI art, hingga lifestyle content.
        </p>
      </header>

      <div className={`container ${styles.searchWrap}`}>
        <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
        <input
          type="search"
          placeholder="Cari creator atau handle..."
          className={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search creators"
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
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`skeleton ${styles.skeletonCard}`} />
          ))
        ) : creators.length === 0 ? (
          <div className={styles.empty}>
            <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--color-outline)' }}>search_off</span>
            <p>Tidak ada kreator ditemukan</p>
          </div>
        ) : (
          creators.map((c) => <CreatorCard key={c.id} c={c} />)
        )}
      </section>

      <section className={`container ${styles.cta}`}>
        <div className={styles.ctaInner}>
          <div className={styles.ctaGlow} />
          <h2 className={styles.ctaTitle}>Punya Akun Instagram Besar?</h2>
          <p className={styles.ctaDesc}>Daftarkan akunmu dan dapatkan fitur placement di halaman utama NesaVerse .</p>
          <div className={styles.ctaBtns}>
            <a href={WA_TEMPLATES.instagram} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="lg">Daftar Sekarang</Button>
            </a>
            <a href={WA_TEMPLATES.instagram} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg">Pelajari Lebih</Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InstagramHubPage;
