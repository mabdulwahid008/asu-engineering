import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Card, CardBody, CardHeader, CardTitle, Col, Row,  FormGroup, Form, Input, Button} from 'reactstrap'

function AddCustomer() {
    const [loading, setLoading] = useState(false)
    const [customer, setcustomer] = useState({name: '', phone: 0, address: ''})
    
    const onChange = ( e ) => {
        setcustomer({...customer, [e.target.name]: e.target.value})
    }

    const onSubmit = async( e ) => {
        e.preventDefault();
        setLoading(true);

        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}customers`,{
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                'Authorization' : localStorage.getItem('token')
            },
            body: JSON.stringify(customer)
        })
        const res = await response.json()
       
        if(response.ok){
            setcustomer({name: '', phone: 0, balance: ''})
            toast.success(res.message)
        }
        else if(response.status === 401){
            localStorage.removeItem('token')
            window.location.reload(true)
        }
        else{
            toast.error(res.message)
        }
        setLoading(false)
    }
  return (
    <div className='content'>
      <Row>
        <Col md="12">
            <Card>
                <CardHeader>
                    <CardTitle tag="h4">Add Customer</CardTitle>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col md="7">
                            <Form onSubmit={onSubmit}>
                                <Row>
                                    <Col className="" md="12">
                                        <FormGroup>
                                            <label>Customer Name</label>
                                            <Input placeholder="Customer Name" type="text" name="name" required onChange={onChange}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <FormGroup>
                                            <label>Phone</label>
                                            <Input placeholder="0300 0000000" type="number" name="phone" required onChange={onChange}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <FormGroup>
                                            <label>Address (Optional)</label>
                                            <Input placeholder="Address" type="text" name="address" onChange={onChange}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Button color="primary" type="submit" disabled={loading? true : false}> {loading? 'Please Wait...' : 'Add Customer'}</Button>
                            </Form>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Col>
    </Row>
    </div>
  )
}

export default AddCustomer