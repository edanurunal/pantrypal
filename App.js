import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [expiry, setExpiry] = useState("");
  const [quickExpiry, setQuickExpiry] = useState("");

  // LocalStorage
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("pantryItems");
    return saved ? JSON.parse(saved) : [];
  });

  const addItem = () => {
    if (!name) return;

    let finalExpiry = expiry;

    // Quick duration seçilərsə
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

    // LocalStorage save
    localStorage.setItem("pantryItems", JSON.stringify(updated));

    setName("");
    setCategory("");
    setExpiry("");
    setQuickExpiry("");
  };

  const deleteItem = (id) => {
    const updated = items.filter((item) => item.id !== id);

    setItems(updated);

    localStorage.setItem("pantryItems", JSON.stringify(updated));
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Pantry App</h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

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

        <button onClick={addItem}>Add</button>
      </div>

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <strong>{item.name}</strong> — {item.category} — {item.expiry}
          <button
            onClick={() => deleteItem(item.id)}
            style={{ marginLeft: "10px", color: "red" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
