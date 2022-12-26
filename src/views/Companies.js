import Loading from 'components/Loading/Loading';
import React, { useState, useEffect } from 'react'
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Button } from "reactstrap";
import { logOut, editCompany } from 'state/actions';

function Companies() {
    const dispatch = useDispatch()
    const [companpies, setCompanies] = useState(null);
    const [loading, setLoading] = useState(false);

    const getCompanpies = async() =>{
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}companies`,{
            method: 'GET',
            headers: {
                'Authorization' : localStorage.getItem('token')
            }
        });
        const res = await response.json();

        if(response.status === 200){
            setCompanies(res)
        }
        else if(response.status === 401){
            localStorage.removeItem('token')
            dispatch(logOut())
        }
        else
            toast.error(res.message)
    }
 
    const deleteCompany = async(id) =>{
      setLoading(true)
      document.getElementById(`row${id}`).style.backgroundColor = 'rgba(222, 222, 222, 0.3)'

      const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}companies/${id}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'Application/json',
          'Authorization' : localStorage.getItem('token')
        }
      })
      const res = await response.json();
      if(response.ok){
        const newCompanies = companpies.filter((p)=> {return p.id !== id})
        setCompanies(newCompanies);
        toast.success(res.message)
      }
      else if(response.status === 401){
        localStorage.removeItem('token')
        dispatch(logOut())
      }
      else{
        toast.error(res.message)
        document.getElementById(`row${id}`).style.backgroundColor = 'white'
      }
      setLoading(false)
    }

    useEffect(()=>{
        getCompanpies()
    }, [])
  return (
    <div className="content">
         <Row>
          <Col md="12">
            <Card>
              <CardHeader style={{display:'flex', justifyContent: 'space-between'}}>
                <CardTitle tag="h4">Companies</CardTitle>
                <Link to='add-company'><Button color="primary">Add New </Button></Link>
              </CardHeader>
              <CardBody>
              {!companpies && <Loading/>}
              {companpies && 
                <Table >
                  <thead className="text-primary">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th style={{width:'45%'}}>Address</th>
                      <th>Balance</th>
                      <th>Added On</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                      {companpies.map((company, index)=>{
                          return <tr key={company.id} id={`row${company.id}`}>
                                <td>{index+1}</td>
                                <td>{company.name}</td>
                                <td>{company.address ? company.address : '-----'}</td>
                                <td>{company.balance}</td>
                                <td>{company.created_at? company.created_at?.substr(0,10): 'null'}</td>
                                <td className='actions' style={{}}>
                                    <Link to={`edit-company/${company.id}`}><FaRegEdit onClick={()=>{dispatch(editCompany(company))}}/> </Link>
                                    <FaTrash onClick={!loading?()=>deleteCompany(company.id): ''}/>
                                </td>
                            </tr>
                      })}
                  </tbody>
                </Table>}
              </CardBody>
            </Card>
          </Col>
        </Row>
    </div>
 )
}

export default Companies