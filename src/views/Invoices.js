import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { logOut } from 'state/actions'
import { useTable } from 'react-table'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row, Table } from 'reactstrap'
import InvoicesTable from 'components/InvoicesTable/InvoicesTable'
import Loading from 'components/Loading/Loading'

function Invoices() {
    const [invoices, setInvoices] = useState(null)
    const [totalRecords, setTotalRecords] = useState(0)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState()


    // const [data, setData] = useState(null)
    const [records, setRecords] = useState(0)
    const dispatch = useDispatch()

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
            // setData(res.data)
            setInvoices(res.data)
            setTotalRecords(res.total_records)
            let pages = Math.ceil(res.total_records / 10)
            setTotalPages(pages)
        }
        else if(response.status === 401){
          localStorage.removeItem('token')
            dispatch(logOut())
        }
        else if(response.status === 500){
            toast.error('Server Error')
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
            console.log(invoices);
    }, [invoices, records])


    // const columns = React.useMemo(
    //     () => [
    //                 {
    //                     Header: '#',
    //                     Cell: (row) => {
    //                         return row.index
    //                     }
    //                 },
    //                 {
    //                     Header: 'Customer',
    //                     accessor: 'customer_name',
    //                 },
    //                 {
    //                     Header: 'Contractor',
    //                     accessor: 'contractor_name',
    //                 },
    //                 {
    //                     Header: 'Company',
    //                     accessor: 'company_name',
    //                 },
    //                 {
    //                     Header: 'Created On',
    //                     accessor: `created_at`,
    //                 },
    //                 {
    //                     Header: 'Invoice',
    //                     Cell: () => (
    //                         <Button color='primary'>
    //                             ccc
    //                         </Button>
    //                       )
    //                 },
    //             ],
    //     []
    // )


    
  return (
    <div className='content'>
        <Row>
            <Col md='12'>
                <Card>
                    <CardHeader style={{display:'flex', justifyContent: 'space-between'}}>
                        <CardTitle tag="h4">Invoices</CardTitle>
                        <Button color='primary'>Create Invoice</Button>
                    </CardHeader>
                    <CardBody>
                    {!invoices && <Loading/>}
                    {/* {invoices && <InvoicesTable columns={columns} data={data} />} */}
                    {invoices && <>
                    <Table>
                        <thead className="text-primary">
                            <tr>
                                <th style={{width: '3%'}}>#</th>
                                <th style={{width: '25%'}}>Customer</th>
                                <th style={{width: '20%'}}>Contractor</th>
                                <th style={{width: '20%'}}>Company</th>
                                <th style={{width: '12%'}}>Totals</th>
                                <th style={{width: '15%'}}>Created On</th>
                                <th style={{width: '5%'}}>Download</th>
                            </tr>
                        </thead>
                        <tbody>
                           {invoices.reverse().map((invoice, index)=>{
                               return  <tr>
                                            <td>{(records + index + 1)}</td>
                                            <td>{invoice.customer_name}</td>
                                            <td>{invoice.contractor_name}</td>
                                            <td>{invoice.company_name}</td>
                                            <td>{invoice.total}</td>
                                            <td>{invoice.created_at.substr(0,10)}</td>
                                            <td><i className='nc-icon nc-cloud-download-93' style={{fontSize: 18}}/></td>
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
  )
}

export default Invoices