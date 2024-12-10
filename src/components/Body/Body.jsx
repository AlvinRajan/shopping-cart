import styles from './Body.module.css'
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";

export default function Body(){
    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.welcome_section}>
                    <div className={styles.Welcome}>Welcome to UR Shop!</div>
                    <div className={styles.welcome_message}>Your one-stop destination  for all your shopping needs! At UR Shop, we make it easier than ever to explore and find products you will love. Whether you are looking for the latest gadgets, stylish apparel, or essential home items, we have got it all in one place. Happy shopping!</div>
                </div>
                <div className={styles.about_section}>
                    <div className={styles.Welcome}>About Us</div>
                    <div className={styles.welcome_message}>At UR Shop, we believe that shopping should be seamless, fun, and accessible. We are an online store designed to bring you a diverse range of products sourced from trusted suppliers. Our mission is to provide you with a shopping experience that is fast, secure, and convenient. Browse our extensive collection today and discover why UR Shop is the smart choice for shoppers everywhere!</div>
                </div>
                <div className={styles.button_wrapper}>
                    <Link to = '/shop' className={styles.explore_button}>
                        <div className={styles.explore_text}>Explore Range</div>
                        <FaArrowRightLong />
                    </Link>
                </div>
            </div>
        </div>
    )
}