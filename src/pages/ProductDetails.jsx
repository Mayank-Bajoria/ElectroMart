import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getSingleProduct } from "../services/productService"
import { FiArrowLeft, FiShoppingCart, FiStar, FiPackage, FiCheck } from "react-icons/fi"

function ProductDetails({ addToCart }) {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    setProduct(null)
    getSingleProduct(id).then((data) => {
      setProduct(data)
    })
  }, [id])

  function handleAdd() {
    addToCart(product)
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
    }, 800)
  }

  if (!product) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-bg-card rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 animate-pulse border border-border">
          <div className="h-[400px] bg-surface" />
          <div className="p-10 space-y-4">
            <div className="h-8 bg-surface rounded w-3/4" />
            <div className="h-4 bg-surface rounded w-1/4" />
            <div className="space-y-2 py-4">
              <div className="h-4 bg-surface rounded w-full" />
              <div className="h-4 bg-surface rounded w-full" />
              <div className="h-4 bg-surface rounded w-2/3" />
            </div>
            <div className="h-12 bg-surface rounded w-1/2 mt-8" />
          </div>
        </div>
      </div>
    )
  }

  const starsToFill = Math.round(product.rating)

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-8 font-medium group">
        <FiArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Explore
      </Link>

      <div className="bg-bg-card rounded-[32px] border border-border overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="bg-surface flex items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-sky-500/5 to-transparent pointer-events-none" />
          <img src={product.images[0]} alt={product.title} className="max-h-[360px] object-contain hover:scale-105 transition-transform duration-500" />
        </div>

        <div className="p-10 md:p-14 flex flex-col justify-center border-l border-border">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-500 mb-2">{product.category}</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary leading-tight mb-4 tracking-tight">{product.title}</h1>

          {product.rating && (
            <div className="flex items-center gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((star) => {
                return (
                  <FiStar key={star} size={16} fill={star <= starsToFill ? "#fbbf24" : "none"} className={star <= starsToFill ? "text-amber-400" : "text-text-muted"} />
                )
              })}
              <span className="text-text-secondary text-sm font-bold ml-2">
                {product.rating.toFixed(1)} <span className="opacity-50">/ 5.0</span>
              </span>
            </div>
          )}

          <p className="text-text-secondary leading-relaxed mb-8 text-lg font-medium">{product.description}</p>

          <div className="flex items-center gap-6 mb-10">
            <div className="flex flex-col">
              <span className="text-text-muted text-xs font-bold uppercase tracking-wider mb-1">Price</span>
              <span className="text-4xl font-black text-text-primary">${product.price.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={handleAdd} className={`flex-[2] py-4 rounded-2xl flex items-center justify-center gap-3 font-black transition-all ${added ? "bg-sky-700 text-white" : "bg-sky-500 hover:bg-sky-400 text-white active:scale-[0.98]"}`}>
              {added ? <FiCheck size={20} /> : <FiShoppingCart size={20} />} Add to Cart
            </button>
            <div className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-surface border border-border rounded-2xl text-text-muted text-sm font-bold">
              <FiPackage size={16} />
              <span className="text-emerald-500">In Stock</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails