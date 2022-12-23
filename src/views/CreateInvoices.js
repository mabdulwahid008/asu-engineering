import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Row } from 'reactstrap'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from 'state/actions'
import { toast } from 'react-toastify'
import { SelectProduct } from 'state/actions'
import ProductSelect from 'components/ProductSelect/ProductSelect'
import PopupInvoice from 'components/PopupInvoice/PopupInvoice'


function CreateInvoices() {
    const dispatch = useDispatch()
    const selectedProducts = useSelector(state => state.invoiceProducts)

    // for getting values from APIs
    const [customers, setCustomers] = useState(null)
    const [companies, setCompanies] = useState(null);
    const [contractors, setContractors] = useState(null)
    const [products, setProducts] = useState(null)

    // for seting options
    const [customerOptions, setCustomerOptions] = useState(null)
    const [contractorOptions, setContractorOptions] = useState(null)
    const [companyOptions, setCompanyOptions] = useState(null)
    const [productOptions, setProductOptions] = useState(null)
    
    // for invoice
    const [invoice, setinvoice] = useState({})

    // for proceed button
    const [loading, setLoading] = useState(false)

    // for selected product quantity 
    const [quantityUpdated, setQuantityUpdated] = useState(false)

    // subtottals
    const [subtotal, setSubtotal] = useState(0)

    // for showing popup after posting 
    const [invoicePopup, setInvoicePopup] = useState(false)

    // fetching APIs
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

    // onChange
    const onChangeCustomer = ( value ) => {
        invoice.customer = value.value
    }
    const onChangeContractor = ( value ) => {
        invoice.contractor = value.value
    }
    const onChangeCompany = ( value ) => {
        invoice.company = value.value
    }
    const onChangeProduct = ( product ) => {
        product.value.selectedQuantity = 1
        dispatch(SelectProduct(product.value))
    }

    // create invoice 
    const proceed = async(e) =>{
        e.preventDefault()
        setLoading(true)
        if(invoice.customer === undefined){
            toast.error('Please select customer')
            setLoading(false)
            return;
        }
        else if(invoice.contractor === undefined){
            toast.error('Please select contractor')
            setLoading(false)
            return;
        }
        else if(invoice.company === undefined){
            toast.error('Please select company')
            setLoading(false)
            return;
        }
        else if(selectedProducts.length === 0){
            toast.error('Please select products')
            setLoading(false)
            return;
        }
        else{
            const Invoice = {
                customer_id: invoice.customer, 
                company_id: invoice.company, 
                contractor_id: invoice.contractor, 
                items:[]
            }
            for (let i = 0; i < selectedProducts.length; i++) {
                const obj = {
                    id : selectedProducts[i].id,
                    quantity: selectedProducts[i].selectedQuantity,
                }
                Invoice.items.push(obj)
            }
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}invoices`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                    "Authorization" : localStorage.getItem('token')
                },
                body: JSON.stringify(Invoice)
            })
            const res = await response.json()

            if(response.ok){
                toast.success(res.message)
                console.log(res);
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

    useEffect(()=>{
        setQuantityUpdated(false)
        let total = 0;
        for (let i = 0; i < selectedProducts.length; i++) {
           total += selectedProducts[i].selectedQuantity * selectedProducts[i].price
        }
        setSubtotal(total)
    }, [quantityUpdated, selectedProducts])

    useEffect(()=>{
        let customer = []
        if(customers){
            for(let i = 0; i < customers.length; i++){
                let obj = {
                    value : customers[i].id,
                    label: customers[i].name
                }
                customer.push(obj)
            }
            setCustomerOptions(customer)
        }
        
        let contractor = []
        if(contractors){
            for(let i = 0; i < contractors.length; i++){
                let obj = {
                    value : contractors[i].id,
                    label: contractors[i].name
                }
                contractor.push(obj)
            }
            setContractorOptions(contractor)
        }

        let company = []
        if(companies){
            for(let i = 0; i < companies.length; i++){
                let obj = {
                    value : companies[i].id,
                    label: companies[i].name
                }
                company.push(obj)
            }
            setCompanyOptions(company)
        }

        let product = []
        if(products){
            for(let i = 0; i < products.length; i++){
                let obj = {
                    value : products[i],
                    label: products[i].title
                }
                product.push(obj)
            }
            setProductOptions(product)
        }
    }, [customers, companies, contractors])

    useEffect(() => {
        fetchCustomers();
        getCompanpies();
        getContractors();
        fetchProducts();
        
    }, [])
  return (<>
    <div className='content'>
        <Form onSubmit={proceed}>
            <Row>
                <Col md='4'>
                    <Card>
                        <CardBody style={{paddingBottom: '2px'}}>
                            <FormGroup>
                                <label>Customer</label>
                                {customerOptions && <Select options={customerOptions} name='customer' onChange={onChangeCustomer}/>}
                            </FormGroup>
                        </CardBody>
                    </Card>
                </Col>
                <Col md='4'>
                    <Card>
                        <CardBody style={{paddingBottom: '2px'}}>
                            <FormGroup>
                                <label>Contractor</label>
                                {contractorOptions && <Select options={contractorOptions}  onChange={onChangeContractor}/>}
                            </FormGroup>
                        </CardBody>
                    </Card>
                </Col>
                <Col md='4'>
                    <Card>
                        <CardBody style={{paddingBottom: '2px'}}>
                            <FormGroup>
                                <label>Company</label>
                                {companyOptions && <Select options={companyOptions} onChange={onChangeCompany}/>}
                            </FormGroup>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md='12'>
                    <Card>
                        <CardHeader style={{backgroundColor:'#2c2c2c', borderTopLeftRadius: 10, borderTopRightRadius: 10, paddingTop: '0px'}}>
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
                            <ProductSelect setQuantityUpdated={setQuantityUpdated}/>
                            <div className='inovice-product'>
                                <div>
                                    {productOptions && <Select options={productOptions} onChange={onChangeProduct}/>}
                                </div>
                                <div className='product-data'>
                                    <div>
                                        <p></p>
                                    </div>
                                    <FormGroup>
                                        <Input className='quantity-update' type='number'  disabled/>
                                    </FormGroup>
                                    <div>
                                        <p></p>
                                    </div>
                                    <div className='actions'>
                                    
                                    </div>
                                </div>
                            </div>
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
                                    <Button color="primary" disabled={loading? true: false}>{loading? 'Please Wait...' : 'Proceed'}</Button>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Form>
    </div>
    {invoicePopup && <PopupInvoice setInvoicePopup={setInvoicePopup} />}
</>
  )
}

export default CreateInvoices