import AdminCrudPage from '../../components/AdminCrudPage';
import { fetchTikTok, createTikTok, updateTikTok, deleteTikTok } from '../../utils/api';

const FIELDS = [
  { name: 'creator',  label: 'Creator Handle', type: 'text',    required: true, placeholder: '@creator' },
  { name: 'title',    label: 'Judul Video',    type: 'text',    required: true, placeholder: 'Judul video...' },
  { name: 'category', label: 'Kategori',       type: 'select',  required: true,
    options: ['Gaming','AI-Art','Memes','Tech','Lifestyle','Education'] },
  { name: 'thumb',    label: 'URL Thumbnail',  type: 'url',     placeholder: 'https://...' },
  { name: 'avatar',   label: 'URL Avatar',     type: 'url',     placeholder: 'https://...' },
  { name: 'views',    label: 'Views',          type: 'text',    placeholder: '1.2M' },
  { name: 'likes',    label: 'Likes',          type: 'text',    placeholder: '500K' },
  { name: 'duration', label: 'Durasi',         type: 'text',    placeholder: '0:47' },
  { name: 'link',     label: 'Link TikTok',    type: 'url',     placeholder: 'https://tiktok.com/...' },
  { name: 'trending', label: 'Trending',       type: 'checkbox' },
  { name: 'status',   label: 'Status',         type: 'select',  options: ['active','inactive'] },
];

const HEADERS = ['Creator & Judul', 'Views', 'Likes', 'Kategori', 'Status'];

const renderRow = (item, onEdit, onDelete) => (
  <tr key={item.id}>
    <td>
      <div className="admin-cell">
        {item.thumb && <img src={item.thumb} alt={item.title} className="admin-cell-thumb" />}
        <div>
          <p className="admin-cell-title" title={item.title}>{item.title}</p>
          <p className="admin-cell-sub">{item.creator}</p>
        </div>
      </div>
    </td>
    <td><span className="admin-cell-value">{item.views}</span></td>
    <td>{item.likes}</td>
    <td>{item.category}</td>
    <td>
      <span className={`status-badge ${item.status === 'active' ? 'status-active' : 'status-inactive'}`}>{item.status}</span>
    </td>
    <td>
      <div className="crud-actions">
        <button className="crud-edit-btn" onClick={onEdit}><span className="material-symbols-outlined">edit</span></button>
        <button className="crud-del-btn" onClick={onDelete}><span className="material-symbols-outlined">delete</span></button>
      </div>
    </td>
  </tr>
);

const AdminTikTokPage = () => (
  <AdminCrudPage
    title="TikTok"
    icon="play_circle"
    accentColor="#010101"
    fields={FIELDS}
    tableHeaders={HEADERS}
    fetchFn={fetchTikTok}
    createFn={createTikTok}
    updateFn={updateTikTok}
    deleteFn={deleteTikTok}
    renderRow={renderRow}
  />
);

export default AdminTikTokPage;
