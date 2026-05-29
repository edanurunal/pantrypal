import { getItemEmoji } from './utils/emojiMapping';

export default function ExpiredItems({ items, deleteItem }) {
  const expiredItems = items.filter(item => new Date(item.expiry) < new Date());

  if (expiredItems.length === 0) return null;

  return (
    <div className="expired-section">
      <div className="expired-header">
        ⚠️ Expired Items ({expiredItems.length})
      </div>
      {expiredItems.map(item => (
        <div key={item.id} className="item" style={{ borderColor: '#e55353' }}>
          <div>
            <div className="item-name">
              {getItemEmoji(item.name) || '📦'} {item.name}
            </div>
            <div className="item-meta" style={{ color: '#e55353' }}>
              Expired · {item.category}
            </div>
          </div>
          <button className="delete-btn" onClick={() => deleteItem(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}