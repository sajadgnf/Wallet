import React from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment'
import { ToastContainer } from "react-toastify"

// styles
import styles from "./Expense.module.css"

// icon
import trash from "../../assets/images/trash.svg"

// action
import { deleteItem } from "../../redux/expense/expenseAcion"

// toast
import { notify } from "./toast"

// functions
import { shorter } from '../../helpers/functions';

const Expense = ({ expense }) => {

    const dispatch = useDispatch()
    const { title, amount, category, image, createdAt } = expense
    const time = moment(createdAt).fromNow()
    const cost = Number(amount).toLocaleString()

    const removeHandler = () => {
        dispatch(deleteItem(expense))
        notify("success", "Removed Successfully")
    }

    return (
        <>
            <div className={styles.expenseContainer}>
                <div className={styles.leftSidContent}>
                    <img src={image} alt={title} />
                    <div className={styles.expenseTitle}>
                        <h3>{category}</h3>
                        <p >{title}</p>
                    </div>
                </div>

                <p className={styles.amount}>{cost}$</p>

                <div className={styles.rightSideContent}>
                    <img src={trash} alt="trash" onClick={removeHandler} />
                    <span className={styles.time}>{shorter( time )}</span>
                </div>
            </div>

            <ToastContainer />
        </>
    );
};

export default Expense;