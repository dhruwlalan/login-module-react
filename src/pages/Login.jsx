import React from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
   const history = useHistory();
   return (
      <>
         <button onClick={() => history.push('/')}>Home</button>
         <h1>Login</h1>
      </>
   );
};

export default Login;
