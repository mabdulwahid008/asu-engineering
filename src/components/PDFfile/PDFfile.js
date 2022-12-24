import React from 'react'
import { Page, Document, Text, StyleSheet, View, Font } from '@react-pdf/renderer'

Font.register({
    family: 'Montserrat',
    src: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap'
})

const  style =StyleSheet.create({
    body: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '50px 40px'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '20px',
        marginTop: '10px',
    },
    col: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '35%'
    },
    innerRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems:'center',
        flexDirection: 'row'
    },
    innerCol: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '50%'
    },
    heading: {
        fontSize: '10px',
        color: '#386087',
        // color: '#66c4de',
        fontWeight: 400,
        marginBottom: '5px',
        textTransform: 'uppercase'
    },
    text: {
        fontSize: '10px',
        color: 'black',
        fontWeight: 300,
        marginBottom: '5px'
    },
    rightAlignCol: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        width: '50%'
    },
    productHeader:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: '5px 5px 2px',
        borderTop: '1px solid red',
        borderBottom: '1px solid red',
    },
    products: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: '5px 5px 2px',
    },
    productCol1: {
        width: '5%'
    },
    productCol2: {
        width: '50%'
    },
    productCol3: {
        width: '15%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    }, 
    productContent: {
        fontSize: '10px',
        color: 'black',
        fontWeight: 300,
        marginBottom: '5px',
    },
    header: {
        fontSize: '35',
        fontWeight: 900,   
        color: '#386087',
    },
    border: {
        height: '1px',
        width: '100%',
        borderBottom: '1px solid black',
        marginTop: '10px'
    }

})


// const PDFfile = ({ customer , contractor, selectedProducts, subtotal }) => {
const PDFfile = ({ invoice }) => {
    const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return ( 
        <Document>
            <Page style={style.body}>
                <View style={style.row}>
                    <Text style={style.header}>INVOICE</Text>
                </View>
                <View style={style.row}>
                    <View style={style.col}>
                        <Text style={style.heading}>Customer:</Text>
                        <Text style={style.text}>{invoice.customer.name}</Text>
                        <Text style={style.text}>03{invoice.customer.phone}</Text>
                        <Text style={style.text}>{invoice.customer.address}</Text>
                    </View>
                    <View style={style.col}></View>
                    <View style={style.col}></View>
                </View>
                
                <View style={style.row}>
                    <View style={style.col}>
                        <Text style={style.heading}>Site Details:</Text>
                        <Text style={style.text}>{invoice.contractor.name}</Text>
                        <Text style={style.text}>03{invoice.contractor.phone}</Text>
                        <Text style={style.text}>{invoice.contractor.address}</Text>
                    </View>
                    {/* <View style={style.col}></View> */}
                    <View style={style.col}>
                        <View style={style.innerRow}>
                            <View style={style.innerCol}>
                                <Text style={style.heading}>Invoice #:</Text>
                                <Text style={style.heading}>Invoice Date:</Text>
                                <Text style={style.heading}>Pay Term:</Text>
                                <Text style={style.heading}>Due Date:</Text>
                            </View>
                            <View style={style.rightAlignCol}>
                                <Text style={style.text}>INV-ASU-{invoice.id}</Text>
                                <Text style={style.text}>{`${new Date().getDate()}/${monthName[new Date().getMonth()]}/${new Date().getFullYear()}`}</Text>
                                <Text style={style.text}>cash</Text>
                                <Text style={style.text}>{`${new Date().getDate()}/${monthName[new Date().getMonth()]}/${new Date().getFullYear()}`}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={style.productHeader}>
                    <View style={style.productCol1}>
                        <Text style={style.heading}>#</Text>
                    </View>
                    <View style={style.productCol2}>
                        <Text style={style.heading}>Products</Text>
                    </View>
                    <View style={style.productCol3}>
                        <Text style={style.heading}>Price</Text>
                    </View>
                    <View style={style.productCol3}>
                        <Text style={style.heading}>Qunatity</Text>
                    </View>
                    <View style={style.productCol3}>
                        <Text style={style.heading}>Line Total</Text>
                    </View>
                </View>
                {invoice.sales.map((sale, index)=>{
                    return  <View style={style.products}>
                                <View style={style.productCol1}>
                                    <Text style={style.text}>{index+1}</Text>
                                </View>
                                <View style={style.productCol2}>
                                    <Text style={style.text}>{sale.product.title}</Text>
                                </View>
                                <View style={style.productCol3}>
                                    <Text style={style.text}>{sale.product.price}</Text>
                                </View>
                                <View style={style.productCol3}>
                                    <Text style={style.text}>{sale.quantity}</Text>
                                </View>
                                <View style={style.productCol3}>
                                    <Text style={style.text}>{sale.amount}</Text>
                                </View>
                            </View>
                })}

                <View style={style.border}></View>
                <View style={style.row}>
                    <View style={style.col}></View>
                    <View style={style.col}>
                        <View style={style.innerRow}>
                            <View style={style.innerCol}>
                                <Text style={style.heading}>Subtotal:</Text>
                                <Text style={style.heading}>Total:</Text>
                            </View>
                            <View style={style.rightAlignCol}>
                                <Text style={style.text}>{invoice.total} Rs</Text>
                                <Text style={style.text}>{invoice.total} Rs</Text>
                            </View>
                        </View>
                    </View>
                </View>

            </Page>
        </Document>
    )
}

export default PDFfile
