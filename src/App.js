import { useState } from "react";
import "./App.css";
import { getItemEmoji, CATEGORY_ICONS } from "./utils/emojiMapping";
import SearchBar from "./search";

function App() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Dairy");
  const [expiry, setExpiry] = useState("");
  const [quickExpiry, setQuickExpiry] = useState("");
  const [search, setSearch] = useState("");

  // Pantry Items State
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("pantryItems");
    return saved ? JSON.parse(saved) : [];
  });

  // Shopping List States
  const [shoppingList, setShoppingList] = useState(() => {
    const saved = localStorage.getItem("shoppingList");
    return saved ? JSON.parse(saved) : [];
  });
  const [shoppingItem, setShoppingItem] = useState('');

  // Expiry Warning Color Logic
  const getColor = (expiry) => {
    const today = new Date();
    const expiryDate = new Date(expiry);
    const diff = (expiryDate - today) / (1000 * 60 * 60 * 24);
    if (diff < 0) return '#e55353';
    if (diff <= 3) return '#f4a435';
    return '#40b37c';
  };

  // Expiry Text Label Generator
  const getExpiryLabel = (expiry) => {
    const today = new Date();
    const expiryDate = new Date(expiry);
    const diff = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
    if (diff < 0) return 'Expired';
    if (diff === 0) return 'Expires today!';
    if (diff === 1) return 'Expires tomorrow';
    return `Expires in ${diff} days`;
  };

  const addItem = () => {
    if (!name) return;
    let finalExpiry = expiry;

    if (!finalExpiry && quickExpiry) {
      const date = new Date();
      date.setDate(date.getDate() + parseInt(quickExpiry));
      finalExpiry = date.toISOString().split("T")[0];
    }

    if (!finalExpiry) return;

    const newItem = {
      id: Date.now(),
      name,
      category,
      expiry: finalExpiry,
    };

    const updated = [...items, newItem];
    setItems(updated);
    localStorage.setItem("pantryItems", JSON.stringify(updated));

    setName("");
    setCategory("Dairy");
    setExpiry("");
    setQuickExpiry("");
  };

  const deleteItem = (id) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    localStorage.setItem("pantryItems", JSON.stringify(updated));
  };

  // Shopping List Functions
  const addToShopping = (itemName) => {
    const nameToAdd = itemName || shoppingItem;
    if (!nameToAdd) return;
    const updated = [...shoppingList, { id: Date.now(), name: nameToAdd, checked: false }];
    setShoppingList(updated);
    localStorage.setItem("shoppingList", JSON.stringify(updated));
    setShoppingItem("");
  };

  const toggleShopping = (id) => {
    const updated = shoppingList.map(i =>
      i.id === id ? { ...i, checked: !i.checked } : i
    );
    setShoppingList(updated);
    localStorage.setItem("shoppingList", JSON.stringify(updated));
  };

  const deleteShopping = (id) => {
    const updated = shoppingList.filter(i => i.id !== id);
    setShoppingList(updated);
    localStorage.setItem("shoppingList", JSON.stringify(updated));
  };

  return (
    <div className="app">
      <div className="header">
        <div className="header-text">
          <h1>🥦 PantryPal</h1>
          <p>Track your food, reduce waste</p>
        </div>
      </div>

      <div className="form-card">
        <h2>Add Item</h2>
        <div className="form-grid">
          <input
            type="text"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Dairy</option>
            <option>Vegetables</option>
            <option>Fruits</option>
            <option>Meat</option>
            <option>Snacks</option>
            <option>Grains & Pantry</option>
          </select>
          <input
            type="date"
            value={expiry}
            onChange={(e) => {
              setExpiry(e.target.value);
              setQuickExpiry("");
            }}
          />
          <select
            value={quickExpiry}
            onChange={(e) => {
              setQuickExpiry(e.target.value);
              setExpiry("");
            }}
          >
            <option value="">Or pick duration</option>
            <option value="1">1 day</option>
            <option value="3">3 days</option>
            <option value="7">1 week</option>
            <option value="14">2 weeks</option>
            <option value="30">1 month</option>
          </select>
        </div>
        <button className="add-btn" onClick={addItem}>+ Add to Pantry</button>
      </div>

      <SearchBar search={search} setSearch={setSearch} />

      <div className="categories-grid">
        {Object.entries(
          [...items]
            .sort((a, b) => new Date(a.expiry) - new Date(b.expiry))
            .filter(i => new Date(i.expiry) >= new Date())
            .filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
            .reduce((groups, item) => {
              const currentCat = item.category || "Grains & Pantry";
              if (!groups[currentCat]) groups[currentCat] = [];
              groups[currentCat].push(item);
              return groups;
            }, {})
        ).map(([categoryName, categoryItems]) => (
          <div key={categoryName} className="category-group">
            <div className="category-header">
              {CATEGORY_ICONS[categoryName] || '📦'} {categoryName}
              <span className="category-count">{categoryItems.length}</span>
            </div>
            {categoryItems.map(item => (
              <div key={item.id} className="item" style={{ borderColor: getColor(item.expiry) }}>
                <div>
                  <div className="item-name">
                    {getItemEmoji(item.name) || '📦'} {item.name}
                  </div>
                  <div className="item-meta" style={{ color: getColor(item.expiry) }}>
                    {getExpiryLabel(item.expiry)}
                  </div>
                </div>
                <button className="delete-btn" onClick={() => deleteItem(item.id)}>Remove</button>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Shopping List Section */}
      <div className="shopping-card">
        <h2>🛒 Shopping List</h2>
        <div className="shopping-form">
          <input
            placeholder="Add item..."
            value={shoppingItem}
            onChange={e => setShoppingItem(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addToShopping()}
          />
          <button onClick={() => addToShopping()}>Add</button>
        </div>
        {shoppingList.length === 0 ? (
          <div className="empty">Your shopping list is empty 🛍️</div>
        ) : (
          shoppingList.map(item => (
            <div key={item.id} className="shopping-item">
              <span
                className={`shopping-name ${item.checked ? 'checked' : ''}`}
                onClick={() => toggleShopping(item.id)}
              >
                {item.checked ? '✅' : '⬜'} {item.name}
              </span>
              <button className="delete-btn" onClick={() => deleteShopping(item.id)}>
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;