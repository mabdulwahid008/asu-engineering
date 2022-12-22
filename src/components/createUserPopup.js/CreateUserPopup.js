import React from 'react'
import './CreateUserPopup.css'
import { Button, Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input } from 'reactstrap'

function CreateUserPopup({ setaddCustomer }) {
  return (
    <div className='user-popup'>
        <div className='overlay'></div>
            <Card className='card-popup'>
                    <CardHeader style={{display:'flex', justifyContent: 'space-between', alignItems:'center'}}>
                        <CardTitle tag='h4' style={{marginTop: 0}}>Add Customer</CardTitle>
                        <i className='nc-icon nc-simple-remove' onClick={()=> setaddCustomer(false)}/>
                    </CardHeader>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <label>Name</label>
                            <Input type='text' name='name' placeholder='Name' />
                        </FormGroup>
                        <FormGroup>
                            <label>Phone</label>
                            <Input type='number' id='phone' name='phone' placeholder='12 7888 888' />   
                        </FormGroup>
                        <FormGroup>
                            <label>Address (Optional)</label>
                            <Input type='text' name='Address' placeholder='Address' />
                        </FormGroup>
                        <Button color="primary" type="submit">Add New</Button>
                    </Form>
                </CardBody>
            </Card>
    </div>
  )
}

export default CreateUserPopup