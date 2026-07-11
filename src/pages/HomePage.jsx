import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import SEO from '../components/SEO';
import styles from './HomePage.module.css';

const features = [
  { icon: 'hub', title: 'Discord Communities', desc: 'Join thousands of curated Discord servers across gaming, tech, art, and more.', to: '/discord' },
  { icon: 'chat', title: 'WhatsApp Channels', desc: 'Discover the most exclusive WhatsApp channels delivering premium content daily.', to: '/whatsapp' },
  { icon: 'groups', title: 'Creator Network', desc: 'Connect with elite creators, form clans, and build your digital legacy together.', to: '/about' },
  { icon: 'shield', title: 'Safe & Moderated', desc: 'Every community is vetted and monitored for quality and safety standards.', to: '#' },
  { icon: 'bolt', title: 'Live Analytics', desc: 'Real-time insights on community growth, engagement, and viral velocity.', to: '#' },
  { icon: 'rocket_launch', title: 'Growth Tools', desc: 'Exclusive partner tools to amplify your reach and grow exponentially.', to: '#' },
];

const stats = [
  { value: '500+', label: 'Communities' },
  { value: '50K+', label: 'Members' },
  { value: '100+', label: 'Discord Servers' },
  { value: '2K+', label: 'Active Creators' },
];

const HomePage = () => {
  return (
    <div className={styles.page}>
      <SEO 
        title="Home for Digital Communities" 
        description="NesaVerse is the backbone of digital expression. Discover and explore curated Discord servers, WhatsApp channels, and digital creator hubs."
        keywords="nesaverse, communities, discord servers, whatsapp channels, digital creators, gaming hubs"
      />
      {/* Floating background shapes */}
      <div className={styles.bgShapes} aria-hidden="true">
        <div className={`${styles.shape} ${styles.shape1} floating-shape`} />
        <div className={`${styles.shape} ${styles.shape2} floating-shape`} style={{ animationDelay: '-2s' }} />
        <div className={`${styles.shape} ${styles.shape3} floating-shape`} style={{ animationDelay: '-4s' }} />
      </div>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroBadge}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>bolt</span>
            The Future of Digital Communities
          </div>
          <h1 className={styles.heroTitle}>
            Welcome to the{' '}
            <span className="gradient-text">NesaVerse</span>{' '}
            
          </h1>
          <p className={styles.heroSub}>
            We are building the backbone of digital expression. NesaVerse  exists to synchronize
            the heartbeat of internet culture — a high-fidelity home for creators, clans, and communities
            to collide and create something legendary.
          </p>
          <div className={styles.heroCtas}>
            <Link to="/discord">
              <Button variant="primary" size="lg">
                <span className="material-symbols-outlined">hub</span>
                Explore Discord Hubs
              </Button>
            </Link>
            <Link to="/whatsapp">
              <Button variant="secondary" size="lg">
                <span className="material-symbols-outlined">chat</span>
                WhatsApp Channels
              </Button>
            </Link>
          </div>

          {/* Quick stats */}
          <div className={styles.heroStats}>
            {stats.map((s) => (
              <div key={s.label} className={styles.heroStat}>
                <span className={styles.heroStatValue}>{s.value}</span>
                <span className={styles.heroStatLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero visual */}
        <div className={styles.heroVisual} aria-hidden="true">
          <div className={styles.orb1} />
          <div className={styles.orb2} />
          <div className={styles.orb3} />
          <div className={styles.gridPattern} />
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>What We Offer</span>
            <h2 className={styles.sectionTitle}>
              Everything You Need to{' '}
              <span className="gradient-text">Build Your Verse</span>
            </h2>
            <p className={styles.sectionDesc}>
              From curated community directories to real-time analytics — NesaVerse provides the tools
              and ecosystem to grow your digital presence.
            </p>
          </div>
          <div className={styles.featureGrid}>
            {features.map((f) => (
              <Link to={f.to} key={f.title} className={`${styles.featureCard} glass-panel`}>
                <div className={styles.featureIcon}>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '28px' }}>
                    {f.icon}
                  </span>
                </div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
                <span className={styles.featureArrow}>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={`container ${styles.ctaInner}`}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Join the Nesaverse?</h2>
            <p className={styles.ctaDesc}>
              Apply to feature your community and get access to exclusive growth tools,
              partner integrations, and front-page placement.
            </p>
            <div className={styles.ctaBtns}>
              <Link to="/discord">
                <Button variant="primary" size="lg">Get Started</Button>
              </Link>
              <Link to="/about">
                <Button variant="ghost" size="lg">Learn More</Button>
              </Link>
            </div>
          </div>
          <div className={styles.ctaDecor} aria-hidden="true">
            <div className={styles.ctaOrb} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
