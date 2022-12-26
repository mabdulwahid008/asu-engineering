import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Input, Row } from 'reactstrap';
import Loading from 'components/Loading/Loading';
import { toast } from 'react-toastify';

function EditCompany() {
  const [company, setCompany] = useState(null)
  const [loading, setLoading] = useState(false)
  const [updated, setUpdated] = useState(true);
  const { id } = useParams();

  const getCompanpies = async() =>{
    const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}companies`,{
        method: 'GET',
        headers: {
            'Authorization' : localStorage.getItem('token')
        }
    });
    const res = await response.json();

    if(response.status === 200){
      const find = res.filter((obj)=> {return obj.id == id})
      setCompany(find[0])
    }
    else if(response.status === 401){
        localStorage.removeItem('token')
        window.location.reload(true)
    }
    else{}
        toast.error(res.message)  

  }

  const onChange = ( e ) => {
    setCompany({...company, [e.target.name]: e.target.value})
    setUpdated(false)
  }

  const onSubmit = async( e ) => {
    e.preventDefault();
    setLoading(true)
    setUpdated(true)
    console.log(company);
    const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}companies/${company.id}`,{
      method: 'PUT',
      headers: {
          'Content-Type': 'Application/json',
          'Authorization' : localStorage.getItem('token')
      },
      body: JSON.stringify(company)
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
    
    if(!updated){
      return(()=>{
          toast.warn('Leaving this page will not save changes')
      })
  }
  }, [updated])

  return (<>
    <div className='content'>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle  tag="h4">Edit Company</CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md="7">
                  {!company && <Loading/>}
                  {company && company.length !== 0 && <Form onSubmit={onSubmit}>
                    <FormGroup>
                      <label>Name</label>
                      <Input type='text' name='name' placeholder='Company Name' defaultValue={company.name} required onChange={onChange} />
                    </FormGroup>
                    <FormGroup>
                      <label>Address (Optional)</label>
                      <Input type='text' name='address' placeholder='Address' defaultValue={company.address} onChange={onChange} />
                    </FormGroup>
                    <Button color="primary" type="submit" disabled={loading? true : false}> {loading? 'Updating...' : 'Update'}</Button>
                  </Form>}
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

export default EditCompany