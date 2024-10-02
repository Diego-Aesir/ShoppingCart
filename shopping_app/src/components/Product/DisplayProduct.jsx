import Image from "next/image";
import styles from "@/styles/Home.module.css";

export default function DisplayProduct({ title, price, description, image }) {
    return (
      <div className={styles.productCard}>
        <Image src={image} alt={title} height={100} width={100} />
        <h2>{title}</h2>
        <p>${price}</p>
      </div>
    );
  }