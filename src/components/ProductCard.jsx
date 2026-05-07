import { useState } from "react"
import { Link } from "react-router-dom"
import { FiShoppingCart, FiStar, FiCheck } from "react-icons/fi"

function ProductCard({ product, addToCart }) {
  const [added, setAdded] = useState(false)

  function handleAddToCart() {
    addToCart(product)
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
    }, 800)
  }

  return (
    <div className="group bg-bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-sky-500/50 hover:-translate-y-1 flex flex-col">
      <div className="relative h-56 bg-surface flex items-center justify-center p-6 overflow-hidden">
        <img src={product.thumbnail} alt={product.title} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500" loading="lazy" />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <span className="text-[10px] font-bold uppercase tracking-widest text-sky-500 mb-1">{product.category}</span>
        <h2 className="text-sm font-bold text-text-primary line-clamp-2 mb-2 min-h-[40px] leading-snug">{product.title}</h2>
        
        {product.rating && (
          <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-text-secondary">
            <div className="flex items-center gap-1 text-amber-400">
              <FiStar fill="currentColor" size={10} />
              {product.rating.toFixed(1)}
            </div>
            <span>·</span>
            <div className="flex items-center gap-1 text-emerald-500">
              <div className="w-1 h-1 rounded-full bg-emerald-500" />
              In Stock
            </div>
          </div>
        )}

        <div className="mt-auto flex items-end justify-between gap-2">
          <span className="text-lg font-extrabold text-text-primary">${product.price.toFixed(2)}</span>
        </div>
      </div>

      <div className="p-4 pt-0 flex gap-2">
        <Link to={`/product/${product.id}`} className="flex-1 px-3 py-2 bg-surface hover:bg-bg-card-hover border border-border text-xs font-bold text-text-primary rounded-xl text-center transition-all">
          Details
        </Link>
        <button onClick={handleAddToCart} className={`flex-[1.5] px-3 py-2 text-xs font-extrabold text-white rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 ${added ? "bg-sky-700" : "bg-sky-500 hover:bg-sky-400 "}`}>
          {added ? <FiCheck size={12} /> : <FiShoppingCart size={12} />} 
          Add
        </button>
      </div>
    </div>
  )
}

export default ProductCard