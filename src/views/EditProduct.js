import React, { useEffect, useState } from 'react'
import Loading from 'components/Loading/Loading';
import { toast } from 'react-toastify';
import { Card, CardBody, CardHeader, CardTitle, Col, Row,  FormGroup, Form, Input, Button} from 'reactstrap'
import { useParams } from 'react-router-dom';

function EditProduct() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [companpies, setCompanies] = useState(null);
    const [loading, setLoading] = useState(false);
    const [updated, setUpdated] = useState(true);

    const fetchProducts = async() => { 
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}products`,{
            method: 'GET',
            headers:{
                'Content-Type': 'Application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        const res = await response.json()
        
        if(response.status === 200){
            const find = res.filter((obj)=> {return obj.id == id})
            setProduct(find[0])
        }
        else if(response.status === 401){
          localStorage.removeItem('token')
          window.location.reload(true)
        }
        else
          toast.error(res.message)
    }

    const onChange = ( e ) => {
        setProduct({...product, [e.target.name] : e.target.value});
        setUpdated(false)
    }

    const getCompanpies = async() =>{
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}companies`,{
            method: 'GET',
            headers: {
                'Authorization' : localStorage.getItem('token')
            }
        });
        const res = await response.json();

        if(response.status === 200)
            setCompanies(res)
        else if(response.status === 401){
            localStorage.removeItem('token')
            window.location.reload(true)
        }
        else
            toast.error(res.message)
    }

    const onSubmit = async( e ) => {
        e.preventDefault();
        setLoading(true)
        product.rates = []

        for(let i=0; i<companpies.length; i++){
            let obj = {
                company_id : companpies[i].id,
                rate: document.getElementById(`comp${companpies[i].id}`).value
            }
            product.rates.push(obj)
        }

        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}products/${product.id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'Application/json',
                'Authorization' : localStorage.getItem('token')
            },
            body: JSON.stringify(product)
        })
        const res = await response.json()
        if(response.ok){
            toast.success(res.message)
            setUpdated(true)
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

    useEffect(()=>{
        getCompanpies()
        fetchProducts()
       
    },[])
  return (
     <div className='content'>
        <Row>
            <Col md="12">
               <Card>
                    <CardHeader>
                        <CardTitle Title tag="h4">Edit Product</CardTitle>
                    </CardHeader>
                    <CardBody> 
                    {!companpies && <Loading />}
                    {companpies && product && <Form onSubmit={onSubmit}>
                        <Row>
                            <Col className="" md="12">
                            <FormGroup>
                                <label>Product Name</label>
                                <Input placeholder="Product Name" type="text" value={product.title} name="title" required onChange={onChange}/>
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="pr-1" md="4">
                            <FormGroup>
                                <label>Unit</label>
                                <Input placeholder="Unit" type="text" value={product.unit} name="unit" required onChange={onChange}/>
                            </FormGroup>
                            </Col>
                            <Col className="px-1" md="4">
                            <FormGroup>
                                <label>Quantity</label>
                                <Input placeholder="1" type="number" value={product.quantity} name="quantity" required onChange={onChange}/>
                            </FormGroup>
                            </Col>
                            <Col className="pl-1" md="4">
                            <FormGroup>
                                <label>Price</label>
                                <Input placeholder="00" type="number" value={product.price} name="price" required onChange={onChange}/>
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row style={{}}>
                            {companpies.map((company, index)=>{
                                return <Col style={{marginRight: -20}} md='2' key={company.id}>
                                    <FormGroup>
                                        <label>{company.name} Rate</label>
                                        <Input type='number' placeholder='00' id={`comp${company.id}`}  defaultValue={product.rates[index]? product.rates[index].rate: ''} required />
                                    </FormGroup>
                                </Col>
                            })}
                        </Row>
                        <Row>
                            <div style={{padding: '0px 15px'}}>
                            <Button color="primary" type="submit" disabled={loading? true : false}> {loading? 'Updating...' : 'Update'}</Button>
                            </div>
                        </Row>
                      </Form>}
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default EditProduct