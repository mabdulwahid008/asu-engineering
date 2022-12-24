import Loading from 'components/Loading/Loading'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Card, CardBody, CardHeader, CardTitle, Col, Row, Table } from 'reactstrap'
import { logOut } from 'state/actions'
import { BsArrowUpRight, BsArrowDownLeft } from "react-icons/bs";

function Payments() {
    const dispatch = useDispatch()
    const [payments, setPayments] = useState(null)

    const fetchPaymemts = async() => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}payments`,{
            method: 'GET',
            headers:{
                'Content-Type': 'Application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        const res = await response.json()
        
        if(response.status === 200){
            setPayments(res)
            console.log(res);
        }
        else if(response.status === 401){
          localStorage.removeItem('token')
          dispatch(logOut())
        }
        else
          toast.error(res.message)
    }

    useEffect(() => {
      fetchPaymemts()
    }, [])
    
  return (
    <div className='content'>
        <Row>
            <Col md='12'>
                <Card>
                    <CardHeader>
                        <CardTitle tag='h4'>Payments</CardTitle>
                    </CardHeader>
                    <CardBody>
                        {!payments && <Loading/>}
                       {payments && <Table>
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
                                    return <tr>
                                            <td>{payment.type === 0 ? <BsArrowDownLeft  style={{fontSize: '18px', color:'#6bd098'}}/> : <BsArrowUpRight  style={{fontSize: '18px', color:'#ef8157'}}/>}</td>
                                            <td>ASU-{payment.id}</td>
                                            <td>{payment.amount}</td>
                                            <td>{payment.type === 0 ? 'company' : 'contractor'}</td>
                                            <td>{payment.paid_on}</td>
                                            <td>{payment.comment ? payment.comment :'-----'}</td>
                                        </tr>
                                })}
                            </tbody>
                        </Table>}
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default Payments