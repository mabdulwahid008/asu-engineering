import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Card, CardBody, CardHeader, CardTitle, Col, Row,  FormGroup, Form, Input, Button} from 'reactstrap'
import { logOut } from 'state/actions'

function AddContractor() {
    const [loading, setLoading] = useState(false)
    const [contractor, setContractor] = useState({name: '', phone: 0, balance: ''})
    const dispatch = useDispatch()

    const onChange = ( e ) => {
        setContractor({...contractor, [e.target.name]: e.target.value})
        console.log(contractor);
    }

    const onSubmit = async( e ) => {
        e.preventDefault();
        setLoading(true);

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
            setContractor({name: '', phone: 0, balance: ''})
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