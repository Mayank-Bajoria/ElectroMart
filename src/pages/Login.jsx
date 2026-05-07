import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { FiMail, FiLock, FiUser, FiZap } from "react-icons/fi"

function Login({ login, signup }) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (isLogin) {
        await login(email, password)
      } else {
        await signup(name, email, password)
      }
      navigate(from, { replace: true })
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  function toggleMode() {
    setIsLogin(!isLogin)
  }

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <div className="bg-bg-card rounded-[40px] p-8 md:p-12 border border-border relative overflow-hidden">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-500 mx-auto mb-6">
            <FiZap size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-text-primary tracking-tight mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-text-secondary font-medium">
            {isLogin ? "Enter your credentials to access ElectroMart" : "Join our premium community of tech enthusiasts"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="space-y-2 group">
              <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-sky-500 transition-colors" />
                <input type="text" placeholder="Enter your name" className="w-full bg-surface border border-border rounded-2xl py-3.5 pl-12 pr-4 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
            </div>
          )}

          <div className="space-y-2 group">
            <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Email Address</label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-sky-500 transition-colors" />
              <input type="email" placeholder="name@example.com" className="w-full bg-surface border border-border rounded-2xl py-3.5 pl-12 pr-4 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>

          <div className="space-y-2 group">
            <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Password</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-sky-500 transition-colors" />
              <input type="password" placeholder="••••••••" className="w-full bg-surface border border-border rounded-2xl py-3.5 pl-12 pr-4 text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-3 px-4 rounded-xl text-center">
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 disabled:opacity-70 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]">
            {loading ? "Processing..." : (isLogin ? "Login" : "Sign Up")}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-text-secondary text-sm font-medium">
            {isLogin ? "New to ElectroMart?" : "Already have an account?"}
            <button onClick={toggleMode} className="text-sky-400 font-bold hover:text-sky-300 transition-colors ml-1">
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login