const initialState = null;

const invoiceCustomer = (state = initialState, action) => {
    switch(action.type){
        case 'SELECT_CUSTOMER':
            return state = action.payload;
        case 'REMOVE_CUSTOMER':
            return state = null;
        default:
            return state;
    }
}

export default invoiceCustomer;