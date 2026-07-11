/**
 * AdminCrudPage — reusable generic CRUD page for all platforms
 * Props:
 *   title, icon, accentColor
 *   fields: [{ name, label, type, required, placeholder, options? }]
 *   fetchFn, createFn, updateFn, deleteFn  (from api.js)
 *   renderRow: (item) => <tr>...</tr>
 *   tableHeaders: string[]
 */
import { useState, useEffect, useCallback } from 'react';
import styles from './AdminCrudPage.module.css';

const EMPTY_FORM = (fields) =>
  fields.reduce((acc, f) => ({ ...acc, [f.name]: f.type === 'checkbox' ? false : '' }), {});

const AdminCrudPage = ({
  title,
  icon,
  accentColor = 'var(--color-primary)',
  fields = [],
  tableHeaders = [],
  fetchFn,
  createFn,
  updateFn,
  deleteFn,
  renderRow,
}) => {
  const [items, setItems]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [modal, setModal]       = useState(null); // null | 'create' | 'edit'
  const [editing, setEditing]   = useState(null);
  const [form, setForm]         = useState(EMPTY_FORM(fields));
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState('');
  const [deleteId, setDeleteId] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    fetchFn({ search })
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [fetchFn, search]);

  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
  }, [load]);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM(fields));
    setError('');
    setModal('create');
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm(fields.reduce((acc, f) => ({ ...acc, [f.name]: item[f.name] ?? (f.type === 'checkbox' ? false : '') }), {}));
    setError('');
    setModal('edit');
  };

  const closeModal = () => { setModal(null); setEditing(null); setError(''); };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (modal === 'create') {
        await createFn(form);
      } else {
        await updateFn(editing.id, form);
      }
      closeModal();
      load();
    } catch (err) {
      setError(err?.response?.data?.error || 'Terjadi kesalahan, coba lagi.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteFn(deleteId);
      setDeleteId(null);
      load();
    } catch {
      setDeleteId(null);
    }
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className="material-symbols-outlined" style={{ color: accentColor, fontSize: '28px', fontVariationSettings: "'FILL' 1" }}>
            {icon}
          </span>
          <h1 className={styles.title}>{title}</h1>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.searchWrap}>
            <span className="material-symbols-outlined" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-outline)', fontSize: 18 }}>search</span>
            <input
              type="search"
              placeholder="Cari..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <button className={styles.addBtn} style={{ background: accentColor }} onClick={openCreate}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
            Tambah
          </button>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {tableHeaders.map((h) => <th key={h}>{h}</th>)}
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {tableHeaders.map((_, j) => (
                      <td key={j}><div className="skeleton" style={{ height: 14, borderRadius: 4 }} /></td>
                    ))}
                    <td />
                  </tr>
                ))
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={tableHeaders.length + 1} className={styles.emptyCell}>
                    <span className="material-symbols-outlined" style={{ fontSize: 36, color: 'var(--color-outline)' }}>search_off</span>
                    <p>Data tidak ditemukan</p>
                  </td>
                </tr>
              ) : (
                items.map((item) =>
                  renderRow(item, () => openEdit(item), () => setDeleteId(item.id))
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Create/Edit */}
      {modal && (
        <div className={styles.overlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{modal === 'create' ? 'Tambah' : 'Edit'} {title}</h2>
              <button className={styles.closeBtn} onClick={closeModal} aria-label="Tutup">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              {fields.map((f) => (
                <div key={f.name} className={styles.fieldGroup}>
                  <label htmlFor={`crud-${f.name}`} className={styles.label}>
                    {f.label}
                    {f.required && <span style={{ color: 'var(--color-error)' }}> *</span>}
                  </label>
                  {f.type === 'checkbox' ? (
                    <label className={styles.checkRow}>
                      <input
                        id={`crud-${f.name}`}
                        type="checkbox"
                        name={f.name}
                        checked={!!form[f.name]}
                        onChange={handleChange}
                        className={styles.checkbox}
                      />
                      <span className={styles.checkLabel}>{f.placeholder || f.label}</span>
                    </label>
                  ) : f.type === 'select' ? (
                    <select
                      id={`crud-${f.name}`}
                      name={f.name}
                      value={form[f.name]}
                      onChange={handleChange}
                      required={f.required}
                      className={styles.input}
                    >
                      <option value="">Pilih {f.label}...</option>
                      {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : f.type === 'textarea' ? (
                    <textarea
                      id={`crud-${f.name}`}
                      name={f.name}
                      value={form[f.name]}
                      onChange={handleChange}
                      placeholder={f.placeholder}
                      required={f.required}
                      rows={3}
                      className={styles.textarea}
                    />
                  ) : (
                    <input
                      id={`crud-${f.name}`}
                      type={f.type || 'text'}
                      name={f.name}
                      value={form[f.name]}
                      onChange={handleChange}
                      placeholder={f.placeholder}
                      required={f.required}
                      className={styles.input}
                    />
                  )}
                </div>
              ))}
              {error && (
                <div className={styles.errorBox} role="alert">
                  <span className="material-symbols-outlined" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>error</span>
                  {error}
                </div>
              )}
              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={closeModal}>Batal</button>
                <button type="submit" className={styles.saveBtn} style={{ background: accentColor }} disabled={saving}>
                  {saving ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className={styles.overlay} onClick={() => setDeleteId(null)}>
          <div className={styles.confirmModal} onClick={(e) => e.stopPropagation()}>
            <span className="material-symbols-outlined" style={{ fontSize: 40, color: 'var(--color-error)', fontVariationSettings: "'FILL' 1" }}>delete_forever</span>
            <h3 className={styles.confirmTitle}>Hapus Data?</h3>
            <p className={styles.confirmDesc}>Aksi ini tidak dapat dibatalkan.</p>
            <div className={styles.confirmActions}>
              <button className={styles.cancelBtn} onClick={() => setDeleteId(null)}>Batal</button>
              <button className={styles.deleteConfirmBtn} onClick={handleDelete}>Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCrudPage;
