import React from 'react';
import { useHistory } from 'react-router-dom';

const SignUp = () => {
   const history = useHistory();
   return (
      <>
         <button onClick={() => history.push('/')}>Home</button>
         <h1>SignUp</h1>
      </>
   );
};

export default SignUp;
