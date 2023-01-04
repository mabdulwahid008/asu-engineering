import Loading from 'components/Loading/Loading'
import React, { useEffect, useState } from 'react'
import ReactSelect from 'react-select'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Input, Row } from 'reactstrap'

function PayPopup({ setPopup, setPaymentAdded }) {
    let id = localStorage.getItem('id');

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const [options, setOptions] = useState(null)
    const [disable, setDisable] = useState(true)
    const [payAmount, setPayAmount] = useState({type: id, amount: '',  paid_on: '' })

    const getCompanies = async() => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}companies`,{
            method: 'GET',
            headers: {
                'Authorization' : localStorage.getItem('token')
            }
        });
        const res = await response.json();

        if(response.status === 200){
            setData(res)
        }
        else if(response.status === 401){
            localStorage.removeItem('token')
            window.location.reload(true)
        }
        else
            toast.error(res.message)
    }

    const getContractors = async() => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}contractors`,{
            method: 'GET',
            headers:{
                'Content-Type': 'Application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        const res = await response.json();
        
        if(response.status === 200)
            setData(res)
        else if(response.status === 401){
            localStorage.removeItem('token')
            window.location.reload(true)
        }
        else
            toast.error(res.message)
    }

    const onChange = ( value ) => {
        if(payAmount.type == 0)
            payAmount.contractor_id = value.value 
        if(payAmount.type == 1)
            payAmount.company_id = value.value 
    }

    const onChangeAmount = ( e ) => {
        setPayAmount({...payAmount, [e.target.name]: e.target.value})
    }

    const onSubmit = async(e) => { 
        e.preventDefault();
        setLoading(true)

        if(payAmount.type == 0 && payAmount.contractor_id === null){
            toast.error('Please Select Contractor')
            setLoading(false)
            return;
        }
        if(payAmount.type == 1 && payAmount.company_id === null){
            toast.error('Please Select Company')
            setLoading(false)
            return;
        }

        payAmount.paid_on = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`

        console.log(payAmount);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}payments`,{
            method: 'POST',
            headers:{
                'Content-Type' : 'Application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(payAmount)
        })
        const res = await response.json();
        
        if(response.status === 201){
            setPaymentAdded(true)
            toast.success(res.message)
        }
        else if(response.status === 401){
            localStorage.removeItem('token')
            window.location.reload(true)
        }
        else
            toast.error(res.message)

        setLoading(false)

    }

    useEffect(()=>{
        let option = []
        if(data){
            for (let i = 0; i < data.length; i++) {
                let obj = {
                    value: data[i].id,
                    label: data[i].name,
                }
                option.push(obj)
            }
            setOptions(option)
        }
    }, [data])

    useEffect(()=>{
            if(id == 0)
                getContractors()
            if(id == 1)
                getCompanies()
    }, [])
  return (
    <div className='popup'>
        <div className='overlay'></div>
        <Card className='card-popup'>
            <CardHeader style={{display:'flex', justifyContent: 'space-between', alignItems:'center', paddingTop: 0}}>
                <CardTitle tag='h5'>{id == 0 ? 'Pay a Contractor' : 'Received a Payment'}</CardTitle>
                <i className='nc-icon nc-simple-remove' onClick={()=>{setPopup(false)}}/>
            </CardHeader>
            <CardBody className='cardbody'>
                {!options && <Loading />}
               {options && <Form onSubmit={onSubmit}>
                   <Row>
                       <Col md='12' style={{paddingRight: 0}}>
                            <ReactSelect options={options} onChange={onChange}/>
                       </Col>
                   </Row>
                    {id == 1 && <Row style={{alignItems:'flex-end', paddingTop: 10}}>
                        <Col md='9'>
                            <FormGroup>
                                <label>Amount</label>
                                <Input type='number' placeholder='0' required name='amount' onChange={onChangeAmount}/>
                            </FormGroup>
                        </Col>
                        <Col md='3' style={{paddingLeft: 0}}>
                            <Button  color='primary' disabled={loading? true: false}>{id == 0 ? 'Pay' : 'Received'}</Button>
                        </Col>
                    </Row>}
                    {id == 0 && <Row style={{alignItems:'flex-end', paddingTop: 10}}>
                        <Col md='10'>
                            <FormGroup>
                                <label>Amount</label>
                                <Input type='number' placeholder='0' required name='amount' onChange={onChangeAmount}/>
                            </FormGroup>
                        </Col>
                        <Col md='2' style={{paddingLeft: 0}}>
                            <Button  color='primary' disabled={loading? true: false}>{id == 0 ? 'Pay' : 'Received'}</Button>
                        </Col>
                    </Row>}
                </Form>}
            </CardBody>
        </Card>
    </div>
  )
}

export default PayPopup