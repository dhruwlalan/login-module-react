import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import WaveSvg from '../components/layout/WaveSvg';
import BackLink from '../components/utils/BackLink';
import FgiName from '../components/layout/FgiName';
import FgiEmail from '../components/layout/FgiEmail';
import FgiPass from '../components/layout/FgiPass';
import SubmitBtn from '../components/layout/SubmitBtn';

import { alert } from '../redux/alert/alertActions';
import { signUp, signIn } from '../redux/user/userActions';
import { selectUserStatus } from '../redux/user/userSelector';

const Login = ({ alert, register, login, userStatus }) => {
   const path = useLocation().pathname;
   const [fullname, setFullname] = useState('');
   const [fullnameStatus, setFullnameStatus] = useState('notEntered');
   const [email, setEmail] = useState('');
   const [emailStatus, setEmailStatus] = useState('notEntered');
   const [password, setPassword] = useState('');
   const [passwordStatus, setPasswordStatus] = useState('notEntered');
   const [submitBtnStatus, setSubmitBtnStatus] = useState('notSubmitted');

   let title, forgetPassword, footer, submitBtn;
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
      submitBtn = <SubmitBtn name="Login" status={submitBtnStatus} />;
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
      submitBtn = <SubmitBtn name="Create Account" status={submitBtnStatus} />;
   }

   useEffect(() => {
      if (!userStatus?.type) return;

      alert(userStatus.type, userStatus.message);
      setSubmitBtnStatus(userStatus.type);
      if (userStatus.type === 'error') {
         setTimeout(() => {
            setSubmitBtnStatus('notSubmitted');
         }, 1000);
      }
   }, [userStatus, alert]);

   const handleSubmit = (e) => {
      e.preventDefault();
      if (path === '/signup') {
         if (fullnameStatus === 'notEntered') {
            alert('error', 'Please enter your full name.');
            return;
         }
      }
      if (emailStatus === 'notEntered') {
         alert('error', 'Please enter your email address.');
      } else if (emailStatus === 'EnteredButInvalid') {
         alert('error', 'Please enter a valid email address.');
      } else if (passwordStatus === 'notEntered') {
         alert('error', 'Please enter your password.');
      } else if (passwordStatus === 'EnteredButInvalid') {
         alert('error', 'Password should be at least 8 characters long.');
      } else {
         setSubmitBtnStatus('submitted');
         if (path === '/signup') {
            register(fullname, email, password);
         } else {
            login(email, password);
         }
      }
   };

   return (
      <form className="form" autoComplete="off" onSubmit={handleSubmit}>
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
            {submitBtn}
            {forgetPassword}
         </div>
         {footer}
         <WaveSvg></WaveSvg>
      </form>
   );
};

const mapStateToProps = createStructuredSelector({
   userStatus: selectUserStatus,
});
const mapDispatchToProps = (dispatch) => ({
   alert: (type, msg) => dispatch(alert(type, msg)),
   register: (fullName, email, password) =>
      dispatch(signUp({ email, password, fullName })),
   login: (email, password) => dispatch(signIn({ email, password })),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
