import React from 'react';
import { Link } from 'react-router-dom';

const NotLoggedIn = () => (
   <div className="nli">
      <div className="nli__heading">Welcome!</div>
      <div className="nli__desc">
         This is just a simple Login and Sign Up module. Login to your account or Sign Up
         if you haven&#39;t created one.
      </div>
      <div className="nli__links">
         <Link to="/login" className="nli__links--link">
            Login
         </Link>
         <Link to="/signup" className="nli__links--link">
            Sign Up
         </Link>
      </div>
   </div>
);

export default NotLoggedIn;
