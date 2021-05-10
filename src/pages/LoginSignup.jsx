import React from 'react';
import { useLocation, Link } from 'react-router-dom';

import WaveSvg from '../components/layout/WaveSvg';
import BackLink from '../components/utils/BackLink';

const Login = () => {
   const location = useLocation();

   let title;
   if (location.pathname === '/login') {
      title = <h3 className="form__header--title">Login</h3>;
   } else {
      title = <h3 className="form__header--title">Sign Up</h3>;
   }

   let footer;
   if (location.pathname === '/login') {
      footer = (
         <div className="form__footer">
            <span>I&#39;m a new user, </span>
            <Link to="/signup" className="form__footer--link">
               Sign Up
            </Link>
         </div>
      );
   } else {
      footer = (
         <div className="form__footer">
            <span>I&#39;m already a member, </span>
            <Link to="/login" className="form__footer--link">
               Login
            </Link>
         </div>
      );
   }

   return (
      <>
         <form className="form" autoComplete="off">
            <div className="form__header">
               <BackLink route="/" />
               {title}
            </div>
            <div className="form__body"></div>
            {footer}
            <WaveSvg></WaveSvg>
         </form>
      </>
   );
};

export default Login;
