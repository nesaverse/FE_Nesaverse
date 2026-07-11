import AdminCrudPage from '../../components/AdminCrudPage';
import { fetchYouTube, createYouTube, updateYouTube, deleteYouTube } from '../../utils/api';

const FIELDS = [
  { name: 'name',        label: 'Nama Channel',  type: 'text',     required: true, placeholder: 'Nama channel' },
  { name: 'thumbnail',   label: 'URL Thumbnail', type: 'url',      placeholder: 'https://...' },
  { name: 'subscribers', label: 'Subscribers',   type: 'text',     placeholder: '1.2M' },
  { name: 'description', label: 'Deskripsi',     type: 'textarea', placeholder: 'Deskripsi channel...' },
  { name: 'link',        label: 'Link YouTube',  type: 'url',      required: true, placeholder: 'https://youtube.com/...' },
  { name: 'category',    label: 'Kategori',      type: 'select',   required: true,
    options: ['Gaming','AI-Art','Tech','Lifestyle','Education','Other'] },
  { name: 'status',      label: 'Status',        type: 'select',   options: ['active','inactive'] },
];

const HEADERS = ['Channel', 'Subscribers', 'Kategori', 'Status'];

const renderRow = (item, onEdit, onDelete) => (
  <tr key={item.id}>
    <td>
      <div className="admin-cell">
        {item.thumbnail && <img src={item.thumbnail} alt={item.name} className="admin-cell-img" />}
        <div>
          <p className="admin-cell-name">{item.name}</p>
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="admin-action-link">Lihat Channel</a>
        </div>
      </div>
    </td>
    <td><span className="admin-cell-value" style={{ color: '#FF0000' }}>{item.subscribers}</span></td>
    <td>{item.category}</td>
    <td><span className={`status-badge ${item.status === 'active' ? 'status-active' : 'status-inactive'}`}>{item.status}</span></td>
    <td>
      <div className="crud-actions">
        <button className="crud-edit-btn" onClick={onEdit}><span className="material-symbols-outlined">edit</span></button>
        <button className="crud-del-btn" onClick={onDelete}><span className="material-symbols-outlined">delete</span></button>
      </div>
    </td>
  </tr>
);

const AdminYouTubePage = () => (
  <AdminCrudPage
    title="YouTube"
    icon="smart_display"
    accentColor="#FF0000"
    fields={FIELDS}
    tableHeaders={HEADERS}
    fetchFn={fetchYouTube}
    createFn={createYouTube}
    updateFn={updateYouTube}
    deleteFn={deleteYouTube}
    renderRow={renderRow}
  />
);

export default AdminYouTubePage;
