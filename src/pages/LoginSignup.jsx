import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

import WaveSvg from '../components/layout/WaveSvg';
import BackLink from '../components/utils/BackLink';
import FgiName from '../components/layout/FgiName';
import FgiEmail from '../components/layout/FgiEmail';
import FgiPass from '../components/layout/FgiPass';
import SubmitBtn from '../components/layout/SubmitBtn';

const Login = () => {
   const path = useLocation().pathname;
   const [fullname, setFullname] = useState('');
   const [fullnameStatus, setFullnameStatus] = useState('notEntered');
   const [email, setEmail] = useState('');
   const [emailStatus, setEmailStatus] = useState('notEntered');
   const [password, setPassword] = useState('');
   const [passwordStatus, setPasswordStatus] = useState('notEntered');

   let title, forgetPassword, footer;
   if (path === '/login') {
      title = <h3 className="form__header--title">Login</h3>;
      forgetPassword = (
         <Link to="/forgetPassword" className="form__body--forget-password">
            Forget your password?
         </Link>
      );
      footer = (
         <div className="form__footer">
            <span>I&#39;m a new user, </span>
            <Link to="/signup" className="form__footer--link">
               Sign Up
            </Link>
         </div>
      );
   } else {
      title = <h3 className="form__header--title">Sign Up</h3>;
      forgetPassword = null;
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
      <form className="form" autoComplete="off">
         <div className="form__header">
            <BackLink route="/" />
            {title}
         </div>
         <div className="form__body">
            <FgiName
               path={path}
               fullname={fullname}
               updateFullname={setFullname}
               fullnameStatus={fullnameStatus}
               updateFullnameStatus={setFullnameStatus}
            />
            <FgiEmail
               email={email}
               updateEmail={setEmail}
               emailStatus={emailStatus}
               updateEmailStatus={setEmailStatus}
            />
            <FgiPass
               password={password}
               updatePassword={setPassword}
               passwordStatus={passwordStatus}
               updatePasswordStatus={setPasswordStatus}
            />
            <SubmitBtn path={path} />
            {forgetPassword}
         </div>
         {footer}
         <WaveSvg></WaveSvg>
      </form>
   );
};

export default Login;
