import { combineReducers } from 'redux'
import authenticateUser from './authenticateUser'
import editProduct from './editProduct';
import editCompany from './editCompny'
import invoiceProducts from './invoiceProducts'
import invoiceCustomer from './invoiceCustomer'
import invoiceContractor from './invoiceContractor'
import invoiceCompany from './invoiceCompany'

const reducers = combineReducers({
    authenticateUser,
    editProduct,
    editCompany,

    invoiceProducts,
    invoiceCustomer,
    invoiceContractor,
    invoiceCompany
})

export default reducers;