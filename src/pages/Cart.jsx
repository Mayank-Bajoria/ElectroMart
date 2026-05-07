import { Link } from "react-router-dom"
import { FiShoppingBag, FiTrash2, FiArrowLeft, FiArrowRight, FiPlus, FiMinus } from "react-icons/fi"

function Cart({ cart, addToCart, removeFromCart, decrementQuantity }) {
  const total = cart.reduce((acc, item) => {
    return acc + (item.price * item.quantity)
  }, 0)

  const totalItems = cart.reduce((acc, item) => {
    return acc + item.quantity
  }, 0)

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="bg-bg-card rounded-[40px] border border-white/5 p-12 md:p-20">
          <div className="text-7xl mb-8 opacity-20 grayscale">🛒</div>
          <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight">Your cart is empty</h2>
          <p className="text-text-secondary mb-10 max-w-xs mx-auto text-lg">Looks like you haven't added any premium gadgets yet.</p>
          <Link to="/" className="inline-flex items-center gap-3 bg-sky-500 hover:bg-sky-400 text-white px-8 py-4 rounded-2xl font-black transition-all active:scale-95">
            <FiShoppingBag size={20} /> Explore Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-8 font-medium group">
        <FiArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Continue Shopping
      </Link>

      <h1 className="text-4xl font-black text-text-primary mb-10 tracking-tight">Your Cart</h1>

      <div className="space-y-4 mb-12">
        {cart.map((item) => {
          return (
            <div key={item.id} className="bg-bg-card rounded-[24px] p-6 border border-border flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-sky-500/30 transition-all group">
              <div className="flex items-center gap-6 w-full sm:w-auto">
                <div className="w-24 h-24 bg-surface rounded-2xl p-4 flex items-center justify-center border border-border">
                  <img src={item.images[0]} alt={item.title} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold text-text-primary mb-1 line-clamp-1">{item.title}</h3>
                  <span className="text-sky-500 font-extrabold text-lg">${item.price.toFixed(2)}</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-text-muted mt-1">{item.category}</span>
                </div>
              </div>

              <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center gap-3 bg-surface rounded-xl p-1 border border-border">
                  <button onClick={() => decrementQuantity(item.id)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-bg-card-hover text-text-primary transition-all">
                    <FiMinus size={14} />
                  </button>
                  <span className="text-sm font-black text-text-primary w-4 text-center">{item.quantity}</span>
                  <button onClick={() => addToCart(item)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-bg-card-hover text-text-primary transition-all">
                    <FiPlus size={14} />
                  </button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl transition-all">
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-bg-card rounded-[32px] p-8 border border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 blur-[80px] -z-10" />
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center text-text-secondary font-medium border-b border-border pb-4">
            <span>Summary ({totalItems} {totalItems === 1 ? "item" : "items"})</span>
            <span className="text-text-primary font-bold">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-xl font-bold text-text-primary">Grand Total</span>
            <span className="text-3xl font-black bg-gradient-to-r from-sky-400 to-sky-600 bg-clip-text text-transparent">${total.toFixed(2)}</span>
          </div>
        </div>
        <Link to="/checkout" className="w-full bg-sky-500 hover:bg-sky-400 text-white py-5 rounded-2xl flex items-center justify-center gap-3 font-black transition-all active:scale-[0.99]">
          Proceed to Checkout <FiArrowRight size={20} />
        </Link>
      </div>
    </div>
  )
}

export default Cart