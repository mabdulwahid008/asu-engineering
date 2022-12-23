import { PDFDownloadLink } from '@react-pdf/renderer'
import PDFfile from 'components/PDFfile/PDFfile'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Row } from 'reactstrap'
import { removeContractor } from 'state/actions'
import { removeCompany } from 'state/actions'
import { removeCustomer } from 'state/actions'
import { removeAllProducts } from 'state/actions'
import './PopupInvoice.css'

function PopupInvoice({ setInvoicePopup, customer, contractor, selectedProducts, subtotal }) {
    const dispatch = useDispatch()
    const [buttonDisable, setbuttonDisable] = useState(false)

    const closePopup = () =>{
        dispatch(removeAllProducts())
        dispatch(removeCustomer())
        dispatch(removeContractor())
        dispatch(removeCompany())
        setInvoicePopup(false)
    }
  return (
    <div className='popup'>
        <div className='overlay'></div>
        <Card className='card-popup'>
            <CardBody className='cardBody'>
                <Row>
                    <Col md='9'> 
                        {/* <p>{contractor.name} has due balance of 'balance'</p> */}
                        <Form>
                            <FormGroup>
                                <label>Enter Amount</label>
                                <Input type='number' required min={0} defaultValue={0}/>
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col md='3'>
                        <Button color='primary' style={{width: '100%'}}>Pay</Button>
                    </Col>
                </Row>
                <Row>
                    <Col md='7'>
                        {/* <PDFDownloadLink document={<PDFfile customer={customer} contractor={contractor} selectedProducts={selectedProducts} subtotal={subtotal}/> } fileName="invoice">
                            {({loading}) => (<Button color='primary' style={{width:'100%'}} disabled={buttonDisable ? true: false}>{loading? 'Generating' : 'Download PDF'}</Button> )}
                        </PDFDownloadLink> */}
                    </Col>
                    <Col md='5'>
                        <Button color='primary' disabled={buttonDisable ? true: false} style={{width: '100%'}}>Print PDF</Button>
                    </Col>
                </Row>
            </CardBody>
            <i className='nc-icon nc-simple-remove' onClick={closePopup}/>
        </Card>
        <div style={{display:'none'}}>
            {/* <PDFfile customer={customer} contractor={contractor} selectedProducts={selectedProducts}/> */}
        </div>
    </div>
  )
}

export default PopupInvoice