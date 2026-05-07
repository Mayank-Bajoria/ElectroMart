import { Link } from "react-router-dom"
import { FiCheckCircle, FiHome, FiMail, FiArrowRight } from "react-icons/fi"

function OrderConfirmation() {
  const orderId = "EM-" + Math.floor(Math.random() * 900000 + 100000)

  const steps = [
    { icon: "📦", label: "Confirmed", active: true },
    { icon: "⚙️", label: "Processing", active: false },
    { icon: "🚚", label: "Shipping", active: false },
    { icon: "🏠", label: "Delivery", active: false },
  ]

  return (
    <div className="max-w-3xl mx-auto px-6 py-20 text-center">
      <div className="bg-bg-card rounded-[48px] border border-border p-12 md:p-16 relative overflow-hidden">
        <div className="w-24 h-24 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <FiCheckCircle size={48} />
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-text-primary mb-4 tracking-tight">Order Placed! 🎉</h1>
        <p className="text-text-secondary text-lg font-medium mb-10 max-w-md mx-auto leading-relaxed">
          Thank you for choosing ElectroMart. Your high-tech gear will be with you shortly.
        </p>

        <div className="bg-surface border border-border rounded-3xl p-6 mb-12 inline-block">
          <span className="text-text-muted text-xs font-bold uppercase tracking-widest block mb-2">Order Identification</span>
          <span className="text-2xl font-black text-sky-500 tracking-wider">{orderId}</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {steps.map((step, i) => {
            return (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all ${step.active ? "bg-sky-500 grayscale-0" : "bg-surface grayscale"}`}>
                  {step.icon}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${step.active ? "text-sky-500" : "text-text-muted"}`}>
                  {step.label}
                </span>
              </div>
            )
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-sky-500 hover:bg-sky-400 text-white px-10 py-5 rounded-2xl font-black transition-all active:scale-95">
            <FiHome size={20} /> Back to Store
          </Link>
          <button className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-surface hover:bg-bg-card-hover text-text-primary px-10 py-5 rounded-2xl font-black transition-all border border-border">
            <FiMail size={20} /> View Invoice
          </button>
        </div>
      </div>

      <p className="mt-12 text-text-muted text-sm font-medium flex items-center justify-center gap-2">
        Need help? 
        <Link to="/" className="text-sky-500 hover:underline flex items-center gap-1">
          Contact Support <FiArrowRight size={14} />
        </Link>
      </p>
    </div>
  )
}

export default OrderConfirmation