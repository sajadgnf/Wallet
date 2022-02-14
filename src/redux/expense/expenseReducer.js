const initialList = () => {
    const list = localStorage.getItem('expenses_list')
    let expenses = []
    if (list) {
        expenses = JSON.parse(list)
    }
    return expenses
}

const initialState = {
    expensesList: initialList(),
    query: ""
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            localStorage.setItem('expenses_list', JSON.stringify([...state.expensesList, action.payload]))
            return {
                ...state,
                expensesList: [...state.expensesList, action.payload],
                query: "",
            }
        case "DELETE_ITEM":
            const newexpensesList = state.expensesList.filter(item => item.createdAt !== action.payload.createdAt)
            localStorage.setItem("expenses_list", JSON.stringify(newexpensesList))
            return {
                ...state,
                expensesList: [...newexpensesList]
            }
        case "SEARCH":
            return {
                ...state,
                query: action.payload
            }
        default:
            return state
    }
}

export default reducer