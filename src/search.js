import { useState } from 'react';

export default function SearchBar({ search, setSearch }) {
  return (
    <input
      className="search-input"
      placeholder="🔍 Search items..."
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
  );
}

export function useSearch(items) {
  const [search, setSearch] = useState('');
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  return { search, setSearch, filteredItems };
}