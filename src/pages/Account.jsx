import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FiUser, FiLogOut, FiPackage, FiSettings, FiCreditCard, FiMapPin, FiChevronRight } from "react-icons/fi"

function Account({ user, logout }) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  if (!user) {
    return null
  }

  const items = [
    { icon: <FiPackage />, title: "Orders", desc: "Track and manage your purchases" },
    { icon: <FiMapPin />, title: "Addresses", desc: "Manage your shipping locations" },
    { icon: <FiCreditCard />, title: "Payments", desc: "Manage your payment methods" },
    { icon: <FiSettings />, title: "Settings", desc: "Privacy and account security" },
  ]

  function handleLogout() {
    logout()
    navigate("/")
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="bg-bg-card rounded-3xl p-8 border border-border flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-2xl border-2 border-sky-500 p-1 bg-surface" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-bg-card rounded-full"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-1">{user.name}</h1>
            <p className="text-text-secondary text-sm flex items-center gap-2">
              <FiUser className="text-sky-500" /> Standard Account
            </p>
          </div>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-2xl font-bold transition-all">
          <FiLogOut /> Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, i) => {
          return (
            <div key={i} className="group bg-bg-card p-6 rounded-3xl border border-border hover:border-sky-500/50 hover:bg-bg-card-hover transition-all cursor-pointer">
              <div className="w-12 h-12 bg-sky-500/10 text-sky-500 rounded-xl flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-text-primary font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-text-secondary text-sm mb-4 leading-relaxed">{item.desc}</p>
              <div className="flex items-center text-sky-500 text-xs font-bold uppercase tracking-widest gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Manage <FiChevronRight />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Account