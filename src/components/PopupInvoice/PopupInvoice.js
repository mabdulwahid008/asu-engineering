import { PDFDownloadLink } from '@react-pdf/renderer'
import Loading from 'components/Loading/Loading'
import PDFfile from 'components/PDFfile/PDFfile'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Row } from 'reactstrap'
import { logOut } from 'state/actions'
import { removeAllProducts } from 'state/actions'
import './PopupInvoice.css'

function PopupInvoice({setInvoicePopup, contractor_id }) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [singleContractor, setSingleContractor] = useState(null)
    const [invoice, setInvoice] = useState(null)
    const [payAmount, setPayAmount] = useState({type:0, amount:0, paid_on: '', contractor_id})

    const getSingleContractor = async( ) => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}contractors/${contractor_id}`,{
            method: 'GET',
            headers:{
                'Authorization': localStorage.getItem('token')
            }
        })
        const res = await response.json();
        
        if(response.status === 200)
            setSingleContractor(res)
        else if(response.status === 401){
            localStorage.removeItem('token')
            dispatch(logOut())
        }
        else
            toast.error(res.message)
    }

    const onChange = (e) => {
        setPayAmount({...payAmount, [e.target.name]: e.target.value})
    }
    const payContractor = async( e ) => {
        e.preventDefault()
        setLoading(true)

        payAmount.paid_on = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`

        console.log(payAmount);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}payments`,{
            method: 'POST',
            headers:{
                'Content-Type' : 'Application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(payAmount)
        })
        const res = await response.json();
        
        if(response.status === 201)
            toast.success(res.message)
        else if(response.status === 401){
            localStorage.removeItem('token')
            dispatch(logOut())
        }
        else
            toast.error(res.message)
        setLoading(false)
    }

    const invoice_id = localStorage.getItem('invoice_id')
    const fecthInvoice = async() =>{
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}invoices/${invoice_id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json',
                "Authorization" : localStorage.getItem('token')
            },
        })
        const res = await response.json()

        if(response.status === 200){
            setInvoice(res)
        }
        else if(response.status === 401){
            localStorage.removeItem('token')
            dispatch(logOut())
        }
        else
            toast.error(res.message)
    }

    const closePopup = () =>{
        localStorage.removeItem('invoice_id')
        dispatch(removeAllProducts())
        setInvoicePopup(false)
    }

    useEffect(()=>{
    },[singleContractor])

    useEffect(()=>{
        fecthInvoice()
        getSingleContractor()
    },[])
  return (
    <div className='popup'>
        <div className='overlay'></div>
        {!singleContractor && <Loading/>}
        {singleContractor && invoice && <Card className='card-popup'>
            <CardBody className='cardBody'>
                <Form onSubmit={payContractor}>
                    <Row>
                        <Col md='9'> 
                            <h5 style={{fontSize:'18px'}}>{singleContractor.name} has due balance of {singleContractor.balance}</h5>
                                <FormGroup>
                                    <label>Pay {singleContractor.name}</label>
                                    <Input type='number' name='amount' onChange={onChange} required min={0} placeholder='0'/>
                                </FormGroup>
                        </Col>
                        <Col md='3'>
                            <Button color='primary' type='submit'  disabled={loading ? true: false} style={{width: '100%'}}>Pay</Button>
                        </Col>
                    </Row>
                </Form>
                <Row>
                    <Col md='7'>
                        <PDFDownloadLink document={<PDFfile invoice={invoice}/> } fileName="invoice">
                            {({loading}) => (<Button color='primary' style={{width:'100%'}}>{loading? 'Generating' : 'Download PDF'}</Button> )}
                        </PDFDownloadLink>
                    </Col>
                    <Col md='5'>
                        <Button color='primary' style={{width: '100%'}}>Print Invoice</Button>
                    </Col>
                </Row>
            </CardBody>
            <i className='nc-icon nc-simple-remove' onClick={closePopup}/>
        </Card>}
        {invoice && <div style={{display:'none'}}>
            <PDFfile invoice={invoice}/>
        </div>}
    </div>
  )
}

export default PopupInvoice