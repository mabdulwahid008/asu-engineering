import React, { useState, useEffect } from 'react'
import {  Route, Switch, Redirect } from 'react-router-dom'
import AdminLayout from "layouts/Admin.js";
import Login from "views/Login";
import { useSelector, useDispatch } from 'react-redux'
import { loggIn } from 'state/actions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const loggedIn = useSelector(state=> state.authenticateUser)
  const dispatch = useDispatch();

  useEffect(()=>{
    if(localStorage.getItem('token'))
        dispatch(loggIn())
  }, [loggedIn])
  return (
    <div>
        <Switch>
            <Route path="/admin" render={ (props) => loggedIn? <AdminLayout {...props} /> : <Login />} />
            <Redirect to="/admin/dashboard" />
        </Switch> 
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </div>
  )
}

export default App