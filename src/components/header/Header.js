import React from 'react';
import { Link } from 'react-router-dom'

// styles
import styles from './Header.module.css'

// images
import creditCart from "../../assets/images/credit-card.png"

const Header = () => {
    return (
        <nav className={styles.container}>
            <ul className={styles.list}>
                <Link to="/"><li>Wallet</li></Link>
                <Link to="/crypto"><li>Crypto</li></Link>
            </ul>
            <img className={styles.navabrImg} src={creditCart} alt="credit-cart" />
        </nav>
    );
};

export default Header;