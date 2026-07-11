import { useState, useEffect } from 'react';
import { fetchRoblox } from '../utils/api';
import { WA_TEMPLATES } from '../utils/whatsapp';
import Button from '../components/ui/Button';
import SEO from '../components/SEO';
import styles from './RobloxHubPage.module.css';

const RobloxCard = ({ g }) => (
  <article className={`${styles.card} glass-panel`}>
    <div className={styles.thumbWrap}>
      <img src={g.thumbnail} alt={g.name} className={styles.thumb} loading="lazy" />
      <div className={styles.thumbOverlay} />
      <span className={styles.rblxBadge}>Roblox</span>
    </div>
    <div className={styles.cardBody}>
      <h3 className={styles.gameName}>{g.name}</h3>
      <p className={styles.desc}>{g.description}</p>
      <div className={styles.actions}>
        <a href={g.link_game} target="_blank" rel="noopener noreferrer" className={styles.playBtn}>
          <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>sports_esports</span>
          Mainkan
        </a>
        {g.link_community && (
          <a href={g.link_community} target="_blank" rel="noopener noreferrer" className={styles.communityBtn}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>group</span>
            Community
          </a>
        )}
      </div>
    </div>
  </article>
);

const RobloxHubPage = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (search) params.search = search;
    const t = setTimeout(() => {
      fetchRoblox(params)
        .then(setGames)
        .catch(() => setGames([]))
        .finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(t);
  }, [search]);

  return (
    <div className={styles.page}>
      <SEO 
        title="Roblox Hub — Game & Guild Populer" 
        description="Temukan game Roblox terbaik dan server guild Roblox terpopuler di Indonesia dari jaringan NesaVerse."
        keywords="game roblox indonesia, roblox community, guild roblox, nesaverse roblox"
      />
      <div className={styles.meshBg} aria-hidden="true" />
      <div className={`${styles.orb1} orb orb1`} aria-hidden="true" />
      <div className={`${styles.orb2} orb orb2`} aria-hidden="true" />

      <header className={`container ${styles.pageHeader}`}>
        <div className={styles.rblxBadgeHeader}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '20px' }}>sports_esports</span>
          Roblox Hub
        </div>
        <h1 className={styles.pageTitle}>
          Explore{' '}
          <span className={styles.gradTitle}>Roblox Games</span>
        </h1>
        <p className={styles.pageDesc}>
          Temukan game Roblox terbaik dari komunitas NesaVerse — mainkan, bergabung, dan bangun bersama.
        </p>
      </header>

      <div className={`container ${styles.searchWrap}`}>
        <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
        <input
          type="search"
          placeholder="Cari game Roblox..."
          className={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search Roblox games"
        />
      </div>

      <section className={`container ${styles.grid}`}>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <div key={i} className={`skeleton ${styles.skeletonCard}`} />)
          : games.length === 0
            ? (
              <div className={styles.empty}>
                <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--color-outline)' }}>search_off</span>
                <p>Tidak ada game ditemukan</p>
              </div>
            )
            : games.map((g) => <RobloxCard key={g.id} g={g} />)
        }
      </section>

      <section className={`container ${styles.cta}`}>
        <div className={styles.ctaInner}>
          <div className={styles.ctaGlow} />
          <h2 className={styles.ctaTitle}>Punya Game Roblox?</h2>
          <p className={styles.ctaDesc}>
            Daftarkan game Roblox-mu dan raih lebih banyak pemain dari komunitas NesaVerse.
          </p>
          <div className={styles.ctaBtns}>
            <a href={WA_TEMPLATES.roblox} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="lg">Daftarkan Game</Button>
            </a>
            <a href={WA_TEMPLATES.roblox} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg">Partner With Us</Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RobloxHubPage;
