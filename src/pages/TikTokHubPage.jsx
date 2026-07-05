import { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import styles from './TikTokHubPage.module.css';

const videos = [
  { id: 1, creator: '@Viper.eth', title: 'NesaVerse x PixelArmy EPIC Collab 🔥', views: '8.2M', likes: '1.1M', category: 'Gaming', thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2tTeKh5jxP2Zfn0lUzEw1j7BBgDUReo0usj0t3uQ7-cDduCyb4bXygwQVhHBayOW2h2PmwdUMPsdzKDUPFtY9nMZC8BYWX2KM_yElv8n2Kvpw1OG0gpBJYaw6wvnKW14KSGOzGHu7CHTgsoth1VfJOfwV7z7tmqCCIlc2StPdzwg-zuWe6a5l_Ej07Pqo_NWlsLEr61yIY_2YdYtK6NmUsidrxmWlchuIKJ1PLJXYP8vNkXhBMwWKdcJtsruMEZvdPSosGTmNADM', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCfpnQHAauZhNMkVxEucI8YnYxpjYo41F5UHzzjOf9CINKrpLfO8aVOgcp-Vl0en4pwOe13EAFyH7UjnB8dLoMIaRIE4G6IceUnBFnMl__UsZwTtxgcUf7EZt2CenFHcDOodrCi3WTd2bUgyjT3r8B978onqzc4yM1WdALFFVxg5qeN0PLCOc0jFQ5onhsZupbwCGbF-KzPQVPrROcP1pMM9R-xkmN55uSdMAB4VR4SnF2-k-R3QlbIUexASwLVIGA-zsjsVEBtZU', trending: true, duration: '0:47' },
  { id: 2, creator: '@NeonKat', title: 'AI Art Tutorial: Midjourney Masterclass', views: '4.5M', likes: '620K', category: 'AI-Art', thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRzcBerLapVvk3TzyGqRwLdbnoL5N1PCTC2sdmlwJAmx9F7MnQoM7G8WRi2Gbf1p08Jlnytd-SRfTY556tudmF1Sbk57v9RJWpE-WXcTER-N7HAdUzQVayVyHA6lfdqPMtQduwVcZGMvt0blU5nq2fDg7unVltWQu0zf8B2j9t5_AtXy9iP5ToJjAReG8E1rlMyHiWnAAWppSUAEBceARxRzttnjrAS27lnptYMERHHsgdE6cv4H9bAc2ZOIaHvjE0g_jYj_459ao', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdouzG8-pPr-YVAZRIl03eMGHVYseAGOgRknQlsS4Zd74B5skaTMcKYxz56_JhbJuyUVDwavJMcaSTEDWKue3yQgZbxQaa3o3K9--RMz9AkibhERP1fkCRbZ5HQq1EMzBJmyx2ZguQCrU0NH_tK-8JTXleA-VBdG_BJ1O3ord55FNkUpZZnbdzujEW8J1EEcvG-FOueC60ZUHBKWQS2cbvS4brK3VhNbzLlv7jNj_ZiHXXcXrOjM5GhohrdtueL_iDXnNAfszPwLE', trending: false, duration: '2:15' },
  { id: 3, creator: '@DankLord_', title: 'Meme Compilation NesaVerse ft. TechWave', views: '12.7M', likes: '2.3M', category: 'Memes', thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2tTeKh5jxP2Zfn0lUzEw1j7BBgDUReo0usj0t3uQ7-cDduCyb4bXygwQVhHBayOW2h2PmwdUMPsdzKDUPFtY9nMZC8BYWX2KM_yElv8n2Kvpw1OG0gpBJYaw6wvnKW14KSGOzGHu7CHTgsoth1VfJOfwV7z7tmqCCIlc2StPdzwg-zuWe6a5l_Ej07Pqo_NWlsLEr61yIY_2YdYtK6NmUsidrxmWlchuIKJ1PLJXYP8vNkXhBMwWKdcJtsruMEZvdPSosGTmNADM', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDP6mxX2zHysneidishNSMPiRzelXkebcI6egAsW9lTNa3A13vYYJWh9GegRRvP_do4KGqsQpidg7PrI3fMcBubT94SWKWKmXSzSgG-Yf8F4EI7k8Ly4CDJYFF6V_aznrCriWqSvEagWJYGR0RM6l6BN-ZQD9Z7KAHNpmH_OpxOMoVtEl-Ej1p4NQOnKEZjMWFhFWjjVKD3sjVY16-HIicW5QMvLcwKdAGsJ4JiRRKdDI3FqRixYQzwDt1AFBVvzYUWBtXQn9YxDYU', trending: true, duration: '1:02' },
  { id: 4, creator: '@TechWave_ID', title: 'GPT-5 Review: Game Changer or Hype?', views: '6.1M', likes: '890K', category: 'Tech', thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRzcBerLapVvk3TzyGqRwLdbnoL5N1PCTC2sdmlwJAmx9F7MnQoM7G8WRi2Gbf1p08Jlnytd-SRfTY556tudmF1Sbk57v9RJWpE-WXcTER-N7HAdUzQVayVyHA6lfdqPMtQduwVcZGMvt0blU5nq2fDg7unVltWQu0zf8B2j9t5_AtXy9iP5ToJjAReG8E1rlMyHiWnAAWppSUAEBceARxRzttnjrAS27lnptYMERHHsgdE6cv4H9bAc2ZOIaHvjE0g_jYj_459ao', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeWix45HGRnvtB12X3_J-XTZInVaKph2TK9NnYZcRDMLf3a-uJAEvxclTW2IDGMSoBkJjgEN9lfLoyz_lIdWIAzLlAeqRCZyC4mBVPNsjcMTyI6KMx8cabb3l_tFQtX75JIf65SkdvHXZAwWEHmhtaqEPh_bqDETvamQLLChngzJZBn-2KQIa7_MdDW81ABka9cj-9sLifO5qQA4tpdytZsIufeqpmXqCJCNdk8d831NLLYlcXJ0AsgfhlHczIbgn6nPy2b2PF6UQ', trending: false, duration: '3:28' },
  { id: 5, creator: '@PixelArmy_ID', title: 'Top 10 Gaming Moments Bulan Ini 🎮', views: '9.8M', likes: '1.7M', category: 'Gaming', thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2tTeKh5jxP2Zfn0lUzEw1j7BBgDUReo0usj0t3uQ7-cDduCyb4bXygwQVhHBayOW2h2PmwdUMPsdzKDUPFtY9nMZC8BYWX2KM_yElv8n2Kvpw1OG0gpBJYaw6wvnKW14KSGOzGHu7CHTgsoth1VfJOfwV7z7tmqCCIlc2StPdzwg-zuWe6a5l_Ej07Pqo_NWlsLEr61yIY_2YdYtK6NmUsidrxmWlchuIKJ1PLJXYP8vNkXhBMwWKdcJtsruMEZvdPSosGTmNADM', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCfpnQHAauZhNMkVxEucI8YnYxpjYo41F5UHzzjOf9CINKrpLfO8aVOgcp-Vl0en4pwOe13EAFyH7UjnB8dLoMIaRIE4G6IceUnBFnMl__UsZwTtxgcUf7EZt2CenFHcDOodrCi3WTd2bUgyjT3r8B978onqzc4yM1WdALFFVxg5qeN0PLCOc0jFQ5onhsZupbwCGbF-KzPQVPrROcP1pMM9R-xkmN55uSdMAB4VR4SnF2-k-R3QlbIUexASwLVIGA-zsjsVEBtZU', trending: true, duration: '0:58' },
  { id: 6, creator: '@VoidAesthetic', title: 'Lofi Study Chill Vibes — NesaVerse Mix', views: '3.2M', likes: '510K', category: 'Lifestyle', thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRzcBerLapVvk3TzyGqRwLdbnoL5N1PCTC2sdmlwJAmx9F7MnQoM7G8WRi2Gbf1p08Jlnytd-SRfTY556tudmF1Sbk57v9RJWpE-WXcTER-N7HAdUzQVayVyHA6lfdqPMtQduwVcZGMvt0blU5nq2fDg7unVltWQu0zf8B2j9t5_AtXy9iP5ToJjAReG8E1rlMyHiWnAAWppSUAEBceARxRzttnjrAS27lnptYMERHHsgdE6cv4H9bAc2ZOIaHvjE0g_jYj_459ao', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdouzG8-pPr-YVAZRIl03eMGHVYseAGOgRknQlsS4Zd74B5skaTMcKYxz56_JhbJuyUVDwavJMcaSTEDWKue3yQgZbxQaa3o3K9--RMz9AkibhERP1fkCRbZ5HQq1EMzBJmyx2ZguQCrU0NH_tK-8JTXleA-VBdG_BJ1O3ord55FNkUpZZnbdzujEW8J1EEcvG-FOueC60ZUHBKWQS2cbvS4brK3VhNbzLlv7jNj_ZiHXXcXrOjM5GhohrdtueL_iDXnNAfszPwLE', trending: false, duration: '4:12' },
];

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
      <button className={styles.playBtn} aria-label="Play">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '40px' }}>play_circle</span>
      </button>
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
  const filtered = activeCategory === 'All' ? videos : videos.filter((v) => v.category === activeCategory);

  return (
    <div className={styles.page}>
      <div className={styles.meshBg} aria-hidden="true" />
      <header className={`container ${styles.pageHeader}`}>
        <div className={styles.ttBadge}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '18px' }}>play_circle</span>
          TikTok Hub
        </div>
        <h1 className={styles.pageTitle}>
          Video <span className={styles.gradTitle}>Trending</span> NesaVerse
        </h1>
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
        {filtered.map((v) => <VideoCard key={v.id} v={v} />)}
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
            <Button variant="primary" size="lg">Submit Video</Button>
            <Button variant="secondary" size="lg">Join Creator Program</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TikTokHubPage;
