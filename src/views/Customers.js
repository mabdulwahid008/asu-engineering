import Loading from 'components/Loading/Loading'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row, Table } from 'reactstrap'
import { logOut } from 'state/actions'
import { FaRegEdit, FaTrash } from "react-icons/fa";

function Customers() {
    const [customers, setCustomers] = useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch= useDispatch()

    const deleteCustomer = async( id ) => {
        setLoading(true)
        document.getElementById(`row${id}`).style.backgroundColor = 'rgba(222, 222, 222, 0.3)'
  
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}customers/${id}`,{
          method: 'DELETE',
          headers: {
            'Content-Type': 'Application/json',
            'Authorization' : localStorage.getItem('token')
          }
        })
        const res = await response.json();
        if(response.ok){
          const newCustomers = customers.filter((p)=> {return p.id !== id})
          setCustomers(newCustomers);
          toast.success(res.message)
        }
        else if(response.status === 401){
          localStorage.removeItem('token')
          dispatch(logOut())
        }
        else{
          toast.error(res.message)
          document.getElementById(`row${id}`).style.backgroundColor = 'white'
        }
        setLoading(false)
    }

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

    useEffect(()=>{
        fetchCustomers()
    }, [])
  return (
    <div className='content'>
         <Row>
            <Col>
                <Card>
                    <CardHeader  style={{display:'flex', justifyContent: 'space-between'}}>
                        <CardTitle tag="h4">Customers</CardTitle>
                        <Link to='add-customer'><Button color="primary">Add New </Button></Link>
                    </CardHeader>
                    <CardBody>
                        {!customers && <Loading />}
                       {customers && <Table>
                            <thead className="text-primary">
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th style={{width:"50%"}}>Address</th>
                                    <th>Phone</th>
                                    <th>Added on</th>
                                    <th >Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map((customer, index)=>{
                                    return <tr key={customer.id} id={`row${customer.id}`}>
                                            <td>{index+1}</td>
                                            <td>{customer.name}</td>
                                            <td>{customer.address? customer.address : '-----'}</td>
                                            <td>{customer.phone? customer.phone: '-----'}</td>
                                            <td>{customer.created_at.substr(0,10)}</td>
                                            <td className='actions' style={{}}>
                                                <Link to={`edit-customer/${customer.id}`}><FaRegEdit/> </Link>
                                                <FaTrash onClick={!loading?()=>deleteCustomer(customer.id): ''}/>
                                            </td>
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

export default Customers