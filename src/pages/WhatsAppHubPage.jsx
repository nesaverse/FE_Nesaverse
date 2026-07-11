import { useState, useEffect } from 'react';
import { fetchChannels } from '../utils/api';
import { WA_TEMPLATES } from '../utils/whatsapp';
import { formatNum } from '../utils/format';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import SEO from '../components/SEO';
import styles from './WhatsAppHubPage.module.css';

const CATEGORIES = ['All', 'Gaming', 'DankMemes', 'Entertainment', 'AI-Art', 'Tech', 'Elite'];

const ChannelCard = ({ channel }) => {
  const colorMap = { Gaming: 'primary', DankMemes: 'secondary', Entertainment: 'tertiary', 'AI-Art': 'primary', Tech: 'secondary', Elite: 'primary', Cinema: 'tertiary' };
  const badgeColor = colorMap[channel.category] || 'primary';
  return (
    <article className={`${styles.channelCard} glass-panel`}>
      <div className={styles.cardTop}>
        <img src={channel.avatar} alt={channel.name} className={styles.avatar} loading="lazy" />
        <Badge label={`#${channel.category}`} color={badgeColor} />
      </div>
      <div>
        <h3 className={styles.channelName}>{channel.name}</h3>
        <div className={styles.followersRow}>
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>groups</span>
          <span className={styles.followersText}>{formatNum(channel.followers)} Followers</span>
        </div>
        <p className={styles.channelDesc}>{channel.description}</p>
      </div>
      <a href={channel.link || WA_TEMPLATES.whatsapp} target="_blank" rel="noopener noreferrer" className={styles.joinBtn}>
        Join Channel
      </a>
    </article>
  );
};

const WhatsAppHubPage = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (activeCategory !== 'All') params.category = activeCategory;
    if (search) params.search = search;

    const timer = setTimeout(() => {
      fetchChannels(params)
        .then(setChannels)
        .catch(() => setChannels([]))
        .finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(timer);
  }, [activeCategory, search]);

  return (
    <div className={styles.page}>
      <SEO 
        title="WhatsApp Hub — Direktori Channel Terkurasi" 
        description="Temukan dan ikuti channel WhatsApp terpopuler dan terkurasi untuk gaming, meme, teknologi, dan hiburan di NesaVerse."
        keywords="whatsapp channel indonesia, direktori whatsapp channel, nesaverse whatsapp, whatsapp community"
      />
      <div className={styles.meshBg} aria-hidden="true" />
      <div className={`${styles.orb1} orb orb1`} aria-hidden="true" />
      <div className={`${styles.orb2} orb orb2`} aria-hidden="true" />

      {/* Header */}
      <header className={`container ${styles.pageHeader}`}>
        <h1 className={styles.pageTitle}>WhatsApp Channel Directory</h1>
        <p className={styles.pageDesc}>
          The ultimate hub for the most exclusive WhatsApp communities in the NesaVerse Network.
        </p>
      </header>

      {/* Search */}
      <div className={`container ${styles.searchBar}`}>
        <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
        <input
          type="search"
          placeholder="Search channels by name..."
          className={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search WhatsApp channels"
        />
      </div>

      {/* Filter */}
      <section className={`container ${styles.filterSection}`} aria-label="Filter categories">
        <div className={styles.categories}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`${styles.catBtn} ${activeCategory === cat ? styles.catActive : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'All' ? 'All Hubs' : `#${cat}`}
            </button>
          ))}
        </div>
      </section>

      {/* Channel Grid */}
      <section className={`container ${styles.channelGrid}`}>
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`skeleton ${styles.skeletonCard}`} />
          ))
        ) : channels.length === 0 ? (
          <div className={styles.empty}>
            <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--color-outline)' }}>search_off</span>
            <p>No channels found for "{search || activeCategory}"</p>
          </div>
        ) : (
          channels.map((ch) => <ChannelCard key={ch.id} channel={ch} />)
        )}
      </section>

      {/* CTA */}
      <section className={`container ${styles.ctaSection}`}>
        <div className={`${styles.ctaCard} glass-panel`}>
          <div className={styles.ctaGlow1} />
          <div className={styles.ctaGlow2} />
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Own a Massive Channel?</h2>
            <p className={styles.ctaDesc}>
              Get featured in our network and grow your community exponentially.
              We only accept the highest quality content hubs.
            </p>
            <div className={styles.ctaBtns}>
              <a href={WA_TEMPLATES.whatsapp} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg">Daftar Channel</Button>
              </a>
              <a href={WA_TEMPLATES.whatsapp} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="lg">Partner with Us</Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAB */}
      <button className={styles.fab} aria-label="Add your channel">
        <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>add</span>
      </button>
    </div>
  );
};

export default WhatsAppHubPage;
