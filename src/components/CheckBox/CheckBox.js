import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from 'reactstrap'
import { selectCompany } from 'state/actions'
import { selectCustomer } from 'state/actions'
import { selectContractor } from 'state/actions'
import { SelectProduct } from 'state/actions'
import './CheckBox.css'

function CheckBox({ data, address, placeholder, Name, Title, box }) {
    const dispatch = useDispatch()
    const [newData, setNewData] = useState(data)

    //for updating form state, need to run useEffect
    const customer = useSelector((state)=>state.invoiceCustomer)
    
    const [placeHolder, setPlaceHolder] = useState('Select')

    const handleSearch = ( value ) => {
        if(Name)
        setNewData(data.filter((obj)=>{return obj.name.toLowerCase().includes(value.toLowerCase())}))
        if(Title)
            setNewData(data.filter((obj)=>{return obj.title.toLowerCase().includes(value.toLowerCase())}))
    }

    const dropDown = () =>{
        const checked = document.getElementById(box).getElementsByClassName('toggle_dropdown')[0].checked
       if(checked){
           document.getElementById(box).getElementsByClassName('toggle_dropdown')[0].checked = false
       }
        else{
            document.getElementById(box).getElementsByClassName('toggle_dropdown')[0].checked = true
        }
    }

    const selectText = (id) => {
        const name = document.getElementById(`option${id}`).getElementsByClassName('name')[0].innerHTML;
        document.getElementById(box).getElementsByClassName('toggle_dropdown')[0].checked = false
        
        if(!Title){
            // document.getElementById(`selectedText${box}`).innerHTML = name
            setPlaceHolder(name)
        }
    }

    const selectOption = (obj) =>{
        if(box === 'customer'){
            dispatch(selectCustomer(obj))
            selectText(obj.name);
        }
        else if(box === 'contractor'){
            dispatch(selectContractor(obj))
            selectText(obj.name);
        }
        else if(box === 'company'){
            dispatch(selectCompany(obj))
            selectText(obj.name);
        }
        else if(box === 'product'){
            selectText(obj.title); 
            obj.quantity = 1; 
            dispatch(SelectProduct(obj))
        }
        else{}
    }
    useEffect(()=>{
        if(!customer)
            setPlaceHolder(placeholder)
    },[customer])
  return (
    <div className='selector' id={box}>
       <Input type="checkbox" id='toggle_dropdown' className='toggle_dropdown'/>
        <span id='selectField'  onClick={dropDown}>
            <p className="text-muted" id={`selectedText${box}`}>{placeHolder}</p>
            <i className='nc-icon nc-minimal-down' id={`icon${box}`}/>
       </span>
      {Name && <div id='listOptions'>
           <Input type='text' placeholder='Search' onChange={(e)=>{handleSearch(e.target.value)}}/>
                {newData.length === 0 && <li><p>Not Found</p></li>}
               {newData.map((obj, index)=>{
                   return <li key={index} className='option' onClick={()=>{selectOption(obj)}} id={`option${obj.name}`}>
                      <p className='name'style={{display: `${Name? '': 'none'}`}}>{obj.name}</p>
                      <p style={{display: `${address? '': 'none'}`}}>{obj.address? obj.address: '-----'}</p>
                   </li>
               })}
       </div>}
      {Title && <div id='listOptions'>
           <Input type='text' placeholder='Search' name='title' onChange={(e)=>{handleSearch(e.target.value)}}/>
           {newData.length === 0 && <li><p>Not Found</p></li>}
               {newData.map((obj, index)=>{
                   return <li key={index} className='option' onClick={()=>{selectOption(obj)}} id={`option${obj.title}`}>
                      <p className='name' style={{display: `${Title? '': 'none'}`}}>{obj.title}</p>
                      <p style={{display: `${address? '': 'none'}`}}>{obj.address? obj.address: '-----'}</p>
                   </li>
               })}
       </div>}
    </div>
  )
}

export default CheckBox