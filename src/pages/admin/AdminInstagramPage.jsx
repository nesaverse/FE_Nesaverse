import AdminCrudPage from '../../components/AdminCrudPage';
import { fetchInstagram, createInstagram, updateInstagram, deleteInstagram } from '../../utils/api';

const FIELDS = [
  { name: 'name',     label: 'Nama',      type: 'text',     required: true,  placeholder: 'Nama akun' },
  { name: 'handle',   label: 'Handle',    type: 'text',     required: true,  placeholder: '@handle' },
  { name: 'avatar',   label: 'URL Avatar', type: 'url',     placeholder: 'https://...' },
  { name: 'followers',label: 'Followers', type: 'text',     placeholder: '1.2M' },
  { name: 'posts',    label: 'Posts',     type: 'number',   placeholder: '0' },
  { name: 'category', label: 'Kategori',  type: 'select',   required: true,
    options: ['Gaming','AI-Art','Design','Tech','Lifestyle','Education','Other'] },
  { name: 'bio',      label: 'Bio',       type: 'textarea', placeholder: 'Deskripsi singkat...' },
  { name: 'link',     label: 'Link Instagram', type: 'url', placeholder: 'https://instagram.com/...' },
  { name: 'verified', label: 'Terverifikasi',  type: 'checkbox' },
  { name: 'status',   label: 'Status',    type: 'select',   options: ['active','inactive'] },
];

const HEADERS = ['Akun', 'Followers', 'Kategori', 'Verified', 'Status'];

const renderRow = (item, onEdit, onDelete) => (
  <tr key={item.id}>
    <td>
      <div className="admin-cell">
        {item.avatar && <img src={item.avatar} alt={item.name} className="admin-cell-img admin-cell-img-round" />}
        <div>
          <p className="admin-cell-name">{item.name}</p>
          <p className="admin-cell-sub">{item.handle}</p>
        </div>
      </div>
    </td>
    <td><span className="admin-cell-value">{item.followers}</span></td>
    <td>{item.category}</td>
    <td>
      <span className={`status-badge ${item.verified ? 'status-active' : 'status-inactive'}`}>
        {item.verified ? 'Yes' : 'No'}
      </span>
    </td>
    <td>
      <span className={`status-badge ${item.status === 'active' ? 'status-active' : 'status-inactive'}`}>
        {item.status}
      </span>
    </td>
    <td>
      <div className="crud-actions">
        <button className="crud-edit-btn" onClick={onEdit} aria-label="Edit">
          <span className="material-symbols-outlined">edit</span>
        </button>
        <button className="crud-del-btn" onClick={onDelete} aria-label="Hapus">
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
    </td>
  </tr>
);

const AdminInstagramPage = () => (
  <AdminCrudPage
    title="Instagram"
    icon="photo_camera"
    accentColor="#E1306C"
    fields={FIELDS}
    tableHeaders={HEADERS}
    fetchFn={fetchInstagram}
    createFn={createInstagram}
    updateFn={updateInstagram}
    deleteFn={deleteInstagram}
    renderRow={renderRow}
  />
);

export default AdminInstagramPage;
