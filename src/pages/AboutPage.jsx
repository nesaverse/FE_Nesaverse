import { useState, useEffect } from 'react';
import { useIntersection } from '../hooks/useIntersection';
import { useCountUp } from '../hooks/useCountUp';
import { fetchStats } from '../utils/api';
import Button from '../components/ui/Button';
import styles from './AboutPage.module.css';

const team = [
  { name: 'Viper.eth', role: 'Founder', border: 'primary', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCfpnQHAauZhNMkVxEucI8YnYxpjYo41F5UHzzjOf9CINKrpLfO8aVOgcp-Vl0en4pwOe13EAFyH7UjnB8dLoMIaRIE4G6IceUnBFnMl__UsZwTtxgcUf7EZt2CenFHcDOodrCi3WTd2bUgyjT3r8B978onqzc4yM1WdALFFVxg5qeN0PLCOc0jFQ5onhsZupbwCGbF-KzPQVPrROcP1pMM9R-xkmN55uSdMAB4VR4SnF2-k-R3QlbIUexASwLVIGA-zsjsVEBtZU' },
  { name: 'Neon_Kat', role: 'Head Admin', border: 'secondary', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdouzG8-pPr-YVAZRIl03eMGHVYseAGOgRknQlsS4Zd74B5skaTMcKYxz56_JhbJuyUVDwavJMcaSTEDWKue3yQgZbxQaa3o3K9--RMz9AkibhERP1fkCRbZ5HQq1EMzBJmyx2ZguQCrU0NH_tK-8JTXleA-VBdG_BJ1O3ord55FNkUpZZnbdzujEW8J1EEcvG-FOueC60ZUHBKWQS2cbvS4brK3VhNbzLlv7jNj_ZiHXXcXrOjM5GhohrdtueL_iDXnNAfszPwLE' },
  { name: 'DankLord', role: 'Manager', border: 'secondary', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDP6mxX2zHysneidishNSMPiRzelXkebcI6egAsW9lTNa3A13vYYJWh9GegRRvP_do4KGqsQpidg7PrI3fMcBubT94SWKWKmXSzSgG-Yf8F4EI7k8Ly4CDJYFF6V_aznrCriWqSvEagWJYGR0RM6l6BN-ZQD9Z7KAHNpmH_OpxOMoVtEl-Ej1p4NQOnKEZjMWFhFWjjVKD3sjVY16-HIicW5QMvLcwKdAGsJ4JiRRKdDI3FqRixYQzwDt1AFBVvzYUWBtXQn9YxDYU' },
  { name: 'Zero_Void', role: 'Moderator', border: 'primary', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeWix45HGRnvtB12X3_J-XTZInVaKph2TK9NnYZcRDMLf3a-uJAEvxclTW2IDGMSoBkJjgEN9lfLoyz_lIdWIAzLlAeqRCZyC4mBVPNsjcMTyI6KMx8cabb3l_tFQtX75JIf65SkdvHXZAwWEHmhtaqEPh_bqDETvamQLLChngzJZBn-2KQIa7_MdDW81ABka9cj-9sLifO5qQA4tpdytZsIufeqpmXqCJCNdk8d831NLLYlcXJ0AsgfhlHczIbgn6nPy2b2PF6UQ' },
];

const StatCounter = ({ target, label, suffix = '+', color = 'primary' }) => {
  const { ref, isVisible } = useIntersection();
  const count = useCountUp(target, 2000, isVisible);
  const display = target > 1000 ? `${(count / 1000).toFixed(0)}K` : count;
  return (
    <div ref={ref} className={`${styles.stat} ${styles[`stat-${color}`]}`}>
      <span className={styles.statValue}>{display}{suffix}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
};

const AboutPage = () => {
  const [statsData, setStatsData] = useState(null);

  useEffect(() => {
    fetchStats().then(setStatsData).catch(() => {
      setStatsData({ communities: 500, members: 50000, accounts: 2000, servers: 100 });
    });
  }, []);

  return (
    <div className={styles.page}>
      {/* Floating shapes */}
      <div className={styles.bgShapes} aria-hidden="true">
        <div className={`${styles.shape1} floating-shape`} />
        <div className={`${styles.shape2} floating-shape`} style={{ animationDelay: '-2s' }} />
      </div>

      {/* Mission */}
      <section className={`container ${styles.mission}`}>
        <div className={styles.missionText}>
          <h1 className={styles.missionTitle}>
            About <span className="gradient-text">NesaVerse Network</span>
          </h1>
          <p className={styles.missionDesc}>
            We are building the backbone of digital expression. NesaVerse Network exists to synchronize
            the heartbeat of internet culture, providing a high-fidelity home for creators, clans, and
            communities to collide and create something legendary.
          </p>
          <div className={styles.missionBtns}>
            <Button variant="primary" size="md">Join the Network</Button>
            <Button variant="secondary" size="md">Read Docs</Button>
          </div>
        </div>
        <div className={styles.missionVisual}>
          <div className={styles.imgGlow} />
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRzcBerLapVvk3TzyGqRwLdbnoL5N1PCTC2sdmlwJAmx9F7MnQoM7G8WRi2Gbf1p08Jlnytd-SRfTY556tudmF1Sbk57v9RJWpE-WXcTER-N7HAdUzQVayVyHA6lfdqPMtQduwVcZGMvt0blU5nq2fDg7unVltWQu0zf8B2j9t5_AtXy9iP5ToJjAReG8E1rlMyHiWnAAWppSUAEBceARxRzttnjrAS27lnptYMERHHsgdE6cv4H9bAc2ZOIaHvjE0g_jYj_459ao"
            alt="NesaVerse Network — Futuristic neural network visualization"
            className={styles.missionImg}
            loading="lazy"
          />
        </div>
      </section>

      {/* Stats */}
      <section className={styles.statsSection}>
        <div className={`container ${styles.statsGrid}`}>
          {statsData ? (
            <>
              <StatCounter target={statsData.communities} label="Communities" color="primary" />
              <StatCounter target={statsData.members} label="Members" suffix="+" color="secondary" />
              <StatCounter target={statsData.accounts} label="Accounts" color="tertiary" />
              <StatCounter target={statsData.servers} label="Servers" color="primary" />
            </>
          ) : (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton" style={{ height: '80px', borderRadius: 'var(--radius-lg)' }} />
            ))
          )}
        </div>
      </section>

      {/* Team */}
      <section className={`container ${styles.teamSection}`}>
        <div className={styles.teamHeader}>
          <h2 className={styles.teamTitle}>
            The Architecture <span className="gradient-text">Team</span>
          </h2>
          <p className={styles.teamDesc}>
            Meet the digital architects maintaining the ecosystem of the NesaVerse Network.
          </p>
        </div>
        <div className={styles.teamGrid}>
          {team.map((member) => (
            <div key={member.name} className={`${styles.teamCard} glass-panel`}>
              <div className={`${styles.avatarWrap} ${styles[`border-${member.border}`]}`}>
                <img src={member.img} alt={member.name} className={styles.avatar} loading="lazy" />
              </div>
              <div className={styles.memberInfo}>
                <h3 className={styles.memberName}>{member.name}</h3>
                <span className={`${styles.memberRole} ${styles[`role-${member.border}`]}`}>
                  {member.role}
                </span>
              </div>
              <div className={styles.memberActions}>
                <button className={styles.actionBtn} aria-label="Message">
                  <span className="material-symbols-outlined">alternate_email</span>
                </button>
                <button className={styles.actionBtn} aria-label="Chat">
                  <span className="material-symbols-outlined">chat</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
