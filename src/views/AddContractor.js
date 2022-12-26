import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Card, CardBody, CardHeader, CardTitle, Col, Row,  FormGroup, Form, Input, Button} from 'reactstrap'

function AddContractor() {
    const [loading, setLoading] = useState(false)
    const [contractor, setContractor] = useState({name: '', phone: '', balance: '', address: null})

    const onChange = ( e ) => {
        setContractor({...contractor, [e.target.name]: e.target.value})
    }

    const onSubmit = async( e ) => {
        e.preventDefault();
        setLoading(true);

        if(contractor.phone.length !== 11){
            toast.error('Please enter correct phone number')
            setLoading(false);
            return;
        }

        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}contractors`,{
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                'Authorization' : localStorage.getItem('token')
            },
            body: JSON.stringify(contractor)
        })
        const res = await response.json()
       
        if(response.ok){
            setContractor({name: '', phone: 0, balance: '', address: ''})
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
                        <CardTitle tag="h4">Add Contractor</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md="7">
                               <Form onSubmit={onSubmit}>
                                    <Row>
                                        <Col className="" md="12">
                                            <FormGroup>
                                                <label>Contractor Name</label>
                                                <Input placeholder="Contractor Name" type="text" Value={contractor.name} name="name" required onChange={onChange}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="" md="6">
                                            <FormGroup>
                                                <label>Phone</label>
                                                <Input placeholder="0300 0000000" type="number" Value={contractor.phone} name="phone" required onChange={onChange}/>
                                            </FormGroup>
                                        </Col>
                                        <Col className="" md="6">
                                            <FormGroup>
                                                <label>Balance</label>
                                                <Input placeholder="0" type="number" name="balance" Value={contractor.balance} required onChange={onChange}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="" md="12">
                                            <FormGroup>
                                                <label>Address (Optional)</label>
                                                <Input placeholder="Address" type="text" Value={contractor.address} name="address" onChange={onChange}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                        <Button color="primary" type="submit" disabled={loading? true : false}> {loading? 'Please Wait...' : 'Add Contractor'}</Button>
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

export default AddContractor