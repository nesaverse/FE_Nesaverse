import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../utils/api';
import styles from './AdminLoginPage.module.css';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  const [form, setForm] = useState({ username: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError('Username dan password wajib diisi.');
      triggerShake();
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/login', {
        username: form.username,
        password: form.password,
      });
      localStorage.setItem('token', res.data.token);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Username atau password salah.');
      triggerShake();
    }
    setLoading(false);
  };

  return (
    <div className={styles.page}>
      {/* Background orbs */}
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />
      <div className={styles.orb3} aria-hidden="true" />

      <main className={styles.wrapper}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.brandIcon}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '28px' }}>
              shield
            </span>
          </div>
          <span className={styles.brandName}>NesaVerse</span>
        </div>

        {/* Card */}
        <div className={`${styles.card} ${shake ? styles.shake : ''}`}>
          <div className={styles.cardHeader}>
            <h1 className={styles.title}>Admin Portal</h1>
            <p className={styles.subtitle}>Masukkan kredensial untuk mengakses dashboard</p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            {/* Username */}
            <div className={styles.fieldGroup}>
              <label htmlFor="admin-username" className={styles.label}>
                Username
              </label>
              <div className={styles.inputWrap}>
                <span className={`material-symbols-outlined ${styles.inputIcon}`}>person</span>
                <input
                  id="admin-username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Masukkan username"
                  value={form.username}
                  onChange={handleChange}
                  className={`${styles.input} ${error ? styles.inputError : ''}`}
                  aria-describedby={error ? 'login-error' : undefined}
                />
              </div>
            </div>

            {/* Password */}
            <div className={styles.fieldGroup}>
              <label htmlFor="admin-password" className={styles.label}>
                Password
              </label>
              <div className={styles.inputWrap}>
                <span className={`material-symbols-outlined ${styles.inputIcon}`}>lock</span>
                <input
                  id="admin-password"
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Masukkan password"
                  value={form.password}
                  onChange={handleChange}
                  className={`${styles.input} ${error ? styles.inputError : ''}`}
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPass((p) => !p)}
                  aria-label={showPass ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                    {showPass ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div id="login-error" className={styles.errorBanner} role="alert">
                <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>
                  error
                </span>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <>
                  <span className={styles.spinner} aria-hidden="true" />
                  Memverifikasi...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>login</span>
                  Masuk ke Dashboard
                </>
              )}
            </button>
          </form>

          <p className={styles.secureNote}>
            <span className="material-symbols-outlined" style={{ fontSize: '13px', fontVariationSettings: "'FILL' 1" }}>
              lock
            </span>
            Akses terbatas — hanya untuk administrator
          </p>
        </div>

        <a href="/" className={styles.backLink}>
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_back</span>
          Kembali ke NesaVerse
        </a>
      </main>
    </div>
  );
};

export default AdminLoginPage;
