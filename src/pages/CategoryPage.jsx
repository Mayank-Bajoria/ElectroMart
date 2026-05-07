import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { getCategory, categoryMeta } from "../services/productService"
import ProductCard from "../components/ProductCard"
import { FiArrowLeft } from "react-icons/fi"

function SkeletonCard() {
  return (
    <div className="bg-bg-card rounded-2xl overflow-hidden border border-border animate-pulse">
      <div className="h-48 bg-surface" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-surface rounded w-1/3" />
        <div className="h-4 bg-surface rounded w-full" />
        <div className="h-4 bg-surface rounded w-2/3" />
        <div className="h-8 bg-surface rounded w-1/2 mt-4" />
      </div>
    </div>
  )
}

function CategoryPage({ addToCart }) {
  const { slug } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const meta = categoryMeta[slug] || { label: slug, icon: "📦" }

  useEffect(() => {
    setLoading(true)
    setProducts([])
    getCategory(slug).then((data) => {
      setProducts(data)
      setLoading(false)
    })
  }, [slug])

  return (
    <div className="min-h-screen">
      <div className="relative pt-20 pb-16 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <Link to="/categories" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-8 font-medium group">
            <FiArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Categories
          </Link>
          <div className="flex items-center gap-8">
            <div className="text-6xl bg-bg-card w-24 h-24 rounded-[32px] flex items-center justify-center border border-border">
              {meta.icon}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-text-primary tracking-tight">{meta.label}</h1>
              <p className="text-text-secondary mt-2 font-medium text-lg">
                {loading ? "Searching for items..." : `Showing ${products.length} premium products`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            [1, 2, 3, 4, 5, 6, 7, 8].map((n) => {
              return <SkeletonCard key={n} />
            })
          ) : (
            products.map((p) => {
              return <ProductCard key={p.id} product={p} addToCart={addToCart} />
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
