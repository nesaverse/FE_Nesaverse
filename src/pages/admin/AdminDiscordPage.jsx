import AdminCrudPage from '../../components/AdminCrudPage';
import { fetchServers, createServer, updateServer, deleteServer } from '../../utils/api';

const FIELDS = [
  { name: 'name',        label: 'Nama Server',   type: 'text',     required: true, placeholder: 'Nama server Discord' },
  { name: 'description', label: 'Deskripsi',     type: 'textarea', placeholder: 'Deskripsi server...' },
  { name: 'icon',        label: 'URL Icon',      type: 'url',      placeholder: 'https://...' },
  { name: 'banner',      label: 'URL Banner',    type: 'url',      placeholder: 'https://...' },
  { name: 'members',     label: 'Members',       type: 'number',   placeholder: '0' },
  { name: 'online',      label: 'Online',        type: 'number',   placeholder: '0' },
  { name: 'link',        label: 'Invite Link',   type: 'url',      placeholder: 'https://discord.gg/...' },
  { name: 'verified',    label: 'Terverifikasi', type: 'checkbox' },
  { name: 'featured',    label: 'Featured',      type: 'checkbox' },
  { name: 'status',      label: 'Status',        type: 'select',   options: ['active','inactive'] },
];

const HEADERS = ['Server', 'Members', 'Online', 'Verified', 'Status'];

const formatNum = (n) => {
  if (!n) return '0';
  if (n >= 1_000_000) return `${(n/1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n/1_000).toFixed(0)}K`;
  return String(n);
};

const renderRow = (item, onEdit, onDelete) => (
  <tr key={item.id}>
    <td>
      <div className="admin-cell">
        {item.icon && <img src={item.icon} alt={item.name} className="admin-cell-img" />}
        <div>
          <p className="admin-cell-name">{item.name}</p>
          {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="admin-action-link" style={{ color: '#5865F2' }}>Join</a>}
        </div>
      </div>
    </td>
    <td><span className="admin-cell-value">{formatNum(item.members)}</span></td>
    <td>{formatNum(item.online)}</td>
    <td><span className={`status-badge ${item.verified ? 'status-active' : 'status-inactive'}`}>{item.verified ? 'Yes' : 'No'}</span></td>
    <td><span className={`status-badge ${item.status === 'active' ? 'status-active' : 'status-inactive'}`}>{item.status || 'active'}</span></td>
    <td>
      <div className="crud-actions">
        <button className="crud-edit-btn" onClick={onEdit}><span className="material-symbols-outlined">edit</span></button>
        <button className="crud-del-btn" onClick={onDelete}><span className="material-symbols-outlined">delete</span></button>
      </div>
    </td>
  </tr>
);

const AdminDiscordPage = () => (
  <AdminCrudPage
    title="Discord"
    icon="hub"
    accentColor="#5865F2"
    fields={FIELDS}
    tableHeaders={HEADERS}
    fetchFn={fetchServers}
    createFn={createServer}
    updateFn={updateServer}
    deleteFn={deleteServer}
    renderRow={renderRow}
  />
);

export default AdminDiscordPage;
