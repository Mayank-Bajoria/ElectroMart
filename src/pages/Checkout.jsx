import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { FiArrowLeft, FiLock } from "react-icons/fi"

function Checkout({ cart, clearCart }) {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    card: "",
    expiry: "",
    cvv: ""
  })

  const [errors, setErrors] = useState({})

  const total = cart.reduce((acc, item) => {
    return acc + (item.price * item.quantity)
  }, 0)

  function handleChange(e) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    setErrors({ ...errors, [name]: "" })
  }

  function handleCardChange(e) {
    let val = e.target.value.replace(/\D/g, "").slice(0, 16)
    let formatted = ""
    for (let i = 0; i < val.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += " "
      }
      formatted += val[i]
    }
    setForm({ ...form, card: formatted })
    setErrors({ ...errors, card: "" })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = {}

    if (!form.name.trim()) {
      errs.name = "Full name is required"
    }
    if (!form.email.includes("@")) {
      errs.email = "Valid email is required"
    }
    if (!form.phone.trim()) {
      errs.phone = "Phone number is required"
    }
    if (!form.address.trim()) {
      errs.address = "Street address is required"
    }
    if (!form.city.trim()) {
      errs.city = "City is required"
    }
    if (!form.zip.trim()) {
      errs.zip = "PIN Code is required"
    }

    const cardDigits = form.card.replace(/\s/g, "")
    if (cardDigits.length < 16) {
      errs.card = "Invalid card number"
    }
    if (!form.expiry.trim()) {
      errs.expiry = "Required"
    }
    if (form.cvv.length < 3) {
      errs.cvv = "Required"
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    clearCart()
    navigate("/")
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="bg-bg-card rounded-[40px] border border-white/5 p-20">
          <div className="text-7xl mb-8 opacity-20 grayscale">🛒</div>
          <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight">Nothing to checkout</h2>
          <p className="text-text-secondary mb-10 max-w-xs mx-auto text-lg">Your cart is currently empty. Add some products to proceed.</p>
          <Link to="/" className="inline-flex items-center gap-3 bg-sky-500 hover:bg-sky-400 text-white px-8 py-4 rounded-2xl font-black transition-all active:scale-95">
            Shop Now
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Link to="/cart" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-8 font-medium group">
        <FiArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Cart
      </Link>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-[2]">
          <h1 className="text-4xl font-black text-text-primary mb-10 tracking-tight">Checkout</h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-bg-card rounded-[32px] p-8 border border-border space-y-6">
              <h2 className="text-xl font-bold text-text-primary flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center text-sm">1</div>
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Full Name</label>
                  <input name="name" value={form.name} onChange={handleChange} className={`w-full bg-surface border ${errors.name ? "border-red-500/50" : "border-border"} rounded-2xl px-5 py-4 text-text-primary focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all`} placeholder="Enter your name" />
                  {errors.name && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Email Address</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} className={`w-full bg-surface border ${errors.email ? "border-red-500/50" : "border-border"} rounded-2xl px-5 py-4 text-text-primary focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all`} placeholder="name@example.com" />
                  {errors.email && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.email}</p>}
                </div>
              </div>
            </div>

            <div className="bg-bg-card rounded-[32px] p-8 border border-border space-y-6">
              <h2 className="text-xl font-bold text-text-primary flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center text-sm">2</div>
                Shipping Address
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Street Address</label>
                  <input name="address" value={form.address} onChange={handleChange} className={`w-full bg-surface border ${errors.address ? "border-red-500/50" : "border-border"} rounded-2xl px-5 py-4 text-text-primary focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all`} placeholder="House no, Street name" />
                  {errors.address && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.address}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">City</label>
                    <input name="city" value={form.city} onChange={handleChange} className={`w-full bg-surface border ${errors.city ? "border-red-500/50" : "border-border"} rounded-2xl px-5 py-4 text-text-primary focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all`} placeholder="Your City" />
                    {errors.city && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.city}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">PIN Code</label>
                    <input name="zip" value={form.zip} onChange={handleChange} className={`w-full bg-surface border ${errors.zip ? "border-red-500/50" : "border-border"} rounded-2xl px-5 py-4 text-text-primary focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all`} placeholder="131021" />
                    {errors.zip && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.zip}</p>}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-bg-card rounded-[32px] p-8 border border-border space-y-6">
              <h2 className="text-xl font-bold text-text-primary flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center text-sm">3</div>
                Payment Details
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Card Number</label>
                  <input name="card" value={form.card} onChange={handleCardChange} className={`w-full bg-surface border ${errors.card ? "border-red-500/50" : "border-border"} rounded-2xl px-5 py-4 text-text-primary focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all`} placeholder="0000 0000 0000 0000" maxLength={19} />
                  {errors.card && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.card}</p>}
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Expiry</label>
                    <input name="expiry" value={form.expiry} onChange={handleChange} className={`w-full bg-surface border ${errors.expiry ? "border-red-500/50" : "border-border"} rounded-2xl px-5 py-4 text-text-primary focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all`} placeholder="MM/YY" maxLength={5} />
                    {errors.expiry && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.expiry}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">CVV</label>
                    <input name="cvv" value={form.cvv} onChange={handleChange} className={`w-full bg-surface border ${errors.cvv ? "border-red-500/50" : "border-border"} rounded-2xl px-5 py-4 text-text-primary focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all`} placeholder="000" maxLength={4} />
                    {errors.cvv && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{errors.cvv}</p>}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="flex-1">
          <div className="bg-bg-card rounded-[32px] p-8 border border-border sticky top-24 space-y-8">
            <div>
              <h3 className="text-lg font-bold text-text-primary mb-6">Order Summary</h3>
              <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => {
                  return (
                    <div key={item.id} className="flex gap-4 items-center py-3 border-b border-border last:border-0">
                      <div className="w-12 h-12 bg-surface rounded-xl p-2 flex items-center justify-center border border-border relative">
                        <img src={item.images[0]} alt={item.title} className="max-h-full max-w-full object-contain" />
                        {item.quantity > 1 && (
                          <span className="absolute -top-1 -right-1 bg-sky-500 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                            {item.quantity}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-text-primary truncate">{item.title}</p>
                        <p className="text-sky-500 text-xs font-black">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-text-primary">Final Total</span>
                <span className="text-2xl font-black text-sky-500">${total.toFixed(2)}</span>
              </div>
            </div>

            <button onClick={handleSubmit} className="w-full bg-sky-500 hover:bg-sky-400 text-white py-5 rounded-2xl flex items-center justify-center gap-3 font-black transition-all active:scale-95">
              <FiLock size={18} />
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout