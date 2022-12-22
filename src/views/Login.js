import React, { useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Input, Row } from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { loggIn } from 'state/actions';

function Login() {
    const [logins, setlogins] = useState({email: '', password: ''});
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const onChange = ( e ) =>{
        setlogins({...logins, [e.target.name]: e.target.value});
    }
    const onSubmit = async ( e ) => {
        e.preventDefault();
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}login`,{
            method: 'POST',
            headers:{
                'Content-Type' : 'Application/json'
            },
            body: JSON.stringify(logins)
        });
        const res = await response.json();

        if(!res.error){
            dispatch(loggIn())
            localStorage.setItem('token', res.token_type+res.access_token)
        }
        if(res.error)
            toast.error(res.error)
        setlogins({email: '', password: ''})
        setLoading(false);
    }
  return (<>
    <div >
        <Row style={{display:'flex', justifyContent: 'center', alignItems:'center', overflow: 'hiden', height: 627, width: '100%', background: '#f4f3ef'}}>
            <Col md="4">
                <Card>
                    <CardHeader>
                        <CardTitle tag="h4">Login</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form onSubmit={onSubmit}>
                            <Row>
                                <Col md="12">
                                    <FormGroup>
                                        <label>Username</label>
                                        <Input placeholder="Username" type="text" name='email' value={logins.email} required onChange={onChange}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <FormGroup>
                                        <label>Password</label>
                                        <Input placeholder="Password" type="password"  name="password" value={logins.password} required onChange={onChange}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <div style={{padding:'0px 15px'}}>
                                    <Button color="primary" type="submit" disabled={loading? true: false}>{loading? 'Please Wait...' :  'Login'}</Button>
                                </div>
                            </Row>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </div>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </>
    )
}

export default Login