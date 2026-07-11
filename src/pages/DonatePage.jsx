import { useState, useEffect } from 'react';
import { fetchDonations, fetchTopDonors, submitDonation } from '../utils/api';
import Button from '../components/ui/Button';
import SEO from '../components/SEO';
import styles from './DonatePage.module.css';

const NOMINALS = [10000, 25000, 50000, 100000, 250000, 500000];

const fmt = (n) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);
const fmtDate = (d) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

const DonatePage = () => {
  const [form, setForm] = useState({ name: '', is_anonymous: false, amount: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [donations, setDonations] = useState([]);
  const [topDonors, setTopDonors] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [showQrModal, setShowQrModal] = useState(false);

  useEffect(() => {
    Promise.all([fetchDonations(), fetchTopDonors()])
      .then(([d, t]) => { setDonations(d); setTopDonors(t); })
      .catch(() => {})
      .finally(() => setLoadingData(false));
  }, [success]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
    setError('');
  };

  const handleNominal = (n) => setForm((p) => ({ ...p, amount: String(n) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.amount || Number(form.amount) < 1000) {
      setError('Nominal minimal Rp 1.000');
      return;
    }
    if (!form.is_anonymous && !form.name.trim()) {
      setError('Nama wajib diisi, atau centang donasi sebagai Anonymous');
      return;
    }
    setSubmitting(true);
    try {
      await submitDonation({
        name: form.is_anonymous ? 'Anonymous' : form.name,
        is_anonymous: form.is_anonymous,
        amount: Number(form.amount),
        message: form.message || null,
      });
      setSuccess(true);
      setForm({ name: '', is_anonymous: false, amount: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch {
      setError('Gagal mengirim donasi. Coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  const downloadQr = () => {
    const a = document.createElement('a');
    a.href = '/qris.png';
    a.download = 'QRIS_NesaVerse.png';
    a.click();
  };

  return (
    <div className={styles.page}>
      <SEO 
        title="Dukung NesaVerse — Donasi QRIS" 
        description="Dukung pengembangan dan pemeliharaan platform NesaVerse dengan berdonasi lewat QRIS. Bantu kami menyediakan platform terbaik bagi komunitas."
        keywords="donasi qr, qris nesaverse, dukung nesaverse, donasi e-wallet"
      />
      <div className={styles.meshBg} aria-hidden="true" />

      {/* Hero */}
      <section className={`container ${styles.hero}`}>
        <div className={styles.heroBadge}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '16px' }}>favorite</span>
          Support NesaVerse
        </div>
        <h1 className={styles.heroTitle}>
          Dukung Pertumbuhan{' '}
          <span className="gradient-text">NesaVerse</span>
        </h1>
        <p className={styles.heroDesc}>
          Setiap donasi membantu kami terus berkembang, membangun fitur baru, dan menjaga komunitas terbaik tetap gratis untuk semua.
        </p>
      </section>

      <div className={`container ${styles.mainGrid}`}>
        {/* QRIS Section */}
        <div className={styles.qrisSection}>
          <div className={`${styles.qrisCard} glass-panel`}>
            <h2 className={styles.qrisTitle}>QRIS Donasi</h2>
            <p className={styles.qrisDesc}>Scan menggunakan aplikasi e-wallet atau mobile banking apapun</p>
            <div className={styles.qrisImgWrap}>
              <img src="/qris.png" alt="QRIS NesaVerse" className={styles.qrisImg} />
            </div>
            <div className={styles.qrisBtns}>
              <Button variant="primary" size="md" onClick={downloadQr}>
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>download</span>
                Download QR
              </Button>
              <Button variant="secondary" size="md" onClick={() => setShowQrModal(true)}>
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>zoom_in</span>
                Perbesar QR
              </Button>
            </div>
          </div>

          {/* Top Donators */}
          <div className={`${styles.topCard} glass-panel`}>
            <h2 className={styles.topTitle}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '20px', color: '#f59e0b' }}>military_tech</span>
              Top Donatur
            </h2>
            {loadingData ? (
              <div className={`skeleton ${styles.skeletonTop}`} />
            ) : topDonors.length === 0 ? (
              <p className={styles.emptyText}>Belum ada donatur</p>
            ) : (
              <ol className={styles.topList}>
                {topDonors.map((d, i) => (
                  <li key={i} className={styles.topItem}>
                    <span className={styles.topRank} data-rank={i + 1}>{i + 1}</span>
                    <span className={styles.topName}>{d.name}</span>
                    <span className={styles.topAmount}>{fmt(Number(d.total))}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>

        {/* Donation Form */}
        <div className={styles.formSection}>
          <div className={`${styles.formCard} glass-panel`}>
            <h2 className={styles.formTitle}>Form Donasi</h2>

            {success && (
              <div className={styles.successBanner}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                Terima kasih! Donasi berhasil dikirim 🎉
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              {/* Nama */}
              <div className={styles.fieldGroup}>
                <label htmlFor="donate-name" className={styles.label}>Nama</label>
                <input
                  id="donate-name"
                  name="name"
                  type="text"
                  placeholder="Nama lengkap"
                  value={form.is_anonymous ? 'Anonymous' : form.name}
                  onChange={handleChange}
                  disabled={form.is_anonymous}
                  className={`${styles.input} ${form.is_anonymous ? styles.inputDisabled : ''}`}
                />
              </div>

              {/* Anonymous checkbox */}
              <label className={styles.checkRow}>
                <input
                  type="checkbox"
                  name="is_anonymous"
                  checked={form.is_anonymous}
                  onChange={handleChange}
                  className={styles.checkbox}
                  id="donate-anon"
                />
                <span className={styles.checkLabel}>Donasi sebagai Anonymous</span>
              </label>

              {/* Nominal quick-pick */}
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Nominal</label>
                <div className={styles.nominalGrid}>
                  {NOMINALS.map((n) => (
                    <button
                      key={n}
                      type="button"
                      className={`${styles.nominalBtn} ${Number(form.amount) === n ? styles.nominalActive : ''}`}
                      onClick={() => handleNominal(n)}
                    >
                      {fmt(n)}
                    </button>
                  ))}
                </div>
                <input
                  name="amount"
                  type="number"
                  min="1000"
                  placeholder="Atau masukkan nominal lain (min. Rp 1.000)"
                  value={form.amount}
                  onChange={handleChange}
                  className={styles.input}
                  style={{ marginTop: '10px' }}
                />
              </div>

              {/* Pesan */}
              <div className={styles.fieldGroup}>
                <label htmlFor="donate-msg" className={styles.label}>Pesan <span className={styles.optional}>(opsional)</span></label>
                <textarea
                  id="donate-msg"
                  name="message"
                  rows={3}
                  placeholder="Tulis pesan semangatmu..."
                  value={form.message}
                  onChange={handleChange}
                  className={styles.textarea}
                />
              </div>

              {error && (
                <div className={styles.errorBanner} role="alert">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '16px' }}>error</span>
                  {error}
                </div>
              )}

              <Button type="submit" variant="primary" size="lg" className={styles.submitBtn} disabled={submitting}>
                {submitting ? (
                  <><span className={styles.spinner} />Memproses...</>
                ) : (
                  <><span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>favorite</span>Kirim Donasi</>
                )}
              </Button>
            </form>
          </div>

          {/* Riwayat Donasi */}
          <div className={`${styles.historyCard} glass-panel`}>
            <h2 className={styles.historyTitle}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>history</span>
              Riwayat Donasi
            </h2>
            {loadingData ? (
              <div className={`skeleton ${styles.skeletonHistory}`} />
            ) : donations.length === 0 ? (
              <p className={styles.emptyText}>Belum ada riwayat donasi</p>
            ) : (
              <div className={styles.historyList}>
                {donations.slice(0, 10).map((d) => (
                  <div key={d.id} className={styles.historyItem}>
                    <div className={styles.historyAvatar}>
                      {d.name.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.historyInfo}>
                      <p className={styles.historyName}>{d.name}</p>
                      {d.message && <p className={styles.historyMsg}>"{d.message}"</p>}
                    </div>
                    <div className={styles.historyRight}>
                      <span className={styles.historyAmount}>{fmt(Number(d.amount))}</span>
                      <span className={styles.historyDate}>{fmtDate(d.created_at)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* QR Modal */}
      {showQrModal && (
        <div className={styles.modalOverlay} onClick={() => setShowQrModal(false)} role="dialog" aria-modal="true" aria-label="QRIS diperbesar">
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setShowQrModal(false)} aria-label="Tutup">
              <span className="material-symbols-outlined">close</span>
            </button>
            <img src="/qris.png" alt="QRIS NesaVerse" className={styles.modalQr} />
            <p className={styles.modalCaption}>Scan QRIS untuk berdonasi ke NesaVerse</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonatePage;
