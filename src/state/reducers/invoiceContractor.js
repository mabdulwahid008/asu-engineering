const initialState = null;

const invoiceContractor = (state = initialState, action) => {
    switch(action.type){
        case 'SELECT_CONTRACTOR':
            return state = action.payload;
        case 'REMOVE_CONTRACTOR':
            return state = null;
        default:
            return state;
    }
}

export default invoiceContractor;