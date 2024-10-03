import DisplayProduct from "./DisplayProduct";
import styles from "@/styles/Home.module.css";

export default function ProductCategory({ title, products}) {
    return (
      <div className={styles.productsContainer}>
        <h2>{title}</h2>
        <div className={styles.productsDisplay}>
          {products.map((product) => (
            <DisplayProduct
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>
    );
}