import React, { useState } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Col, Row,  FormGroup, Form, Input, Button} from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { logOut } from 'state/actions';

function AddCompany() {
    const [company, setCompany] = useState({name: ''})
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    
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
            setCompany({name: ''})
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
                                    <Button color="primary" type="submit" disabled={loading? true : false} >{loading? 'Please Wait...': 'Add Company'}</Button>
                                </Form>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </div>
     <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
     </>
  )
}

export default AddCompany