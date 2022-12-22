import Loading from 'components/Loading/Loading'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Card, CardBody, CardHeader, CardTitle, Col, Row,  FormGroup, Form, Input, Button} from 'reactstrap'
import { logOut } from 'state/actions'

function EditCustomers() {
    const [loading, setLoading] = useState(false)
    const [customer, setCustomer] = useState(null)
    const { id } = useParams()
    const dispatch = useDispatch()

    const getCustomers = async() =>{
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}customers`,{
            method: 'GET',
            headers: {
                'Authorization' : localStorage.getItem('token')
            }
        });
        const res = await response.json();
    
        if(response.status === 200){
            const find = res.filter((obj)=> {return obj.id == id})
          setCustomer(find[0])
        }
        else if(response.status === 401){
            localStorage.removeItem('token')
            dispatch(logOut())
        }
        else{}
            toast.error(res.message)  
    
    }


    const onChange = ( e ) => {
        setCustomer({...customer, [e.target.name]: e.target.value});
        console.log(customer);
    }

    const onSubmit = async( e ) => {
        e.preventDefault();
        setLoading(true)
        console.log(customer);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}customers/${customer.id}`,{
          method: 'PUT',
          headers: {
              'Content-Type': 'Application/json',
              'Authorization' : localStorage.getItem('token')
          },
          body: JSON.stringify(customer)
        })
        const res = await response.json()
        if(response.ok){
            toast.success(res.message)
        }
        else if(response.status === 401){
            localStorage.removeItem('token')
            dispatch(logOut())
        }
        else{
            toast.error(res.message)
        }
        
        setLoading(false)
    }

    useEffect(()=>{
        getCustomers()
    },[])
    
  return (
    <div className='content'>
       <Row>
        <Col md="12">
            <Card>
                <CardHeader>
                    <CardTitle tag="h4">Edit customer</CardTitle>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col md="7">
                            {!customer && <Loading />}
                             {customer && <Form onSubmit={onSubmit}>
                                <Row>
                                    <Col className="" md="12">
                                        <FormGroup>
                                            <label>Customer Name</label>
                                            <Input placeholder="Customer Name" type="text" defaultValue={customer.name} name="name" required onChange={onChange}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <FormGroup>
                                            <label>Phone</label>
                                            <Input placeholder="0300 0000000" type="number"  defaultValue={customer.phone? +customer.phone: +''} name="phone" required onChange={onChange}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <FormGroup>
                                            <label>Address (Optional)</label>
                                            <Input placeholder="Address" type="text"  defaultValue={customer.address} name="address" onChange={onChange}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Button color="primary" type="submit" disabled={loading? true : false}> {loading? 'Please Wait...' : 'Update'}</Button>
                            </Form>}
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Col>
    </Row>
    </div>
  )
}

export default EditCustomers