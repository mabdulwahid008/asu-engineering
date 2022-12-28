import React from 'react'
import {  Route, Switch, Redirect, useHistory } from 'react-router-dom'
import AdminLayout from "layouts/Admin.js";
import Login from "views/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const history = useHistory()
    history.push('/dashboard')
  
  if(localStorage.getItem('token'))
     return (
      <div>
          <Switch>
              <Route path="/" render={ (props) =>  <AdminLayout {...props} /> } />
              {/* <Redirect to="/dashboard" /> */}
          </Switch> 
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      </div>
     )
  
  else
    return (
      <div>
          <Switch>
              <Route path="/dashboard" render={ (props) =>  <Login />} />
              {/* <Redirect to="/dashboard" /> */}
          </Switch> 
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      </div>
    )
}

export default App