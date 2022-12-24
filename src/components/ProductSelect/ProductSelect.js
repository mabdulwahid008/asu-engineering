import CheckBox from 'components/CheckBox/CheckBox'
import './ProductSelect.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FormGroup, Input } from 'reactstrap'
import { FaEllipsisV } from "react-icons/fa";
import { removeProduct } from 'state/actions';
import { updateProductQuantityy } from 'state/actions';

function ProductSelect({ setQuantityUpdated }) {
    const selectedProduct =useSelector(state=>state.invoiceProducts)
    const dispatch = useDispatch()

    const onKeyPress = (  ) =>{
        
    }
    const quantityHandler = ( product ) => {
        let quant = document.getElementById(`quantity${product.id}`).value
        dispatch(updateProductQuantityy(product, quant))
        setQuantityUpdated(true)
	}

    const controls = (product ) => {
        const checked = document.getElementById(`row${product.id}`).getElementsByClassName('checkbox')[0].checked;
        if(checked){
            document.getElementById(`row${product.id}`).getElementsByClassName('checkbox')[0].checked = false
            document.getElementById(`row${product.id}`).getElementsByClassName('more-option')[0].style.color = 'black'
        }
        else{
            document.getElementById(`row${product.id}`).getElementsByClassName('checkbox')[0].checked = true
            document.getElementById(`row${product.id}`).getElementsByClassName('more-option')[0].style.color = '#66c4de'
        }
    }

    useEffect(()=>{
    },[selectedProduct])
  return (<>
  {selectedProduct.map((product)=>{ 
  return <div className='inovice-product' key={product.id} id={`row${product.id}`}>
        <div className='product-title'>
            <p className='text-muted'>{product.title}</p>
        </div>
        <div className='product-data'>
            <div>
                <p>{product.price}</p>
            </div>
            <FormGroup>
                <Input className='quantity-update' type='number' id={`quantity${product.id}`} min={1} max={product.quantity} defaultValue={product.selectedQuantity} onKeyPress={onKeyPress} name="quantity" onChange={()=>{quantityHandler(product)}}/>
            </FormGroup>
            <div>
                <p>{product.selectedQuantity * product.price}</p>
            </div>
            <div className='more-option'>
                {selectedProduct && <FaEllipsisV onClick={()=>{controls(product)}} id="more-option"/>}
            </div>
        </div>
            <Input type='checkbox' id='controls' className='checkbox' style={{visibility: 'hidden'}}/>
        {<div className='controls' id={`controls${product.id}`}>
            <div onClick={()=>{dispatch(removeProduct(product))}}>
                <i className='nc-icon nc-simple-remove control-icon' />
                <p className='text-muted control-text'>Remove</p>
            </div>
            {/* <div>
                <i className='nc-icon nc-simple-remove control-icon' />
                <p className='text-muted control-text'>Up</p>
            </div>
            <div>
                <i className='nc-icon nc-simple-remove control-icon' />
                <p className='text-muted control-text'>Down</p>
            </div> */}
        </div>}
    </div>})}
    
    </>)
}

export default ProductSelect