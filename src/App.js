import React from 'react'
import {  Route, Switch, Redirect } from 'react-router-dom'
import AdminLayout from "layouts/Admin.js";
import Login from "views/Login";
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const loggedIn = useSelector(state=> state.authenticateUser)
  
  if(localStorage.getItem('token'))
     return (
      <div>
          <Switch>
              <Route path="/admin" render={ (props) =>  <AdminLayout {...props} /> } />
              <Redirect to="/admin/dashboard" />
          </Switch> 
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      </div>
     )
  
  else
    return (
      <div>
          <Switch>
              <Route path="/admin" render={ (props) =>  <Login />} />
              <Redirect to="/admin/dashboard" />
          </Switch> 
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      </div>
    )
}

export default App