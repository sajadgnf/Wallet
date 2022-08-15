import React from 'react';

//styles
import styles from "./Pagination.module.css"

const Pagination = ({ totalCoins, coinsPerPage, currentPage, changePage, paginate }) => {

    const pagesNumber = []

    for (let i = 1; i <= Math.ceil(totalCoins / coinsPerPage); i++) {
        pagesNumber.push(i)
    }

    return (
        <div className={styles.paginateContainer}>
            <button
                className={`prev ${styles.prev}`}
                onClick={event => changePage(event, pagesNumber.length)}>
                prev
            </button>
            {
                pagesNumber.map(number => <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`${styles.button} ${number === currentPage ? styles.activeButton : ''}`}
                >{number}</button>)
            }
            <button
                className={styles.next}
                onClick={event => changePage(event, pagesNumber.length)}>
                next
            </button>
        </div>
    );
};

export default Pagination