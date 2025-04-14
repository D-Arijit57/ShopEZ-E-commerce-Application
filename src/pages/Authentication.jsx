import React, { useState } from 'react';
import '../styles/Authentication.css'
import Login from '../components/Login';
import Register from '../components/Register';

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="AuthenticatePage">

      {isLogin ?
      
      <Login  setIsLogin = {setIsLogin} />
    
      :
      
      <Register setIsLogin = {setIsLogin} />
      }

    </div>
  )
}

export default Authentication