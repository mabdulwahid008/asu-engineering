import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row, Table } from 'reactstrap'
import Loading from 'components/Loading/Loading'
import { Link } from 'react-router-dom'
import { PDFDownloadLink } from '@react-pdf/renderer'
import PDFfile from 'components/PDFfile/PDFfile'

function Invoices() {
    const [invoices, setInvoices] = useState(null)
    const [totalRecords, setTotalRecords] = useState(0)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState()
    const [invoice, setInvoice] = useState(null)


    const [records, setRecords] = useState(50)

    const fetchInvoices = async() => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}invoices?offset=${records}&records=10`,{
            method: 'GET',
            headers:{
                'Content-Type': 'Application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        const res = await response.json()
        
        if(response.status === 200){
            setInvoices(res.data)
            setTotalRecords(res.total_records)
            let pages = Math.ceil(res.total_records / 10)
            setTotalPages(pages)
        }
        else if(response.status === 401){
          localStorage.removeItem('token')
          window.location.reload(true)
        }
        else if(response.status === 500){
            toast.error('Server Error')
        }
        else
          toast.error(res.message)
    }

    const fecthInvoice = async( invoice_id ) =>{
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}invoices/${invoice_id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json',
                "Authorization" : localStorage.getItem('token')
            },
        })
        const res = await response.json()

        if(response.status === 200){
            setInvoice(res)
        }
        else if(response.status === 401){
            localStorage.removeItem('token')
            window.location.reload(true)
        }
        else
            toast.error(res.message)
    }

    const nextPage = ()=>{
        if((records + 10) <= totalRecords){
            setRecords(records+10)
            setInvoices(null)
            setPage(page+1)
        }
    }
    const prevPage = ()=>{
        if(records !== 0){
            setRecords(records-10)
            setInvoices(null)
            setPage(page-1)
        }
    }

    useEffect(() => {
        if(!invoices)
            fetchInvoices()
    }, [invoices, records])

    const ref = useRef()
    useEffect(() => {
        if(invoice)
            // ref.current.click()
            console.log(invoice);
    }, [invoice])

    
  return (<>
    <div className='content'>
        <Row>
            <Col md='12'>
                <Card>
                    <CardHeader style={{display:'flex', justifyContent: 'space-between'}}>
                        <CardTitle tag="h4">Invoices</CardTitle>
                        <Link to='create-invoice'><Button color='primary'>Create Invoice</Button></Link>
                    </CardHeader>
                    <CardBody>
                    {!invoices && <Loading/>}
                    {invoices && <>
                    <Table>
                        <thead className="text-primary">
                            <tr>
                                <th style={{width: '3%'}}>#</th>
                                <th style={{width: '12%'}}>Inv-Asu</th>
                                <th style={{width: '15%'}}>Customer</th>
                                <th style={{width: '15%'}}>Contractor</th>
                                <th style={{width: '15%'}}>Company</th>
                                <th style={{width: '12%'}}>Totals</th>
                                <th style={{width: '15%'}}>Created On</th>
                                <th style={{width: '5%'}}>Download</th>
                            </tr>
                        </thead>
                        <tbody>
                           {invoices.map((invoice, index)=>{
                               return  <tr key={invoice.id}>
                                            <td>{(records + index + 1)}</td>
                                            <td>INV-ASU-{invoice.id}</td>
                                            <td>{invoice.customer_name}</td>
                                            <td>{invoice.contractor_name}</td>
                                            <td>{invoice.company_name}</td>
                                            <td>{invoice.total}</td>
                                            <td>{invoice.created_at.substr(0,10)}</td>
                                            <Button onClick={()=>{fecthInvoice(invoice.id)}}>Download</Button>
                                        </tr>
                           })}
                        </tbody>
                    </Table>
                           <div className='invoice-footer'>                               
                                <p className='text-muted'>Total records {totalRecords} </p>
                                <p className='text-muted'>Page {page} of {totalPages} </p>
                                <div>                                
                                    <i className='nc-icon nc-minimal-left' onClick={prevPage}/>
                                    <i className='nc-icon nc-minimal-right' onClick={nextPage}/>
                                </div>
                           </div>
                           </> }            
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </div>
    {invoice && console.log(invoice) && <>
    <PDFDownloadLink document={<PDFfile invoice={invoice}/> } fileName="invoice">
        {({loading}) => (<Button color='primary' ref={ref} style={{width:'100%'}}>{loading? 'Generating' : 'Download PDF'}</Button> )}
    </PDFDownloadLink>
    <div style={{display:'none'}}>

    <PDFfile invoice={invoice}/>
    </div>
    </>}
    </>
  )
}

export default Invoices