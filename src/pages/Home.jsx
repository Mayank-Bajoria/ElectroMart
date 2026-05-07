import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import Search from "../components/Search"
import { getElectronics } from "../services/productService"

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

function Home({ addToCart }) {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getElectronics().then((data) => {
      setProducts(data)
      setLoading(false)
    })
  }, [])

  const filtered = products.filter((p) => {
    return p.title.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div className="min-h-screen">
      <section className="relative pt-20 pb-16 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-glow blur-[120px] -z-10" />
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          Think Tech. <br/>
          <span className="bg-gradient-to-r from-sky-400 to-sky-600 bg-clip-text text-transparent">
            Think ElectroMart.
          </span>
        </h1>
        <p className="text-text-secondary text-lg max-w-lg mx-auto mb-10">
          Discover the latest premium electronics — all in one place.
        </p>
        <Search setSearch={setSearch} />
      </section>

      <section className="px-6 md:px-12 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold">
            {search ? `Results for "${search}"` : "Featured Products"}
          </h2>
          {!loading && (
            <span className="text-sm text-text-muted">{filtered.length} items</span>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => {
              return <SkeletonCard key={n} />
            })}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-bg-card rounded-3xl border border-border">
            <div className="text-5xl mb-4 opacity-20">🔍</div>
            <p className="text-text-muted font-medium">No products found for "{search}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((p) => {
              return <ProductCard key={p.id} product={p} addToCart={addToCart} />
            })}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home