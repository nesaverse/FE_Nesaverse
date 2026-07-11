import AdminCrudPage from '../../components/AdminCrudPage';
import { fetchChannels, createChannel, updateChannel, deleteChannel } from '../../utils/api';
import { formatNum } from '../../utils/format';

const FIELDS = [
  { name: 'name',        label: 'Nama Channel',  type: 'text',     required: true, placeholder: 'Nama channel WhatsApp' },
  { name: 'description', label: 'Deskripsi',     type: 'textarea', placeholder: 'Deskripsi channel...' },
  { name: 'avatar',      label: 'URL Avatar',    type: 'url',      placeholder: 'https://...' },
  { name: 'category',    label: 'Kategori',      type: 'select',   required: true,
    options: ['Gaming','DankMemes','Entertainment','AI-Art','Tech','Elite','Other'] },
  { name: 'followers',   label: 'Followers',     type: 'number',   placeholder: '0' },
  { name: 'link',        label: 'Link Channel',  type: 'url',      placeholder: 'https://whatsapp.com/channel/...' },
  { name: 'status',      label: 'Status',        type: 'select',   options: ['active','inactive'] },
];

const HEADERS = ['Channel', 'Followers', 'Kategori', 'Status'];

const renderRow = (item, onEdit, onDelete) => (
  <tr key={item.id}>
    <td>
      <div className="admin-cell">
        {item.avatar && <img src={item.avatar} alt={item.name} className="admin-cell-img admin-cell-img-round" />}
        <div>
          <p className="admin-cell-name">{item.name}</p>
          {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="admin-action-link" style={{ color: '#25D366' }}>Join</a>}
        </div>
      </div>
    </td>
    <td><span className="admin-cell-value">{formatNum(item.followers)}</span></td>
    <td>{item.category}</td>
    <td><span className={`status-badge ${item.status === 'active' ? 'status-active' : 'status-inactive'}`}>{item.status || 'active'}</span></td>
    <td>
      <div className="crud-actions">
        <button className="crud-edit-btn" onClick={onEdit}><span className="material-symbols-outlined">edit</span></button>
        <button className="crud-del-btn" onClick={onDelete}><span className="material-symbols-outlined">delete</span></button>
      </div>
    </td>
  </tr>
);

const AdminWhatsAppPage = () => (
  <AdminCrudPage
    title="WhatsApp"
    icon="chat"
    accentColor="#25D366"
    fields={FIELDS}
    tableHeaders={HEADERS}
    fetchFn={fetchChannels}
    createFn={createChannel}
    updateFn={updateChannel}
    deleteFn={deleteChannel}
    renderRow={renderRow}
  />
);

export default AdminWhatsAppPage;
