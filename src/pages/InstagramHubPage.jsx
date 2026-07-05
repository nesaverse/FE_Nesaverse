import { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import styles from './InstagramHubPage.module.css';

const creators = [
  {
    id: 1, handle: '@NesaVerse_Official', name: 'NesaVerse Official',
    followers: '2.4M', posts: 1280, category: 'Gaming',
    bio: 'Official channel NesaVerse Network. Game drops, collabs & viral reels.',
    verified: true, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCfpnQHAauZhNMkVxEucI8YnYxpjYo41F5UHzzjOf9CINKrpLfO8aVOgcp-Vl0en4pwOe13EAFyH7UjnB8dLoMIaRIE4G6IceUnBFnMl__UsZwTtxgcUf7EZt2CenFHcDOodrCi3WTd2bUgyjT3r8B978onqzc4yM1WdALFFVxg5qeN0PLCOc0jFQ5onhsZupbwCGbF-KzPQVPrROcP1pMM9R-xkmN55uSdMAB4VR4SnF2-k-R3QlbIUexASwLVIGA-zsjsVEBtZU',
    gradient: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
  },
  {
    id: 2, handle: '@PixelArtz_Hub', name: 'PixelArtz Hub',
    followers: '890K', posts: 3400, category: 'AI-Art',
    bio: 'Daily AI-generated pixel art & prompt engineering. Drop your ideas!',
    verified: true, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdouzG8-pPr-YVAZRIl03eMGHVYseAGOgRknQlsS4Zd74B5skaTMcKYxz56_JhbJuyUVDwavJMcaSTEDWKue3yQgZbxQaa3o3K9--RMz9AkibhERP1fkCRbZ5HQq1EMzBJmyx2ZguQCrU0NH_tK-8JTXleA-VBdG_BJ1O3ord55FNkUpZZnbdzujEW8J1EEcvG-FOueC60ZUHBKWQS2cbvS4brK3VhNbzLlv7jNj_ZiHXXcXrOjM5GhohrdtueL_iDXnNAfszPwLE',
    gradient: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)',
  },
  {
    id: 3, handle: '@NeonClan_ID', name: 'NeonClan Indonesia',
    followers: '1.1M', posts: 782, category: 'Gaming',
    bio: 'Top gaming clan Indonesia. Tourneys, highlights & behind the scenes.',
    verified: false, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDP6mxX2zHysneidishNSMPiRzelXkebcI6egAsW9lTNa3A13vYYJWh9GegRRvP_do4KGqsQpidg7PrI3fMcBubT94SWKWKmXSzSgG-Yf8F4EI7k8Ly4CDJYFF6V_aznrCriWqSvEagWJYGR0RM6l6BN-ZQD9Z7KAHNpmH_OpxOMoVtEl-Ej1p4NQOnKEZjMWFhFWjjVKD3sjVY16-HIicW5QMvLcwKdAGsJ4JiRRKdDI3FqRixYQzwDt1AFBVvzYUWBtXQn9YxDYU',
    gradient: 'linear-gradient(135deg, #405de6, #5851db, #833ab4)',
  },
  {
    id: 4, handle: '@CreativeCore_', name: 'Creative Core Studio',
    followers: '560K', posts: 2100, category: 'Design',
    bio: 'UI/UX design inspiration & tutorials for digital creatives worldwide.',
    verified: true, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeWix45HGRnvtB12X3_J-XTZInVaKph2TK9NnYZcRDMLf3a-uJAEvxclTW2IDGMSoBkJjgEN9lfLoyz_lIdWIAzLlAeqRCZyC4mBVPNsjcMTyI6KMx8cabb3l_tFQtX75JIf65SkdvHXZAwWEHmhtaqEPh_bqDETvamQLLChngzJZBn-2KQIa7_MdDW81ABka9cj-9sLifO5qQA4tpdytZsIufeqpmXqCJCNdk8d831NLLYlcXJ0AsgfhlHczIbgn6nPy2b2PF6UQ',
    gradient: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743)',
  },
  {
    id: 5, handle: '@TechWave_ID', name: 'TechWave Indonesia',
    followers: '320K', posts: 940, category: 'Tech',
    bio: 'Breaking tech news, gadget reviews & AI research simplified daily.',
    verified: false, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRzcBerLapVvk3TzyGqRwLdbnoL5N1PCTC2sdmlwJAmx9F7MnQoM7G8WRi2Gbf1p08Jlnytd-SRfTY556tudmF1Sbk57v9RJWpE-WXcTER-N7HAdUzQVayVyHA6lfdqPMtQduwVcZGMvt0blU5nq2fDg7unVltWQu0zf8B2j9t5_AtXy9iP5ToJjAReG8E1rlMyHiWnAAWppSUAEBceARxRzttnjrAS27lnptYMERHHsgdE6cv4H9bAc2ZOIaHvjE0g_jYj_459ao',
    gradient: 'linear-gradient(135deg, #12c2e9, #c471ed, #f64f59)',
  },
  {
    id: 6, handle: '@VoidAesthetic', name: 'Void Aesthetic',
    followers: '780K', posts: 1550, category: 'Lifestyle',
    bio: 'Curated dark aesthetic, lo-fi vibes & midnight photography.',
    verified: true, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCfpnQHAauZhNMkVxEucI8YnYxpjYo41F5UHzzjOf9CINKrpLfO8aVOgcp-Vl0en4pwOe13EAFyH7UjnB8dLoMIaRIE4G6IceUnBFnMl__UsZwTtxgcUf7EZt2CenFHcDOodrCi3WTd2bUgyjT3r8B978onqzc4yM1WdALFFVxg5qeN0PLCOc0jFQ5onhsZupbwCGbF-KzPQVPrROcP1pMM9R-xkmN55uSdMAB4VR4SnF2-k-R3QlbIUexASwLVIGA-zsjsVEBtZU',
    gradient: 'linear-gradient(135deg, #2c3e50, #4ca1af)',
  },
];

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
        <Button variant="primary" size="sm">Follow</Button>
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
          <span className={styles.statVal}>{c.posts.toLocaleString()}</span>
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
  const [filtered, setFiltered] = useState(creators);

  useEffect(() => {
    let res = creators;
    if (activeCategory !== 'All') res = res.filter((c) => c.category === activeCategory);
    if (search) res = res.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.handle.toLowerCase().includes(search.toLowerCase()));
    setFiltered(res);
  }, [activeCategory, search]);

  return (
    <div className={styles.page}>
      {/* Gradient mesh bg */}
      <div className={styles.meshBg} aria-hidden="true" />

      <header className={`container ${styles.pageHeader}`}>
        <div className={styles.igBadge}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '20px' }}>photo_camera</span>
          Instagram Hub
        </div>
        <h1 className={styles.pageTitle}>
          Discover Top{' '}
          <span style={{ background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Creators
          </span>
        </h1>
        <p className={styles.pageDesc}>
          Temukan kreator terbaik dalam jaringan NesaVerse — dari gaming, AI art, hingga lifestyle content.
        </p>
      </header>

      {/* Search */}
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

      {/* Filter */}
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

      {/* Grid */}
      <section className={`container ${styles.grid}`}>
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--color-outline)' }}>search_off</span>
            <p>Tidak ada kreator ditemukan</p>
          </div>
        ) : (
          filtered.map((c) => <CreatorCard key={c.id} c={c} />)
        )}
      </section>

      {/* CTA */}
      <section className={`container ${styles.cta}`}>
        <div className={styles.ctaInner}>
          <div className={styles.ctaGlow} />
          <h2 className={styles.ctaTitle}>Punya Akun Instagram Besar?</h2>
          <p className={styles.ctaDesc}>Daftarkan akunmu dan dapatkan fitur placement di halaman utama NesaVerse Network.</p>
          <div className={styles.ctaBtns}>
            <Button variant="primary" size="lg">Daftar Sekarang</Button>
            <Button variant="secondary" size="lg">Pelajari Lebih</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InstagramHubPage;
