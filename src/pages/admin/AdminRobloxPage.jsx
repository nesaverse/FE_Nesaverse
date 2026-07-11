import AdminCrudPage from '../../components/AdminCrudPage';
import { fetchRoblox, createRoblox, updateRoblox, deleteRoblox } from '../../utils/api';

const FIELDS = [
  { name: 'name',           label: 'Nama Game',       type: 'text',     required: true, placeholder: 'Nama game Roblox' },
  { name: 'thumbnail',      label: 'URL Thumbnail',   type: 'url',      placeholder: 'https://...' },
  { name: 'description',    label: 'Deskripsi',       type: 'textarea', placeholder: 'Deskripsi game...' },
  { name: 'link_game',      label: 'Link Game',       type: 'url',      required: true, placeholder: 'https://roblox.com/games/...' },
  { name: 'link_community', label: 'Link Community',  type: 'url',      placeholder: 'https://discord.gg/... (opsional)' },
  { name: 'status',         label: 'Status',          type: 'select',   options: ['active','inactive'] },
];

const HEADERS = ['Game', 'Link Community', 'Status'];

const renderRow = (item, onEdit, onDelete) => (
  <tr key={item.id}>
    <td>
      <div className="admin-cell">
        {item.thumbnail && <img src={item.thumbnail} alt={item.name} className="admin-cell-thumb" />}
        <div>
          <p className="admin-cell-name">{item.name}</p>
          <a href={item.link_game} target="_blank" rel="noopener noreferrer" className="admin-action-link" style={{ color: '#00A2FF' }}>Mainkan</a>
        </div>
      </div>
    </td>
    <td>{item.link_community
      ? <a href={item.link_community} target="_blank" rel="noopener noreferrer" className="admin-action-link">Community</a>
      : <span style={{ color: 'var(--color-outline)', fontSize: 12 }}>—</span>
    }</td>
    <td><span className={`status-badge ${item.status === 'active' ? 'status-active' : 'status-inactive'}`}>{item.status}</span></td>
    <td>
      <div className="crud-actions">
        <button className="crud-edit-btn" onClick={onEdit}><span className="material-symbols-outlined">edit</span></button>
        <button className="crud-del-btn" onClick={onDelete}><span className="material-symbols-outlined">delete</span></button>
      </div>
    </td>
  </tr>
);

const AdminRobloxPage = () => (
  <AdminCrudPage
    title="Roblox"
    icon="sports_esports"
    accentColor="#00A2FF"
    fields={FIELDS}
    tableHeaders={HEADERS}
    fetchFn={fetchRoblox}
    createFn={createRoblox}
    updateFn={updateRoblox}
    deleteFn={deleteRoblox}
    renderRow={renderRow}
  />
);

export default AdminRobloxPage;
