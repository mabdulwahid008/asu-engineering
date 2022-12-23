import React, { useState } from 'react'
import './CreateUserPopup.css'
import { Button, Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { logOut } from 'state/actions'
import { toast } from 'react-toastify'

function CreateUserPopup({ setaddCustomer }) {
    const [loading, setLoading] = useState(false)
    const [customer, setcustomer] = useState({name: '', phone: 0, address: ''})
    const dispatch = useDispatch()
    
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
            dispatch(logOut())
        }
        else{
            toast.error(res.message)
        }
        setLoading(false)
    }
  return (
    <div className='user-popup'>
        <div className='overlay'></div>
            <Card className='card-popup'>
                    <CardHeader style={{display:'flex', justifyContent: 'space-between', alignItems:'center'}}>
                        <CardTitle tag='h4' style={{marginTop: 0}}>Add Customer</CardTitle>
                        <i className='nc-icon nc-simple-remove' onClick={()=> setaddCustomer(false)}/>
                    </CardHeader>
                <CardBody>
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <label>Name</label>
                            <Input type='text' name='name' placeholder='Name' required onChange={onChange}/>
                        </FormGroup>
                        <FormGroup>
                            <label>Phone</label>
                            <Input type='number' id='phone' name='phone' placeholder='12 7888 888' required onChange={onChange}/>   
                        </FormGroup>
                        <FormGroup>
                            <label>Address (Optional)</label>
                            <Input type='text' name='Address' placeholder='Address' onChange={onChange}/>
                        </FormGroup>
                        <Button color="primary" type="submit" disabled={loading? true : false}> {loading? 'Please Wait...' : 'Add Customer'}</Button>
                    </Form>
                </CardBody>
            </Card>
    </div>
  )
}

export default CreateUserPopup