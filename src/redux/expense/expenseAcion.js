const addItem = data => {
    return {
        type: "ADD_ITEM",
        payload: data
    }
}

const deleteItem = data => {
    return {
        type: "DELETE_ITEM",
        payload: data
    }
}

const search = query => {
    return {
        type: "SEARCH",
        payload: query
    }
}

export { addItem, deleteItem, search }