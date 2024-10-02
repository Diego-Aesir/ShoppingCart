export async function FetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products", { mode: "cors" });
    if (!response.ok) {
      throw new Error("Server error");
    }
    const products = await response.json();
    return { products, loading: false, error: null };
  } catch (error) {
    return { products: [], loading: false, error: error.message };
  }   
};