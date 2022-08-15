import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// styles
import styles from "./LandingPage.module.css"

// components
import Expense from '../shared/Expense';

// actions
import { search } from "../../redux/expense/expenseAcion"

// icons
import empty from "../../assets/images/empty.svg"

const LandingPage = () => {

    const { expensesList, query } = useSelector(store => store)
    const dispatch = useDispatch()
    const [value, setValue] = useState("")

    const searchHandler = event => {
        setValue(event.target.value)
        dispatch(search(event.target.value))
    }

    // search for expense
    const filterList = expensesList.filter(expense => {
        if (expense.title.toLowerCase().includes(query.toLowerCase()) || expense.category.toLowerCase().includes(query.toLowerCase())) return expense
        else if (value === "") return expense
    })

    const wholeCost = filterList.reduce((total, expense) => total + Number(expense.amount), 0)
    const orderedWholeCost = Number(wholeCost).toLocaleString()

    return (
        <div className={styles.mainContainer}>
            <h1 className={styles.title}>Wallet</h1>
            <div className={styles.expensesContainer}>
                <div className={styles.header}>
                    <h3 className={wholeCost.toString().split('').length > 10 ? styles.smaller : styles.totalCost}><span>Total Cost: </span>{orderedWholeCost}$</h3>
                    <input type="text" placeholder='Search for expenses' value={value} onChange={event => searchHandler(event)} />
                    <button><Link to="/addExpense">Add New expense</Link></button>
                </div>
                {
                    expensesList.length ?
                        <div className={styles.expenseContainer}>
                            {filterList.map(expense => <Expense key={expense.createdAt} expense={expense} />)}
                        </div> :
                        <div className={styles.emptyContainer}>
                            <img className={styles.empty} src={empty} alt="empty" />
                        </div>
                }
                <div className={styles.firstBall}></div>
                <div className={styles.secondBall}></div>
            </div>
        </div>
    );
};

export default LandingPage;