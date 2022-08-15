import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from "react-toastify"
import { useNavigate, Link } from "react-router-dom"

// constants
import categories from '../../constants/categories';

// styles
import styles from './AddForm.module.css'

// icons
import arrowDown from "../../assets/images/arrow_down.svg"
import close from "../../assets/images/close.svg"

// action
import { addItem } from '../../redux/expense/expenseAcion';

// toast
import { notify } from '../shared/toast';

const AddForm = () => {

    const dispatch = useDispatch()
    const [openCategory, setOpenCategory] = useState(false)
    const ref = useRef(null)
    const [expenses, setExpenses] = useState({
        title: "",
        amount: "",
        category: "",
        image: "",
        createdAt: new Date()
    })
    const navigate = useNavigate()

    // close category list by clicking outside
    useEffect(() => {
        document.addEventListener('click', e => {
            if (ref.current && openCategory && !ref.current.contains(e.target)) {
                setOpenCategory(false)
            }
        })
    }, [openCategory])

    const expensesHandler = event => {
        if (event.target.name === "title") {
            if (Number(event.target.value.length) > 50) return

            setExpenses({
                ...expenses,
                title: event.target.value
            })
        } else if (event.target.name === "amount") {
            if (Number(event.target.value.length) > 23) return

            setExpenses({
                ...expenses,
                amount: event.target.value
            })
        } else {
            let item = event.currentTarget
            setExpenses({
                ...expenses,
                category: item.firstElementChild.innerHTML,
                image: item.lastElementChild.src,
            })
        }
    }

    const addexpenseHandler = () => {
        if (expenses.title === "" || expenses.amount === "" || expenses.category === "") {
            notify("error", "Please Fill The Frames and Choose a Category")
        } else if (Number(expenses.amount) <= 0) {
            notify("error", "Please Enter The Correct Amount")
        } else {
            notify("success", "expense Added Successfully")
            dispatch(addItem(expenses))
            navigate('/')
        }
    }

    return (
        <>
            <div className={styles.addFormContainer}>
                <button className={styles.cancleBtn}><Link to="/"><img src={close} alt="close" /></Link></button>
                <div className={styles.form}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="">Title</label>
                        <input type="text" name="title" value={expenses.title} onChange={event => expensesHandler(event)} />
                    </div>

                    <div className={styles.inputContainer}>
                        <label htmlFor="">Amount</label>
                        <input type="number" name="amount" value={expenses.amount} onChange={event => expensesHandler(event)} />
                    </div>

                    <div>
                        <div className={styles.categoryHambur} ref={ref} onClick={() => setOpenCategory(!openCategory)}>
                            <h3>{expenses.category ? expenses.category : "Categories"}</h3>
                            <img src={arrowDown} alt="arrow down" />
                        </div>
                        {
                            openCategory &&
                            <div className={styles.categories}>
                                {categories.map(item =>
                                    <div key={item.id} className={styles.category} onClick={event => expensesHandler(event)}>
                                        <p>{item.name}</p>
                                        <img className={styles.categoryIcon} src={item.image} alt={item.name} />
                                    </div>
                                )}
                            </div>
                        }
                    </div>
                    <button className={styles.addBtn} onClick={addexpenseHandler}>Add</button>
                </div>
                <div className={styles.firstBall}></div>
                <div className={styles.secondBall}></div>
            </div>

            <ToastContainer theme='colored' />
        </>
    );
};

export default AddForm;