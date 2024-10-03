import { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { FetchProducts } from "@/api/api/";
import ProductCategory from "@/components/Product/MainDisplay/ProductCategory";
import styles from "@/styles/Home.module.css";


export default function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const Fetch = async () => {
      const { products, loading, error } = await FetchProducts();
      setLoading(loading);
      setError(error);
      setProducts(products);
    };

    Fetch();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;

  const jewelery = products.filter(
    (product) => product.category === "jewelery"
  );
  const electronics = products.filter(
    (product) => product.category === "electronics"
  );
  const mensClothing = products.filter(
    (product) => product.category === "men's clothing"
  );
  const womensClothing = products.filter(
    (product) => product.category === "women's clothing"
  );

  return (
    <>
      <Header />
      <main className={styles.container}>
        <ProductCategory title="Electronics" products={electronics} />
        <ProductCategory title="Jewelery" products={jewelery} />
        <ProductCategory title="Men's Clothing" products={mensClothing} />
        <ProductCategory title="Women's Clothing" products={womensClothing} />
      </main>
      <Footer />
    </>
  );
}

