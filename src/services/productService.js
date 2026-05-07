const baseUrl = "https://dummyjson.com"

export const categories = ["smartphones", "laptops", "tablets", "mobile-accessories"]

export const categoryMeta = {
  smartphones: { label: "Smartphones", icon: "📱" },
  laptops: { label: "Laptops", icon: "💻" },
  tablets: { label: "Tablets", icon: "⬛" },
  "mobile-accessories": { label: "Accessories", icon: "🎧" },
}

export async function getElectronics() {
  const response = await fetch(baseUrl + "/products?limit=0")
  const data = await response.json()
  
  const filteredProducts = data.products.filter(item => 
    categories.includes(item.category)
  )
  
  return filteredProducts.slice(0, 36)
}

export async function getCategory(categoryName) {
  const response = await fetch(baseUrl + "/products/category/" + categoryName)
  const data = await response.json()
  return data.products
}

export async function getSingleProduct(productId) {
  const response = await fetch(baseUrl + "/products/" + productId)
  const data = await response.json()
  return data
}