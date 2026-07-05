import { useState, useEffect } from 'react';
import { fetchServers } from '../utils/api';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import styles from './DiscordHubPage.module.css';

const CATEGORIES = ['All', 'Gaming', 'Tech', 'Innovation', 'Social', 'Building', 'Creators', 'Crypto', 'Art & Design'];

const gradients = [
  'linear-gradient(135deg, #5865F2, #3944bc)',
  'linear-gradient(135deg, #3944bc, #7289da, #99aab5)',
  'linear-gradient(135deg, #23272A, #5865F2, #57F287)',
  'linear-gradient(135deg, #FEE75C, #5865F2)',
  'linear-gradient(135deg, #ED4245, #5865F2)',
  'linear-gradient(135deg, #57F287, #3944bc)',
  'linear-gradient(135deg, #EB459E, #5865F2)',
  'linear-gradient(135deg, #5865F2, #7289da, #EB459E)',
];

const formatNum = (n) => {
  if (!n) return '0';
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
};

const ServerCard = ({ server, index }) => {
  const gradient = gradients[index % gradients.length];
  return (
    <article className={`${styles.card} glass-panel`}>
      <div className={styles.cardBanner} style={{ background: gradient }} />
      <div className={styles.cardBody}>
        <div className={styles.avatarRow}>
          <div className={styles.avatarWrap}>
            <img src={server.icon} alt={server.name} className={styles.avatar} loading="lazy" />
            {server.verified && (
              <span className={styles.verifiedBadge}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '12px' }}>verified</span>
              </span>
            )}
          </div>
          <Button variant="primary" size="sm">Join Server</Button>
        </div>
        <h3 className={styles.serverName}>{server.name}</h3>
        <p className={styles.serverDesc}>{server.description}</p>
        <div className={styles.tags}>
          {server.categories?.slice(0, 2).map((cat) => (
            <Badge key={cat} label={cat} color="primary" size="sm" />
          ))}
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statVal}>{formatNum(server.members)}</span>
            <span className={styles.statLbl}>Members</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statVal}>{formatNum(server.online)}</span>
            <span className={styles.statLbl}>Online</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={`${styles.statusDot} ${server.verified ? styles.dotVerified : styles.dotRegular}`} />
            <span className={styles.statLbl}>{server.verified ? 'Verified' : 'Community'}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

const DiscordHubPage = () => {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (activeCategory !== 'All') params.category = activeCategory;
    if (search) params.search = search;
    const timer = setTimeout(() => {
      fetchServers(params)
        .then(setServers)
        .catch(() => setServers([]))
        .finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(timer);
  }, [activeCategory, search]);

  return (
    <div className={styles.page}>
      <div className={styles.meshBg} aria-hidden="true" />

      <header className={`container ${styles.pageHeader}`}>
        <div className={styles.platformBadge}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '20px' }}>hub</span>
          Discord Hub
        </div>
        <h1 className={styles.pageTitle}>
          Temukan Server{' '}
          <span className={styles.gradTitle}>Terbaik</span>
        </h1>
        <p className={styles.pageDesc}>
          Bergabung dengan komunitas Discord elite — gaming, tech, art, dan lebih banyak lagi dalam jaringan NesaVerse.
        </p>
      </header>

      {/* Search */}
      <div className={`container ${styles.searchWrap}`}>
        <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
        <input
          type="search"
          placeholder="Cari server Discord..."
          className={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search servers"
        />
      </div>

      {/* Filter */}
      <div className={`container ${styles.filterRow}`}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`${styles.catBtn} ${activeCategory === cat ? styles.catActive : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <section className={`container ${styles.grid}`}>
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`skeleton ${styles.skeletonCard}`} />
          ))
        ) : servers.length === 0 ? (
          <div className={styles.empty}>
            <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--color-outline)' }}>search_off</span>
            <p>Tidak ada server ditemukan</p>
          </div>
        ) : (
          servers.map((server, i) => <ServerCard key={server.id} server={server} index={i} />)
        )}
      </section>

      {/* CTA */}
      <section className={`container ${styles.cta}`}>
        <div className={styles.ctaInner}>
          <div className={styles.ctaGlow} />
          <h2 className={styles.ctaTitle}>Punya Server Discord?</h2>
          <p className={styles.ctaDesc}>
            Daftarkan server kamu dan dapatkan akses ke tools pertumbuhan eksklusif, partner bot, dan placement halaman utama.
          </p>
          <div className={styles.ctaBtns}>
            <Button variant="primary" size="lg">Daftarkan Server</Button>
            <Button variant="secondary" size="lg">Pelajari Lebih</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DiscordHubPage;
