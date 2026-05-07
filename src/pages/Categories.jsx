import { Link } from "react-router-dom"
import { categoryMeta, categories } from "../services/productService"
import { FiArrowRight, FiArrowLeft } from "react-icons/fi"

function Categories() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-12">
        <Link to="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-6 font-medium group">
          <FiArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>
        <h1 className="text-4xl font-black text-text-primary tracking-tight">Browse Categories</h1>
        <p className="text-text-secondary mt-2 font-medium">Choose a sector to find premium electronics.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {categories.map((cat) => {
          const meta = categoryMeta[cat]
          return (
            <Link to={`/category/${cat}`} key={cat} className="group bg-bg-card rounded-3xl p-8 border border-border hover:border-sky-500/50 transition-all duration-300 relative overflow-hidden flex items-center justify-between">
              <div className="flex items-center gap-6 relative z-10">
                <div className="text-4xl bg-surface w-16 h-16 rounded-2xl flex items-center justify-center border border-border group-hover:scale-110 transition-transform duration-500">
                  {meta.icon}
                </div>
                <h2 className="text-xl font-black text-text-primary group-hover:text-sky-400 transition-colors">{meta.label}</h2>
              </div>
              <FiArrowRight size={20} className="text-text-muted group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Categories