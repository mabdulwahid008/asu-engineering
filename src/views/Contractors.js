import Loading from 'components/Loading/Loading'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row, Table } from 'reactstrap'
import { FaRegEdit, FaTrash } from "react-icons/fa";

function Contractors() {
    const [contractors, setContractors] = useState(null)
    const [loading, setLoading] = useState(false)

    const getContractors = async() => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}contractors`,{
            method: 'GET',
            headers:{
                'Content-Type': 'Application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        const res = await response.json();
        
        if(response.status === 200){
            setContractors(res)
        }
        else if(response.status === 401){
            localStorage.removeItem('token')
            window.location.reload(true)
        }
        else
            toast.error(res.message)
    }

    const deleteContractor = async(id) =>{
        setLoading(true)
        document.getElementById(`row${id}`).style.backgroundColor = 'rgba(222, 222, 222, 0.3)'
  
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}contractors/${id}`,{
          method: 'DELETE',
          headers: {
            'Content-Type': 'Application/json',
            'Authorization' : localStorage.getItem('token')
          }
        })
        const res = await response.json();
        if(response.ok){
          const newContractor = contractors.filter((p)=> {return p.id !== id})
          setContractors(newContractor);
          toast.success(res.message)
        }
        else if(response.status === 401){
          localStorage.removeItem('token')
          window.location.reload(true)
        }
        else{
          toast.error(res.message)
          document.getElementById(`row${id}`).style.backgroundColor = 'white'
        }
        setLoading(false)
    }

    useEffect(() => {
      getContractors()
    }, [])
    
  return (
    <div className='content'>
        <Row>
            <Col>
                <Card>
                    <CardHeader  style={{display:'flex', justifyContent: 'space-between'}}>
                        <CardTitle tag="h4">Contractors</CardTitle>
                        <Link to='add-contractor'><Button color="primary">Add New </Button></Link>
                    </CardHeader>
                    <CardBody>
                        {!contractors && <Loading />}
                       {contractors && <Table>
                            <thead className="text-primary">
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th style={{width:"40%"}}>Address</th>
                                    <th>Balance</th>
                                    <th>Phone</th>
                                    <th>Added on</th>
                                    <th >Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contractors.map((contractor, index)=>{
                                    return <tr key={contractor.id} id={`row${contractor.id}`}>
                                            <td>{index+1}</td>
                                            <td>{contractor.name}</td>
                                            <td>{contractor.address ? contractor.address : '-----'}</td>
                                            <td>{contractor.balance}</td>
                                            <td>{contractor.phone}</td>
                                            <td>{contractor.created_at.substr(0,10)}</td>
                                            <td className='actions' style={{}}>
                                                <Link to={`edit-contractor/${contractor.id}`}><FaRegEdit/> </Link>
                                                <FaTrash onClick={!loading?()=>deleteContractor(contractor.id): ''}/>
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

export default Contractors