import Loading from 'components/Loading/Loading'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Input, Row, Table } from 'reactstrap'
import { BsArrowUpRight, BsArrowDownLeft } from "react-icons/bs";
import PayPopup from 'components/PayPopup/PayPopup'
import ReactSelect from 'react-select'

function Payments() {
    const [payments, setPayments] = useState(null)
    const [popup, setPopup] = useState(false)
    const from = `${new Date().getFullYear()}-${new Date().getMonth()+1}-1`
    const to =`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`

    const [filterPayments, setfilterPayments] = useState({fromDate: from, toDate: to, type:''})

    const onChange =( e ) => {
        if(e.target.value !== '')
            setfilterPayments({...filterPayments, [e.target.name]: e.target.value})
        if(e.target.name === 'fromDate' && e.target.value === ''){
            filterPayments.fromDate = from
        }
        if(e.target.name ==+ 'toDate' && e.target.value === '')
            filterPayments.toDate = to
    } 
    const onChangeType =( value ) => {
        filterPayments.type = value.value
    } 
    

    const filterPayment = ( e ) => {
        e.preventDefault();
        setPayments(null)
        fetchPaymemts()
    }

    const fetchPaymemts = async() => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}payments?from=${filterPayments.fromDate}&to=${filterPayments.toDate}&type=${filterPayments.type}`,{
            method: 'GET',
            headers:{
                'Content-Type': 'Application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        const res = await response.json()
        
        if(response.status === 200){
            setPayments(res)
        }
        else if(response.status === 401){
          localStorage.removeItem('token')
          window.location.reload(true)
        }
        else
          toast.error(res.message)
    }

    useEffect(() => {
      fetchPaymemts()
    }, [])
    
  return (<>
    <div className='content'>
        <Row>
            <Col md='12'>
                <Card>
                    <CardHeader>
                        <CardTitle tag='h4'>Payments</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Row style={{display:'flex', justifyContent: 'space-between', alignItems:'flex-end'}}>
                            <Col md='7'>
                                <Form onSubmit={filterPayment}>
                                    <Row style={{alignItems:'flex-end'}}>
                                        <Col md='3' style={{paddingRight:5}}>
                                            <FormGroup>
                                                <label>From</label>
                                                <Input type='date' name='fromDate' onChange={onChange}/>
                                            </FormGroup>
                                        </Col>
                                        <Col md='3' style={{paddingLeft:0, paddingRight:5}}>
                                            <FormGroup>
                                                <label>To</label>
                                                <Input type='date' name='toDate' onChange={onChange}/>
                                            </FormGroup>
                                        </Col>
                                        <Col md='3' style={{paddingLeft:0, paddingRight:5}}>
                                            <FormGroup style={{display: 'flex', flexDirection: 'column'}}>
                                                <label>Type</label>
                                                <ReactSelect options={[{value:0, label: 'Contractor'},{value:1, label: 'Company'}]} onChange={onChangeType}/>
                                            </FormGroup>
                                        </Col>
                                        <Col md='1' style={{paddingLeft:0}}>
                                            <Button >Filter</Button>
                                        </Col> 
                                    </Row>
                                </Form>
                            </Col>
                            <Col md='5' style={{display:'flex', gap:10, justifyContent:'flex-end'}}>
                                <Button color='danger' onClick={()=>{localStorage.setItem('id', 0); setPopup(true)}}>Pay Contractor</Button>
                                <Button color='success' onClick={()=>{localStorage.setItem('id', 1); setPopup(true)}}>Received a payment</Button>
                            </Col>

                        </Row>
                         
                        {!payments && <Loading/>}
                        {payments && payments.length === 0 && <p>No data found</p>}
                       {payments && payments.length !== 0 && <>
                       <Table>
                            <thead className='text-primary'>
                                <tr>
                                    <th ></th>
                                    <th>Payment ID</th>
                                    <th>Amount</th>
                                    <th>To / From</th>
                                    <th>Paid On</th>
                                    <th style={{width: '30%'}}>Comments</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((payment)=>{
                                    return <tr key={payment.id}>
                                            <td>{payment.type === 0 ? <BsArrowUpRight  style={{fontSize: '18px', color:'#ef8157'}}/> : <BsArrowDownLeft  style={{fontSize: '18px', color:'#6bd098'}}/>}</td>
                                            <td>ASU-{payment.id}</td>
                                            <td>{payment.amount}</td>
                                            <td>{payment.type === 0 ? payment.contractor.name : payment.company.name}</td>
                                            <td>{payment.paid_on}</td>
                                            <td>{payment.comment ? payment.comment :'-----'}</td>
                                        </tr>
                                })}
                            </tbody>
                        </Table>
                        
                        </>}
                        
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </div>
    {popup && <PayPopup setPopup={setPopup}/>}
  </>)
}

export default Payments