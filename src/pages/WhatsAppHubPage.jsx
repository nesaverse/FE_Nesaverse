import { useState, useEffect } from 'react';
import { fetchChannels } from '../utils/api';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import styles from './WhatsAppHubPage.module.css';

const CATEGORIES = ['All', 'Gaming', 'DankMemes', 'Entertainment', 'AI-Art', 'Tech', 'Elite'];

const formatNum = (n) => {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return n.toString();
};

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
      <a href="#" className={styles.joinBtn} onClick={(e) => e.preventDefault()}>
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
      <div
        className={styles.meshBg}
        style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(0,32,104,0.04) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(254,203,0,0.06) 0%, transparent 40%)`,
        }}
        aria-hidden="true"
      />

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
              <Button variant="primary" size="lg">Submit your Channel</Button>
              <Button variant="secondary" size="lg">Partner with Us</Button>
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
