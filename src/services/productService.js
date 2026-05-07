import axios from "axios"

const BASE = "https://dummyjson.com"


export const categoryMeta = {
  smartphones: { label: "Smartphones", icon: "📱", api: "smartphones" },
  laptops: { label: "Laptops", icon: "💻", api: "laptops" },
  tablets: { label: "Tablets", icon: "📲", api: "tablets" },
  "mobile-accessories": { label: "Accessories", icon: "🎧", api: "mobile-accessories" },
}


export const categories = Object.keys(categoryMeta)


export async function getElectronics() {
  try {
    const slugList = ["smartphones", "laptops", "tablets", "mobile-accessories"]
    const results = await Promise.all(
      slugList.map((cat) =>
        axios.get(`${BASE}/products/category/${cat}?limit=20`).then((r) => r.data.products)
      )
    )
    return results.flat()
  } catch (err) {
    console.error("getElectronics error:", err)
    return []
  }
}


export async function getCategory(slug) {
  const meta = categoryMeta[slug]
  if (!meta) return []
  try {
    const res = await axios.get(`${BASE}/products/category/${meta.api}?limit=30`)
    return res.data.products
  } catch (err) {
    console.error("getCategory error:", err)
    return []
  }
}


export async function getSingleProduct(id) {
  try {
    const res = await axios.get(`${BASE}/products/${id}`)
    return res.data
  } catch (err) {
    console.error("getSingleProduct error:", err)
    return null
  }
}
