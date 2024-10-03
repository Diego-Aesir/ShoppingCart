import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FetchProducts } from "@/api/api/";
import styles from "@/styles/ProductPage.module.css";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const Fetch = async () => {
      const { products, loading, error } = await FetchProducts();
      const foundProduct = await products.find(
        (product) => String(product.id) === String(id)
      );

      setProduct(foundProduct);
      setLoading(loading);
      setError(error);
    };

    Fetch();
  }, [id]);

  const addToCart = () => {
    const existingCart = localStorage.getItem("Cart");
    const cart = existingCart ? JSON.parse(existingCart) : { itemsId: [] };
    cart.itemsId.push(id);
    localStorage.setItem("Cart", JSON.stringify(cart));
    window.alert("Added to the Cart");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.imageContainer}>
          <Image
            src={product.image}
            alt={product.title}
            height={300}
            width={300}
            className={styles.productImage}
          />
        </div>
        <div className={styles.productInfo}>
          <h1 className={styles.productTitle}>
            {product.title} ({product.category})
          </h1>
          <div className={styles.productDescription}>
            <p>{product.description}</p>
          </div>
          <h2 className={styles.productPrice}>{product.price}</h2>
          <button
            onClick={() => addToCart(id)}
            className={styles.addToCartButton}
          >
            Add to Cart
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
