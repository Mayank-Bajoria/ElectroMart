import { Link } from "react-router-dom"
import { FiHome, FiGrid, FiZap } from "react-icons/fi"

function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="relative mb-12">
        <div className="text-[12rem] md:text-[18rem] font-black text-sky-500/10 leading-none select-none tracking-tighter">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <FiZap size={100} className="text-sky-500 animate-pulse drop--[0_0_30px_rgba(14,165,233,0.5)]" />
        </div>
      </div>
      
      <div className="max-w-xl mx-auto space-y-6 relative z-10">
        <h2 className="text-3xl font-extrabold text-text-primary mb-4 tracking-tight">System Malfunction: Page Not Found</h2>
        <p className="text-text-secondary text-lg font-medium leading-relaxed mb-10">
          The coordinates you entered seem to be incorrect. The page you are looking for has either been moved or deleted from our servers.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-sky-500 hover:bg-sky-400 text-white px-8 py-4 rounded-2xl font-black transition-all  active:scale-95"

          >
            <FiHome size={20} />
            Go Home
          </Link>
          <Link
            to="/categories"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-surface hover:bg-bg-card-hover text-text-primary border border-border px-8 py-4 rounded-2xl font-black transition-all active:scale-95"
          >
            <FiGrid size={20} />
            Browse Categories
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound