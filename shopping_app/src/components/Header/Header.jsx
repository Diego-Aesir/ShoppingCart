import {Link} from "react-router-dom";
import Image from 'next/image';
import cartImage from '/public/images/cart.png';
import styles from "@/styles/Header.module.css";

export default function Header() {
    return (
        <nav className={styles.container}>
            <h1 className={styles.logo}><Link to="/">AMAZON_IA</Link></h1>
            <input className={styles.searchBar} type="text" placeholder="Not Working"/>
            <Link to="/cart">
                <Image src={cartImage} alt="Cart" height={100} width={100} className={styles.cartImg}/>
            </Link>
        </nav>
    );
}