import CheckBox from 'components/CheckBox/CheckBox'
import CreateUserPopup from 'components/createUserPopup.js/CreateUserPopup'
import Loading from 'components/Loading/Loading'
import PopupInvoice from 'components/PopupInvoice/PopupInvoice'
import ProductSelect from 'components/ProductSelect/ProductSelect'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Input, Row, Table } from 'reactstrap'
import { removeContractor } from 'state/actions'
import { removeCustomer } from 'state/actions'
import { removeCompany } from 'state/actions'
import { removeAllProducts } from 'state/actions'
import { logOut } from 'state/actions'

function CreateInvoice() {
    const dispatch = useDispatch()
    
    const [customers, setCustomers] = useState(null)
    const [companpies, setCompanies] = useState(null);
    const [contractors, setContractors] = useState(null)
    const [products, setProducts] = useState(null)

    const selectedProducts = useSelector(state=> state.invoiceProducts)
    const customer = useSelector(state=> state.invoiceCustomer)
    const contractor = useSelector(state=> state.invoiceContractor)
    const company = useSelector(state=> state.invoiceCompany)

    const [quantityUpdated, setQuantityUpdated] = useState(false)

    const [subtotal, setSubtotal] = useState(0)
    const [loading, setLoading] = useState(false)

    const [addCustomer, setaddCustomer] = useState(false)
    const [invoicePopup, setInvoicePopup] = useState(false)

    const fetchCustomers = async() => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}customers`,{
            method: 'GET',
            headers:{
                'Content-Type': 'Application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        const res = await response.json();
        
        if(response.status === 200)
            setCustomers(res)
        else if(response.status === 401){
            localStorage.removeItem('token')
            dispatch(logOut())
        }
        else
            toast.error(res.message)
    }

    const getCompanpies = async() =>{
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}companies`,{
            method: 'GET',
            headers: {
                'Authorization' : localStorage.getItem('token')
            }
        });
        const res = await response.json();

        if(response.status === 200){
            setCompanies(res)
        }
        else if(response.status === 401){
            localStorage.removeItem('token')
            dispatch(logOut())
        }
        else
            toast.error(res.message)
    }
 
    const getContractors = async() => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}contractors`,{
            method: 'GET',
            headers:{
                'Content-Type': 'Application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        const res = await response.json();
        
        if(response.status === 200)
            setContractors(res)
        else if(response.status === 401){
            localStorage.removeItem('token')
            dispatch(logOut())
        }
        else
            toast.error(res.message)
    }

    const fetchProducts = async() => { 
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}products`,{
            method: 'GET',
            headers:{
                'Content-Type': 'Application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        const res = await response.json()
        
        if(response.status === 200)
            setProducts(res)
        else if(response.status === 401){
          localStorage.removeItem('token')
            dispatch(logOut())
        }
        else
          toast.error(res.message)
    }

    const proceed = async() =>{
        setLoading(true)
        if(customer === null){
            toast.error('Please select customer')
            setLoading(false)
            return;
        }
        else if(contractor === null){
            toast.error('Please select contractor')
            setLoading(false)
            return;
        }
        else if(company === null){
            toast.error('Please select company')
            setLoading(false)
            return;
        }
        else if(selectedProducts.length === 0){
            toast.error('Please select products')
            setLoading(false)
            return;
        }
        // else{
        //     setInvoicePopup(true);
        //     setLoading(false)
        // }
        else{
            const invoice = {
                customer_id: customer.id, 
                company_id: company.id, 
                contractor_id: contractor.id, 
                items:[]
            }
            for (let i = 0; i < selectedProducts.length; i++) {
                const obj = {
                    id : selectedProducts[i].id,
                    quantity: selectedProducts[i].quantity,
                }
                invoice.items.push(obj)
            }

            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}invoices`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                    "Authorization" : localStorage.getItem('token')
                },
                body: JSON.stringify(invoice)
            })
            const res = await response.json()

            if(response.ok){
                toast.success(res.message)
                setInvoicePopup(true)
            }
            else if(response.status === 401){
                localStorage.removeItem('token')
                dispatch(logOut())
            }
            else if(response.status === 500){
                toast.error('Server Error')
                console.log(invoice);
            }
            else{
                toast.error(res.message)
            }
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCustomers();
        getCompanpies();
        getContractors();
        fetchProducts();

        return(()=>{
            dispatch(removeCustomer())
            dispatch(removeContractor())
            dispatch(removeCompany())
            dispatch(removeAllProducts())
        })
    }, [])

    useEffect(()=>{
        setQuantityUpdated(false)

        let total = 0;
        for (let i = 0; i < selectedProducts.length; i++) {
           total += selectedProducts[i].quantity * selectedProducts[i].price
        }
        setSubtotal(total)
        
    }, [customer, contractor, company, selectedProducts, quantityUpdated])


    
  return (<>
    <div className='content'>
        <Row gx-1>
            <Col md="4">
                <Card>
                    <CardHeader style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <CardTitle tag="p">Customer</CardTitle>
                        {!addCustomer && <i className='nc-icon nc-simple-add' onClick={()=>{setaddCustomer(true)}}/>}
                        {addCustomer && <i className='nc-icon nc-simple-delete' onClick={()=>{setaddCustomer(false)}}/>}
                    </CardHeader>
                    <CardBody className='.form'>
                       {!customers && <Loading />}
                        {customers && !addCustomer && <CheckBox data={customers} address={true} Name={true} Title={false} placeholder={'Select Customer'} box={'customer'}/>}
                        {/* {addCustomer && <Form style={{transition: '1s ease'}}>
                            <FormGroup>
                                <label>Name</label>
                                <Input type='text' name='name' placeholder='Name' />
                            </FormGroup>
                            <FormGroup>
                                <label>Phone</label>
                                <Input type='number' id='phone' name='phone' placeholder='12 7888 888' />   
                            </FormGroup>
                            <FormGroup>
                                <label>Address (Optional)</label>
                                <Input type='text' name='Address' placeholder='Address' />
                            </FormGroup>
                            <Button color="primary" type="submit">Add New</Button>
                            </Form>} */}
                    </CardBody>
                </Card>
            </Col>
            <Col md="4">
                <Card>
                    <CardHeader>
                        <CardTitle tag="p">Contractor</CardTitle>
                    </CardHeader>
                    <CardBody>
                       {!contractors && <Loading />}
                        {contractors && <CheckBox data={contractors} address={false} Name={true} Title={false} placeholder={'Select Contractor'} box={'contractor'}/>}
                    </CardBody>
                </Card>
            </Col>
            <Col md="4">
                <Card>
                    <CardHeader>
                        <CardTitle tag="p">Company</CardTitle>
                    </CardHeader>
                    <CardBody>
                        {!companpies && <Loading />}
                        {companpies && <CheckBox data={companpies} address={false} Name={true} Title={false} placeholder={'Select Company'} box={'company'}/>}
                    </CardBody>
                </Card>
            </Col>
        </Row>

        <Row>
            <Col md="12">
                <Card>
                    <CardHeader style={{backgroundColor:'#2c2c2c', borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
                        <div className='invoice-product-header'>
                            <div>
                                <p>Products</p>
                            </div>
                            <div>
                                <div>
                                    <p>Price</p>
                                </div>
                                <div>
                                    <p>Quantity</p>
                                </div>
                                <div>
                                    <p>Line Total</p>
                                </div>
                                <div></div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody>
                        {!products && <Loading/>}
                        {products && <ProductSelect data={products} setQuantityUpdated={setQuantityUpdated}/>}
                    </CardBody>
                </Card>
            </Col>
        </Row>

        <Row>
            <Col md="8"></Col>
            <Col md="4">
                <Card>
                    <CardBody>
                        <Row style={{marginBottom: -20}}>
                            <Col md="6">Subtotal</Col>
                            <Col md="6">
                                <p className='text-right'>{subtotal} Rs</p>
                            </Col>
                        </Row>
                        <hr />
                        <Row style={{marginBottom: -10}}>
                            <Col md="6">Total</Col>
                            <Col md="6">
                                <p className='text-right'>{subtotal} Rs</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12" className='text-right'>
                                <Button color="primary" onClick={proceed} disabled={loading? true: false}>{loading? 'Please Wait...' : 'Proceed'}</Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </div>
    
    {addCustomer && <CreateUserPopup setaddCustomer={setaddCustomer}/>}
    {invoicePopup && <PopupInvoice setInvoicePopup={setInvoicePopup} customer={customer} contractor={contractor} selectedProducts={selectedProducts} subtotal={subtotal}/>}
</>
  )
}

export default CreateInvoice