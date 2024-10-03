import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import React, { useEffect, useState } from "react";
import { FetchProducts } from "@/api/api/";
import styles from "@/styles/Cart.module.css";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("Cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart).itemsId);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const {
        products: fetchedProducts,
        loading,
        error,
      } = await FetchProducts();

      const groupedProducts = cartItems.reduce((acc, itemId) => {
        const foundProduct = fetchedProducts.find(
          (p) => String(p.id) === String(itemId)
        );
        if (foundProduct) {
          const existing = acc.find(
            (product) => product.id === foundProduct.id
          );
          if (existing) {
            existing.quantity += 1;
          } else {
            acc.push({ ...foundProduct, quantity: 1 });
          }
        }
        return acc;
      }, []);

      setProducts(groupedProducts);
      setLoading(loading);
      setError(error);
    };

    if (cartItems.length > 0) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [cartItems]);

  const updateLocalStorage = (updatedCartItems) => {
    localStorage.setItem("Cart", JSON.stringify({ itemsId: updatedCartItems }));
  };

  const addProduct = (productId) => {
    const updatedCartItems = [...cartItems, productId];
    setCartItems(updatedCartItems);
    updateLocalStorage(updatedCartItems);
  };

  const removeProduct = (productId) => {
    const updatedCartItems = cartItems.filter((id) => id !== productId);
    setCartItems(updatedCartItems);
    updateLocalStorage(updatedCartItems);
  };

  const deleteItem = (productId) => {
    removeProduct(productId);
    setProducts(products.filter((product) => product.id !== productId));
  };

  const removeOne = (productId) => {
    const updatedProducts = products
      .map((product) => {
        if (product.id === productId) {
          if (product.quantity > 1) {
            return { ...product, quantity: product.quantity - 1 };
          } else {
            deleteItem(productId);
            return null;
          }
        }
        return product;
      })
      .filter(Boolean);

    setProducts(updatedProducts);

    const updatedCartItems = updatedProducts.flatMap((product) =>
      Array(product.quantity).fill(product.id)
    );
    setCartItems(updatedCartItems);
    updateLocalStorage(updatedCartItems);
  };

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error)
    return <p className={styles.error}>A network error was encountered</p>;

  return (
    <>
      <Header />
      <main className={styles.main}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img
              src={product.image}
              alt={product.title}
              className={styles.productImage}
            />
            <h2 className={styles.productTitle}>{product.title}</h2>
            <p className={styles.productPrice}>
              Price: ${product.price.toFixed(2)}
            </p>
            <p className={styles.productQuantity}>
              Quantity: {product.quantity}
            </p>
            <button
              onClick={() => addProduct(product.id)}
              className={styles.addButton}
            >
              Add More
            </button>
            <button
              onClick={() => removeOne(product.id)}
              className={styles.removeButton}
            >
              Remove One
            </button>
            <button
              onClick={() => deleteItem(product.id)}
              className={styles.removeButton}
            >
              Remove Completely
            </button>
          </div>
        ))}
      </main>
      <Footer />
    </>
  );
}