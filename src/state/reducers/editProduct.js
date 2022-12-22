const inititalState = null;

const editProduct = (state = inititalState, action) => {
    switch(action.type){
        case "EDIT_PRODUCT":
            return state = action.payload
        case "UPDATE_PRODUCT":
            return state = null;
        default:
            return state;
    }
}

export default editProduct;