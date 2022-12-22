export const loggIn = () => {
    return {
        type: "LOG_IN"
    }
}
export const logOut = () => {
    return {
        type: "LOG_OUT"
    }
}


export const editProuct = (product) => {
    return {
        type: "EDIT_PRODUCT",
        payload: product
    }
}
export const updateProduct = () =>{
    return{
        type: "UPDATE_PRODUCT"
    }
}


export const editCompany = (company) => {
    return {
        type: "EDIT_COMPANY",
        payload: company
    }
}
export const updateCompany = () =>{
    return{
        type: "UPDATE_COMPANY"
    }
}


// for invoive
export const SelectProduct = (product) => {
    return{
        type: 'SELECT_PRODUCT',
        payload: product
    }
}
export const updateProductQuantityy = (product, quantity) => {
    return{
        type: 'UPDATE_PRODUCT_QUANTITY',
        payload: product,
        quantity: quantity

    }
}
export const removeProduct = (product) => {
    return{
        type: 'REMOVE_PRODUCT',
        payload: product
    }
}
export const removeAllProducts = () => {
    return{
        type: 'REMOVE_ALL_PRODUCt',
    }
}

export const selectCustomer = (customer) =>{
    return{
        type: 'SELECT_CUSTOMER',
        payload: customer
    }
}
export const removeCustomer = () =>{
    return{
        type: 'REMOVE_CUSTOMER'
    }
}


export const selectContractor = (contractor) =>{
    return{
        type: 'SELECT_CONTRACTOR',
        payload: contractor
    }
}
export const removeContractor = () =>{
    return{
        type: 'REMOVE_CONTRACTOR'
    }
}

export const selectCompany = (company) =>{
    return{
        type: 'SELECT_COMPANY',
        payload: company
    }
}
export const removeCompany = () =>{
    return{
        type: 'REMOVE_COMAPNY'
    }
}

