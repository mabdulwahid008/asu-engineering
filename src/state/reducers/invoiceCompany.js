const initialState = null;

const invoiceCompany = (state = initialState, action) => {
    switch(action.type){
        case 'SELECT_COMPANY':
            return state = action.payload;
        case 'REMOVE_COMAPNY':
            return state = null;
        default:
            return state;
    }
}

export default invoiceCompany;