import DisplayProduct from "./DisplayProduct";
import styles from "@/styles/Home.module.css";

export default function ProductCategory({ title, products }) {
    return (
      <div className={styles.productsContainer}>
        <h2>{title}</h2>
        <div className={styles.productsDisplay}>
          {products.map((product, index) => (
            <DisplayProduct
              key={index}
              title={product.title}
              price={product.price}
              description={product.description}
              image={product.image}
            />
          ))}
        </div>
      </div>
    );
}