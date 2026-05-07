import { FiSearch } from "react-icons/fi"

function Search({ setSearch }) {
  function handleInput(e) {
    setSearch(e.target.value)
  }

  return (
    <div className="relative max-w-xl mx-auto group">
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-sky-500 transition-colors" size={20} />
      <input
        type="text"
        placeholder="Search for premium gadgets..."
        className="w-full bg-bg-card border border-border rounded-2xl py-4 pl-12 pr-4 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all "
        onChange={handleInput}
      />
    </div>
  )
}

export default Search