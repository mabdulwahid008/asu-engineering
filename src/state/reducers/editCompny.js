const inititalState = null;

const editCompany = (state = inititalState, action) => {
    switch(action.type){
        case "EDIT_COMPANY":
            return state = action.payload
        case "UPDATE_COMPANY":
            return state = null;
        default:
            return state;
    }
}

export default editCompany;