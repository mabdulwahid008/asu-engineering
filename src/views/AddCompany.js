import React, { useState } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Col, Row,  FormGroup, Form, Input, Button} from 'reactstrap'
import { toast } from 'react-toastify';

function AddCompany() {
    const [company, setCompany] = useState({name: '', address: null})
    const [loading, setLoading] = useState(false)
    
    const onChange = ( e ) => {
        setCompany({...company, [e.target.name]: e.target.value})
    }
    const onSubmit = async( e ) => {
        e.preventDefault();
        setLoading(true)

        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}companies`,{
            method: 'POST',
            headers:{
                'Content-Type': 'Application/json',
                'Authorization' : localStorage.getItem('token')
            },
            body: JSON.stringify(company)
        })
        const res = await response.json();

        if(response.ok){
            toast.success(res.message)
            setCompany({name: '', address: ''})
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
  return (<>
    <div className='content'>
        <Row>
            <Col md="12">
                <Card>
                    <CardHeader>
                        <CardTitle Title tag="h4">Add Company</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col md="7">
                                <Form onSubmit={onSubmit}>
                                    <FormGroup>
                                        <label>Name</label>
                                        <Input type='text' name='name' placeholder='Company Name' required onChange={onChange}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <label>Address (Optional)</label>
                                        <Input type='text' name='address' placeholder='Address' onChange={onChange}/>
                                    </FormGroup>
                                    <Button color="primary" type="submit" disabled={loading? true : false} >{loading? 'Please Wait...': 'Add Company'}</Button>
                                </Form>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </div>
     </>
  )
}

export default AddCompany