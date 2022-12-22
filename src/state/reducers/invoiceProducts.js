const initialState = [];

const invoiceProducts = (state= initialState, action) => { 
    switch(action.type){
        case 'SELECT_PRODUCT':{
            const check = state.some((product)=> {return product.id === action.payload.id})
            if(check){
                return state;
            }
            return state.concat(action.payload);
        }
        case 'UPDATE_PRODUCT_QUANTITY':{
            const product = state.find((product)=>{return product.id === action.payload.id})
            product.quantity = action.quantity;
            return state;
        }
        case 'REMOVE_PRODUCT':{
            const newState = state.filter((product)=> {return product.id !== action.payload.id});
            return state = newState;
        }
        case 'REMOVE_ALL_PRODUCt':{
            return state = [];
        }
        default:
            return state;
    }
}

export default invoiceProducts;