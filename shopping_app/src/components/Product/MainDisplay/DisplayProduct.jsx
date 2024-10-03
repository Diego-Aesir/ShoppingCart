import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";

export default function DisplayProduct({ id, title, price, image }) {
  const router = useRouter();
  
  const CallLink = () => {
    router.push(`/product?id=${id}`);
  };

  return (
    <div onClick={() => CallLink()} className={styles.productCard}>
      <Image src={image} alt={title} height={100} width={100} />
      <h2>{title}</h2>
      <p>${price}</p>
    </div>
  );
}
