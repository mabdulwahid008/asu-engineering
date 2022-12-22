import Loading from 'components/Loading/Loading';
import React, { useState, useEffect } from 'react'
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Button } from "reactstrap";
import { logOut, editProuct } from 'state/actions';

function Products() {
    const [products, setProducts] = useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const fetchProducts = async() => { 
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}products`,{
            method: 'GET',
            headers:{
                'Content-Type': 'Application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        const res = await response.json()
        
        if(response.status === 200)
            setProducts(res)
        else if(response.status === 401){
          localStorage.removeItem('token')
            dispatch(logOut())
        }
        else
          toast.error(res.message)
    }

    const deleteProduct = async(id) =>{
      setLoading(true)
      document.getElementById(`row${id}`).style.backgroundColor = 'rgba(222, 222, 222, 0.3)'

      const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}products/${id}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'Application/json',
          'Authorization' : localStorage.getItem('token')
        }
      })
      const res = await response.json();
      if(response.ok){
        const newProducts = products.filter((p)=> {return p.id !== id})
        setProducts(newProducts);
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
        fetchProducts()
    }, [])
  return (
    <div className="content">
         <Row>
          <Col md="12">
            <Card>
              <CardHeader style={{display:'flex', justifyContent: 'space-between'}}>
                <CardTitle tag="h4">Products</CardTitle>
                <Link to='add-product'><Button color="primary">Add New </Button></Link>
              </CardHeader>
              <CardBody>
              {!products && <Loading/>}
              {products && 
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Unit</th>
                      <th>Added on</th>
                      <th >Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                      {products.map((product, index)=>{
                          return <tr key={product.id} id={`row${product.id}`}>
                                <td>{index+1}</td>
                                <td>{product.title}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.unit}</td>
                                <td>{product.created_at.substr(0,10)}</td>
                                <td className='actions' style={{}}>
                                    <Link to={`edit-product/${product.id}`}><FaRegEdit onClick={()=>{dispatch(editProuct(product))}}/> </Link>
                                    <FaTrash onClick={!loading?()=>deleteProduct(product.id): ''}/>
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

export default Products