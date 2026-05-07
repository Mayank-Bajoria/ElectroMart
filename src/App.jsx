import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import ProductDetails from "./pages/ProductDetails"
import Categories from "./pages/Categories"
import CategoryPage from "./pages/CategoryPage"
import Checkout from "./pages/Checkout"
import Login from "./pages/Login"

function App() {
  const [cart, setCart] = useState([])
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    const root = window.document.documentElement
    if (theme === "light") {
      root.classList.add("light")
    } else {
      root.classList.remove("light")
    }
  }, [theme])

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + 1 }
          }
          return item
        })
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  function removeFromCart(id) {
    setCart((prev) => {
      return prev.filter((item) => item.id !== id)
    })
  }

  function decrementQuantity(id) {
    setCart((prev) => {
      const item = prev.find((i) => i.id === id)
      if (item && item.quantity > 1) {
        return prev.map((i) => {
          if (i.id === id) {
            return { ...i, quantity: i.quantity - 1 }
          }
          return i
        })
      }
      return prev.filter((i) => i.id !== id)
    })
  }

  function clearCart() {
    setCart([])
  }

  function toggleTheme() {
    if (theme === "light") {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }

  function login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const userData = {
            id: "123",
            name: email.split("@")[0],
            email: email,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
          }
          setUser(userData)
          resolve(userData)
        } else {
          reject("Please enter email and password")
        }
      }, 800)
    })
  }

  function signup(name, email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password) {
          const userData = {
            id: "1001",
            name: name,
            email: email,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
          }
          setUser(userData)
          resolve(userData)
        } else {
          reject("Please fill all fields")
        }
      }, 800)
    })
  }

  function logout() {
    setUser(null)
  }

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar cart={cart} theme={theme} toggleTheme={toggleTheme} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:slug" element={<CategoryPage addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} decrementQuantity={decrementQuantity} />} />
            <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} />} />
            <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
            <Route path="/login" element={<Login login={login} signup={signup} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App