import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  AreaChart, Area,
} from 'recharts';
import { fetchStats, fetchChartData } from '../utils/api';
import { formatNum } from '../utils/format';
import { useTheme } from '../hooks/useTheme';
import styles from './AdminDashboardPage.module.css';

/* ─── Stat Card ─────────────────────────────────────────────── */
const PALETTE = {
  blue:   { hex: '#3557bc', bg: 'rgba(53,87,188,0.12)',  light: '#7aa3ff' },
  amber:  { hex: '#d97706', bg: 'rgba(217,119,6,0.1)',   light: '#fbbf24' },
  green:  { hex: '#059669', bg: 'rgba(5,150,105,0.1)',   light: '#34d399' },
  violet: { hex: '#7c3aed', bg: 'rgba(124,58,237,0.1)',  light: '#a78bfa' },
};

const StatCard = ({ title, value, sub, icon, palette = 'blue', trend }) => {
  const { hex, bg, light } = PALETTE[palette];
  const isUp = trend >= 0;
  return (
    <div className={styles.statCard}>
      <div className={styles.statTop}>
        <div>
          <p className={styles.statTitle}>{title}</p>
          <p className={styles.statValue}>{value}</p>
        </div>
        <div className={styles.statIcon} style={{ background: bg }}>
          <span className="material-symbols-outlined" style={{ fontSize: 22, color: hex, fontVariationSettings: "'FILL' 1" }}>{icon}</span>
        </div>
      </div>
      <div className={styles.statFooter}>
        {trend != null && (
          <span className={styles.trendBadge} style={{ background: isUp ? 'rgba(5,150,105,0.12)' : 'rgba(220,38,38,0.1)', color: isUp ? '#059669' : '#dc2626' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 13 }}>{isUp ? 'trending_up' : 'trending_down'}</span>
            {Math.abs(trend)}%
          </span>
        )}
        <span className={styles.statSub}>{sub}</span>
      </div>
      <div className={styles.statGlow} style={{ background: light }} />
    </div>
  );
};

/* ─── Custom Tooltip ────────────────────────────────────────── */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipLabel}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} className={styles.tooltipVal} style={{ color: p.color }}>
          {p.name}: <strong>{formatNum(p.value)}</strong>
        </p>
      ))}
    </div>
  );
};

/* ─── Activity Items ────────────────────────────────────────── */
const ACTIVITY_POOL = [
  { text: 'New Discord server registered',   icon: 'hub',           color: '#5865F2' },
  { text: 'Instagram account verified',       icon: 'photo_camera',  color: '#E1306C' },
  { text: 'TikTok content featured',          icon: 'play_circle',   color: '#555' },
  { text: 'Donation received — Rp 50,000',    icon: 'favorite',      color: '#ef4444' },
  { text: 'YouTube channel added',            icon: 'smart_display', color: '#FF0000' },
  { text: 'New community member joined',      icon: 'person_add',    color: '#059669' },
  { text: 'WhatsApp channel updated',         icon: 'chat',          color: '#25D366' },
  { text: 'Roblox game featured',             icon: 'sports_esports',color: '#00A2FF' },
  { text: 'Visitor count milestone: 1000',    icon: 'bar_chart',     color: '#7c3aed' },
  { text: 'System health check passed',       icon: 'check_circle',  color: '#059669' },
];
function makeActivity() {
  const now = new Date();
  return ACTIVITY_POOL.sort(() => Math.random() - 0.5).slice(0, 6).map((a, i) => ({
    ...a,
    time: new Date(now - i * 1000 * 60 * (3 + Math.floor(Math.random() * 20)))
            .toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
  }));
}

/* ─── Platform Links ─────────────────────────────────────────── */
const PLATFORM_LINKS = [
  { label: 'Discord',   to: '/admin/discord',   brandCls: 'fa-brands fa-discord',   color: '#5865F2' },
  { label: 'WhatsApp',  to: '/admin/whatsapp',  brandCls: 'fa-brands fa-whatsapp',  color: '#25D366' },
  { label: 'Instagram', to: '/admin/instagram', brandCls: 'fa-brands fa-instagram', color: '#E1306C' },
  { label: 'TikTok',    to: '/admin/tiktok',    brandCls: 'fa-brands fa-tiktok',    color: '#333' },
  { label: 'YouTube',   to: '/admin/youtube',   brandCls: 'fa-brands fa-youtube',   color: '#FF0000' },
  { label: 'Roblox',    to: '/admin/roblox',    brandCls: 'fa-solid fa-gamepad',    color: '#00A2FF' },
];

/* ═══ AdminDashboardPage ═══════════════════════════════════════ */
const AdminDashboardPage = () => {
  const [stats, setStats]       = useState(null);
  const [chart, setChart]       = useState(null);
  const [activity, setActivity] = useState(makeActivity);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const intervalRef = useRef(null);

  const loadData = useCallback(async () => {
    try {
      const [s, c] = await Promise.all([fetchStats(), fetchChartData()]);
      setStats(s);
      setChart(c);
      setLastUpdated(new Date());
    } catch (_) {}
  }, []);

  useEffect(() => {
    loadData();
    intervalRef.current = setInterval(() => {
      loadData();
      setActivity(makeActivity());
    }, 30_000); // refresh every 30s
    return () => clearInterval(intervalRef.current);
  }, [loadData]);

  const { theme, toggle } = useTheme();
  const timeStr = lastUpdated.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  /* Recharts colors for pie */
  const PIE_COLORS = ['#5865F2','#25D366','#E1306C','#555','#FF0000','#00A2FF'];

  return (
    <div className={styles.page}>

      {/* ── Page Header ── */}
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderLeft}>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <div className={styles.liveChip}>
            <span className={styles.liveDot} />
            Live · Updated {timeStr}
          </div>
        </div>
        <div className={styles.pageHeaderRight}>
          {/* Theme Toggle */}
          <button
            className={styles.themeToggleBtn}
            onClick={toggle}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            aria-label="Toggle theme"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 18, fontVariationSettings: "'FILL' 1" }}
            >
              {theme === 'light' ? 'dark_mode' : 'light_mode'}
            </span>
          </button>

          <Link to="/" className={styles.viewSiteBtn}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>open_in_new</span>
            View Site
          </Link>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className={styles.statsGrid}>
        <StatCard
          title="Total Visitors"
          value={stats ? formatNum(stats.totalVisitors) : '—'}
          sub="Semua waktu"
          icon="groups"
          palette="blue"
          trend={stats ? 12 : null}
        />
        <StatCard
          title="Active Communities"
          value={stats ? formatNum(stats.activeCommunities) : '—'}
          sub="Across 6 platforms"
          icon="hub"
          palette="amber"
          trend={stats ? 5 : null}
        />
        <StatCard
          title="Nesa Velocity"
          value={stats ? `${formatNum(stats.nesaVelocity)}/min` : '—'}
          sub="Interaction rate"
          icon="bolt"
          palette="green"
          trend={stats ? 3 : null}
        />
        <StatCard
          title="Viral Index"
          value={stats ? `${stats.viralIndex} / 10` : '—'}
          sub="Content virality"
          icon="local_fire_department"
          palette="violet"
          trend={null}
        />
      </div>

      {/* ── Quick Platform Access ── */}
      <div className={styles.platformRow}>
        <h2 className={styles.sectionTitle}>Platform Management</h2>
        <div className={styles.platformCards}>
          {PLATFORM_LINKS.map(({ label, to, brandCls, color }) => {
            const count = chart?.platformData?.find(p => p.name === label)?.value ?? '—';
            return (
              <Link key={to} to={to} className={styles.platformCard}>
                <div className={styles.platformCardIcon} style={{ background: `${color}18`, border: `1.5px solid ${color}30` }}>
                  <i className={brandCls} style={{ fontSize: 22, color }} />
                </div>
                <p className={styles.platformCardName}>{label}</p>
                <p className={styles.platformCardCount}>{count} <span>entries</span></p>
                <span className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--color-outline)', marginLeft: 'auto' }}>arrow_forward_ios</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Charts Row ── */}
      <div className={styles.chartsGrid}>

        {/* Visitor Trend */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h2 className={styles.chartTitle}>Visitor Trend (7 Days)</h2>
            <span className={styles.chartBadge}>Real Data</span>
          </div>
          {chart?.visitorTrend ? (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={chart.visitorTrend} margin={{ top: 4, right: 12, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="visitorGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#3557bc" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3557bc" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.1)" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--color-outline)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--color-outline)' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="visits" name="Visitors" stroke="#3557bc" strokeWidth={2.5} fill="url(#visitorGrad)" dot={{ r: 4, fill: '#3557bc' }} activeDot={{ r: 6 }} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className={`skeleton ${styles.chartSkeleton}`} />
          )}
        </div>

        {/* Platform Distribution Pie */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h2 className={styles.chartTitle}>Platform Distribution</h2>
            <span className={styles.chartBadge}>Live</span>
          </div>
          {chart?.platformData ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={chart.platformData}
                  cx="50%" cy="50%"
                  innerRadius={55} outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                  nameKey="name"
                >
                  {chart.platformData.map((entry, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={10} formatter={(v) => <span style={{ fontSize: 12 }}>{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className={`skeleton ${styles.chartSkeleton}`} />
          )}
        </div>

        {/* Donation Bar Chart */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h2 className={styles.chartTitle}>Donations (6 Months)</h2>
            <span className={styles.chartBadge}>Rp</span>
          </div>
          {chart ? (
            chart.donationTrend?.length ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chart.donationTrend} margin={{ top: 4, right: 12, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.1)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--color-outline)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: 'var(--color-outline)' }} axisLine={false} tickLine={false} tickFormatter={v => formatNum(v)} />
                  <Tooltip content={<CustomTooltip />} formatter={(v) => [`Rp ${formatNum(v)}`, 'Donation']} />
                  <Bar dataKey="total" name="Donation" fill="#ef4444" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className={styles.emptyChart}>
                <span className="material-symbols-outlined" style={{ fontSize: 36, color: 'var(--color-outline)' }}>bar_chart</span>
                <p>Belum ada data donasi</p>
              </div>
            )
          ) : (
            <div className={`skeleton ${styles.chartSkeleton}`} />
          )}
        </div>

      </div>

      {/* ── Bottom Row: Activity + Community Counts ── */}
      <div className={styles.bottomGrid}>

        {/* Live Activity */}
        <div className={styles.activityCard}>
          <h2 className={styles.sectionTitle} style={{ marginBottom: 16 }}>Live Activity</h2>
          <ul className={styles.activityList}>
            {activity.map((item, i) => (
              <li key={i} className={styles.activityItem}>
                <span className={styles.activityIcon} style={{ background: `${item.color}15`, color: item.color }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                </span>
                <div className={styles.activityContent}>
                  <p className={styles.activityText}>{item.text}</p>
                  <p className={styles.activityTime}>{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Community Counts (real data) */}
        <div className={styles.communityCard}>
          <h2 className={styles.sectionTitle} style={{ marginBottom: 16 }}>Community Count</h2>
          <div className={styles.communityList}>
            {chart?.platformData ? (
              chart.platformData.map((p, i) => (
                <div key={p.name} className={styles.communityRow}>
                  <div className={styles.communityLeft}>
                    <i className={PLATFORM_LINKS[i]?.brandCls} style={{ fontSize: 16, color: p.color, width: 20, textAlign: 'center' }} />
                    <span className={styles.communityName}>{p.name}</span>
                  </div>
                  <div className={styles.communityBar}>
                    <div
                      className={styles.communityFill}
                      style={{
                        width: `${Math.min(100, (p.value / (Math.max(...chart.platformData.map(x => x.value)) || 1)) * 100)}%`,
                        background: p.color,
                      }}
                    />
                  </div>
                  <span className={styles.communityVal}>{p.value}</span>
                </div>
              ))
            ) : (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={`skeleton`} style={{ height: 32, borderRadius: 8, marginBottom: 8 }} />
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboardPage;
