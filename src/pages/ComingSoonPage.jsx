import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Button from '../components/ui/Button';
import styles from './ComingSoonPage.module.css';

const ComingSoonPage = () => {
  return (
    <div className={styles.page}>
      <SEO 
        title="Coming Soon — Fitur Baru Sedang Dibuat" 
        description="Fitur baru NesaVerse sedang dalam proses pengembangan. Kami akan segera hadir dengan konten yang luar biasa!"
        keywords="nesaverse coming soon, fitur baru nesaverse, under construction, game hub indonesia"
      />
      
      {/* Dynamic Background Blurs */}
      <div className={styles.bgShapes} aria-hidden="true">
        <div className={`${styles.shape} ${styles.shape1} floating-shape`} />
        <div className={`${styles.shape} ${styles.shape2} floating-shape`} style={{ animationDelay: '-3s' }} />
        <div className={`${styles.shape} ${styles.shape3} floating-shape`} style={{ animationDelay: '-6s' }} />
      </div>

      <div className={`container ${styles.container}`}>
        <div className={`${styles.card} glass-panel animate-fade-in-up`}>
          <div className={styles.iconBadge}>
            <span className="material-symbols-outlined" style={{ fontSize: '24px', fontVariationSettings: "'FILL' 1" }}>construction</span>
          </div>

          <h1 className={styles.title}>
            Coming <span className="gradient-text">Soon</span>
          </h1>

          <p className={styles.description}>
            Kami sedang bekerja keras menyelaraskan detak jantung budaya digital Anda. Fitur baru yang luar biasa sedang dibangun di balik layar NesaVerse dan akan segera hadir.
          </p>

          {/* Navigation link back to safety */}
          <div className={styles.actions}>
            <Link to="/">
              <Button variant="secondary" size="md">
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
                Kembali ke Beranda
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
