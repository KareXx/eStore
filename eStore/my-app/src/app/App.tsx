import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setUserDto, setIsAuth } from '../stateManager/actions';

import Header from '../widgets/Header/ui/Header';
import Main from '../pages/Main/ui/Main';
import Product from '../pages/Product/ui/Product';
import MyOrders from '../pages/MyOrders/MyOrders';

import './App.css';


function AppContent() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuth = useSelector((state: any) => state.products.isAuth); 

  if(!isAuth){
    document.body.style.overflow = 'hidden'
  }else{
    document.body.style.overflow = 'auto'

  }
  useEffect(() =>{
    fetch('http://192.168.1.3:5000/refresh', {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => {
      if(response.status === 401){
        dispatch(setIsAuth(false))
        throw new Error('Auth Error')
      }
      return response.json()
    })
    .then(data => {
      localStorage.setItem('accessToken', data.accessToken)
      dispatch(setUserDto(data.userDto))
      dispatch(setIsAuth(true))
    }).catch(error =>{
      console.log(error)
    })
  }, [])


  const showHeader = !location.pathname.startsWith('/admin');



  return (
    <div className="App">
      {showHeader && <Header />}

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/my-orders" element={<MyOrders />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;