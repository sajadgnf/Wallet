import React from 'react';

// styles
import styles from "./Coin.module.css"

const Coin = ({ image, name, price, symbol, marketCap, priceChanges }) => {

    return (
        <div className={styles.container}>
            <div>
                <img src={image} />
                <span className={styles.name}>{name}</span>
            </div>
            <div>
                <span className={styles.symbol}>{symbol.toUpperCase()}</span>
                <span className={styles.price}>{price.toLocaleString()}$</span>
            </div>
            <div>
                <span className={priceChanges > 0 ? styles.greenPriceChange : styles.redPriceChange}>{priceChanges}</span>
                <span>{marketCap.toLocaleString()}</span>
            </div>

        </div>
    );
};

export default Coin;