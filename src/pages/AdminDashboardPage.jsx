import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchStats, fetchCommunities } from '../utils/api';
import styles from './AdminDashboardPage.module.css';

// ─── Realtime hook: polling every 3 seconds ───────────────────────────────
function useRealtimeStats(intervalMs = 3000) {
  const [stats, setStats] = useState(null);
  const [prevStats, setPrevStats] = useState(null);

  const load = useCallback(() => {
    fetchStats()
      .then((data) => {
        setPrevStats((prev) => prev || data);
        setStats((old) => {
          setPrevStats(old);
          return data;
        });
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(load, intervalMs);
    return () => clearInterval(id);
  }, [load, intervalMs]);

  return { stats, prevStats };
}

// ─── Mini sparkline bar ───────────────────────────────────────────────────
const Sparkline = ({ values, color }) => (
  <div className={styles.sparkline}>
    {values.map((v, i) => (
      <div
        key={i}
        className={styles.sparkBar}
        style={{ height: `${v}%`, background: color }}
      />
    ))}
  </div>
);

// colour palette for stat cards (hex, not CSS vars — needed for template literals)
const CARD_COLORS = {
  primary:   { hex: '#002068', bg: 'rgba(0,32,104,0.08)' },
  secondary: { hex: '#745b00', bg: 'rgba(116,91,0,0.08)' },
  tertiary:  { hex: '#0d2557', bg: 'rgba(13,37,87,0.08)' },
};

// ─── Stat Card ────────────────────────────────────────────────────────────
const StatCard = ({ title, value, change, icon, colorKey = 'primary', sparkValues, trend = 'up' }) => {
  const trendColor = trend === 'up' ? '#22c55e' : '#ef4444';
  const { hex, bg } = CARD_COLORS[colorKey] ?? CARD_COLORS.primary;
  return (
    <article className={styles.statCard}>
      <div className={styles.statTop}>
        <div>
          <p className={styles.statTitle}>{title}</p>
          <h3 className={styles.statValue} style={{ color: hex }}>{value}</h3>
        </div>
        <span className={styles.statIcon} style={{ background: bg, color: hex }}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
        </span>
      </div>
      <div className={styles.statChange}>
        <span className={styles.changeBadge} style={{ background: `${trendColor}18`, color: trendColor }}>
          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
            {trend === 'up' ? 'trending_up' : 'trending_down'}
          </span>
          {change}
        </span>
        <span className={styles.changeLabel}>vs last update</span>
      </div>
      <Sparkline values={sparkValues} color={hex} />
    </article>
  );
};

// ─── Safety score bar ─────────────────────────────────────────────────────
const SafetyBar = ({ score }) => {
  const color = score >= 90 ? '#22c55e' : score >= 70 ? '#f59e0b' : '#ef4444';
  return (
    <div className={styles.safetyWrap} title={`Safety: ${score}%`}>
      <div className={styles.safetyTrack}>
        <div className={styles.safetyFill} style={{ width: `${score}%`, background: color }} />
      </div>
      <span className={styles.safetyValue} style={{ color }}>{score}%</span>
    </div>
  );
};

// ─── Activity log item ────────────────────────────────────────────────────
const activityLog = [
  { icon: 'person_add', text: 'New member joined Nesa_Nexus', time: '2s ago', color: '#22c55e' },
  { icon: 'flag', text: 'Report flagged in Creative_Core', time: '14s ago', color: '#f59e0b' },
  { icon: 'hub', text: 'PixelArmy reached 1.1M members', time: '1m ago', color: 'var(--color-primary)' },
  { icon: 'security', text: 'Safety scan completed — 0 issues', time: '3m ago', color: '#22c55e' },
  { icon: 'person_cancel', text: 'User banned from TechWave', time: '7m ago', color: '#ef4444' },
];

// ─── Main Page ────────────────────────────────────────────────────────────
const AdminDashboardPage = () => {
  const { stats, prevStats } = useRealtimeStats(3000);
  const [communities, setCommunities] = useState([]);
  const [loadingCom, setLoadingCom] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Update timestamp on stats change
  useEffect(() => {
    if (stats) setLastUpdated(new Date());
  }, [stats]);

  // Load communities once
  useEffect(() => {
    fetchCommunities()
      .then(setCommunities)
      .catch(() => setCommunities([]))
      .finally(() => setLoadingCom(false));
  }, []);

  const fmt = (n) => {
    if (!n && n !== 0) return '—';
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
    if (n >= 1_000) return `${n.toLocaleString()}`;
    return String(n);
  };

  const diff = (curr, prev, key) => {
    if (!curr || !prev) return null;
    const delta = curr[key] - prev[key];
    const sign = delta >= 0 ? '+' : '';
    return { label: `${sign}${delta.toLocaleString()}`, trend: delta >= 0 ? 'up' : 'down' };
  };

  const visitorsDiff = diff(stats, prevStats, 'totalVisitors');
  const commDiff = diff(stats, prevStats, 'activeCommunities');
  const velDiff = diff(stats, prevStats, 'nesaVelocity');

  // Memoize sparklines so they don't re-randomise on every 3-second poll
  const barsRef = useRef({
    visitors: Array.from({ length: 6 }, () => Math.floor(Math.random() * 60 + 30)),
    communities: Array.from({ length: 6 }, () => Math.floor(Math.random() * 60 + 30)),
    velocity: Array.from({ length: 6 }, () => Math.floor(Math.random() * 60 + 30)),
  });

  return (
    <div className={styles.page}>
      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.headerTitle}>Analytics Overview</h1>
          <p className={styles.headerSub}>
            Live data · Last updated{' '}
            <time dateTime={lastUpdated.toISOString()}>
              {lastUpdated.toLocaleTimeString()}
            </time>
          </p>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.searchWrap}>
            <span className="material-symbols-outlined" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-outline)', fontSize: '18px' }}>search</span>
            <input
              type="search"
              placeholder="Search commands..."
              className={styles.searchInput}
              aria-label="Search commands"
            />
          </div>
          <button className={styles.notifBtn} aria-label="Notifications">
            <span className="material-symbols-outlined">notifications</span>
            <span className={styles.notifDot} />
          </button>
          <button className={styles.exportBtn}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>download</span>
            Export Report
          </button>
        </div>
      </header>

      {/* ── Realtime pulse indicator ── */}
      <div className={styles.realtimeBanner}>
        <span className={styles.realtimeDot} />
        <span>Realtime — data refreshes every 3 seconds</span>
        {stats && (
          <span className={styles.realtimeViral}>
            Viral Index: <strong>{stats.viralIndex}</strong>
          </span>
        )}
      </div>

      {/* ── Stat Cards ── */}
      <section className={styles.statsGrid} aria-label="Analytics cards">
        {stats ? (
          <>
            <StatCard
              title="Total Visitors"
              value={fmt(stats.totalVisitors)}
              change={visitorsDiff?.label ?? '+0'}
              trend={visitorsDiff?.trend ?? 'up'}
              icon="trending_up"
              colorKey="primary"
              sparkValues={barsRef.current.visitors}
            />
            <StatCard
              title="Active Communities"
              value={fmt(stats.activeCommunities)}
              change={commDiff?.label ?? '+0'}
              trend={commDiff?.trend ?? 'up'}
              icon="hub"
              colorKey="secondary"
              sparkValues={barsRef.current.communities}
            />
            <StatCard
              title="Nesa Velocity"
              value={`${fmt(stats.nesaVelocity)}/min`}
              change={velDiff?.label ? `${velDiff.label}/min` : 'Stable'}
              trend={velDiff?.trend ?? 'up'}
              icon="bolt"
              colorKey="tertiary"
              sparkValues={barsRef.current.velocity}
            />
          </>
        ) : (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={`skeleton ${styles.skeletonCard}`} />
          ))
        )}
      </section>

      {/* ── Table + Activity ── */}
      <section className={styles.lowerGrid}>
        {/* Communities Table */}
        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <h2 className={styles.tableTitle}>Recent Communities</h2>
            <button className={styles.viewAllBtn}>View All</button>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Community</th>
                  <th>Members</th>
                  <th>Growth</th>
                  <th>Safety</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loadingCom ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 5 }).map((__, j) => (
                        <td key={j}><div className="skeleton" style={{ height: '16px', borderRadius: '4px' }} /></td>
                      ))}
                    </tr>
                  ))
                ) : (
                  communities.map((c) => (
                    <tr key={c.id}>
                      <td>
                        <div className={styles.comCell}>
                          <div
                            className={styles.comInitial}
                            style={{
                              background: c.color === 'secondary' ? 'var(--color-secondary-container)' : 'var(--color-primary)',
                              color: c.color === 'secondary' ? 'var(--color-on-secondary-container)' : 'white',
                            }}
                          >
                            {c.initial}
                          </div>
                          <div>
                            <p className={styles.comName}>{c.name}</p>
                            <p className={styles.comMembers}>{c.members} members</p>
                          </div>
                        </div>
                      </td>
                      <td className={styles.tdMembers}>{c.members}</td>
                      <td className={styles.tdGrowth}>{c.growth}</td>
                      <td><SafetyBar score={c.safetyScore} /></td>
                      <td>
                        <div className={styles.actions}>
                          <button className={styles.actionEdit} aria-label={`Edit ${c.name}`}>
                            <span className="material-symbols-outlined">edit</span>
                          </button>
                          <button className={styles.actionDelete} aria-label={`Delete ${c.name}`}>
                            <span className="material-symbols-outlined">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Log */}
        <div className={styles.activityCard}>
          <h2 className={styles.tableTitle} style={{ marginBottom: '20px' }}>Live Activity</h2>
          <ul className={styles.activityList}>
            {activityLog.map((item, i) => (
              <li key={i} className={styles.activityItem}>
                <span
                  className={styles.activityIcon}
                  style={{ background: `${item.color}15`, color: item.color }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>
                    {item.icon}
                  </span>
                </span>
                <div className={styles.activityContent}>
                  <p className={styles.activityText}>{item.text}</p>
                  <p className={styles.activityTime}>{item.time}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Staff Control */}
          <div className={styles.staffControl}>
            <h3 className={styles.staffTitle}>Staff Control</h3>
            <div className={styles.staffRole}>
              <div className={styles.staffRoleHeader}>
                <span className={styles.staffRoleName} style={{ color: 'var(--color-primary)' }}>Founder</span>
                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--color-primary)', fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
              <button className={styles.manageBtn}>Manage Access</button>
            </div>
            <div className={styles.staffRole}>
              <div className={styles.staffRoleHeader}>
                <span className={styles.staffRoleName} style={{ color: 'var(--color-secondary)' }}>Admin</span>
                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--color-secondary)', fontVariationSettings: "'FILL' 1" }}>shield</span>
              </div>
              <p className={styles.staffCount}>12 Active Personnel</p>
              <button className={styles.assignBtn}>Assign New</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAB ── */}
      <button className={styles.fab} aria-label="Quick action">
        <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>add</span>
      </button>
    </div>
  );
};

export default AdminDashboardPage;
