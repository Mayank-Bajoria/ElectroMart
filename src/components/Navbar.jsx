import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { FiShoppingCart, FiZap, FiMenu, FiX, FiGrid, FiHome, FiUser, FiSun, FiMoon } from "react-icons/fi"

function Navbar({ cart, theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const totalItems = cart.reduce((acc, item) => {
    return acc + item.quantity
  }, 0)

  function handleToggleMenu() {
    setMenuOpen(!menuOpen)
  }

  function handleCloseMenu() {
    setMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-[100] bg-bg-secondary/85 backdrop-blur-xl border-b border-border px-6 md:px-8 h-16 grid grid-cols-[1fr_auto_1fr] items-center">
      <Link to="/" className="text-xl font-extrabold flex items-center gap-2 bg-gradient-to-r from-sky-500 via-sky-300 to-sky-400 bg-clip-text text-transparent tracking-tight">
        <FiZap className="text-sky-500" style={{ fill: "currentColor", fillOpacity: 0.2 }} />
        ElectroMart
      </Link>

      <div className="hidden md:flex items-center gap-2">
        <NavLink to="/" end className={({ isActive }) => {
          return `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${isActive ? "text-text-primary bg-surface" : "text-text-secondary hover:text-text-primary hover:bg-surface"}`
        }}>
          <FiHome size={14} /> Home
        </NavLink>
        <NavLink to="/categories" className={({ isActive }) => {
          return `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${isActive ? "text-text-primary bg-surface" : "text-text-secondary hover:text-text-primary hover:bg-surface"}`
        }}>
          <FiGrid size={14} /> Categories
        </NavLink>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button onClick={toggleTheme} className="p-2.5 rounded-xl bg-surface border border-border text-text-secondary hover:text-text-primary hover:border-text-primary/20 transition-all group">
          {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>

        <Link to="/login" className="p-2.5 rounded-xl bg-surface border border-border text-text-secondary hover:text-text-primary hover:border-text-primary/20 transition-all group">
          <FiUser size={18} className="group-hover:scale-110 transition-transform" />
        </Link>

        <Link to="/cart" className="flex items-center gap-2 px-4 py-2 bg-sky-500/10 border border-sky-500/20 text-sky-500 rounded-xl text-sm font-bold hover:bg-sky-500/20 hover:border-sky-500 transition-all">
          <FiShoppingCart size={16} />
          <span className="hidden sm:inline">Cart</span>
          <span className="bg-sky-500 text-white text-[10px] px-1.5 py-0.5 rounded-md">{totalItems}</span>
        </Link>

        <button className="md:hidden p-2 text-text-secondary" onClick={handleToggleMenu}>
          {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-bg-secondary border-b border-border p-4 flex flex-col gap-2" onClick={handleCloseMenu}>
          <NavLink to="/" end className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface">
            <FiHome size={18} /> Home
          </NavLink>
          <NavLink to="/categories" className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface">
            <FiGrid size={18} /> Categories
          </NavLink>
          <NavLink to="/login" className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface">
            <FiUser size={18} /> Login
          </NavLink>
        </div>
      )}
    </nav>
  )
}

export default Navbar