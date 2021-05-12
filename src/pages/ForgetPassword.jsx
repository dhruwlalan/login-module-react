import React, { useState, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SubmitBtn from '../components/layout/SubmitBtn';
import BackLink from '../components/utils/BackLink';
import FgiEmail from '../components/layout/FgiEmail';

import { alert } from '../redux/alert/alertActions';
import { forgetPassword } from '../redux/user/userActions';
import { selectUserStatus } from '../redux/user/userSelector';

const ForgetPassword = ({ alert, forgetPassword, userStatus }) => {
   const history = useHistory();
   const [email, setEmail] = useState('');
   const [emailStatus, setEmailStatus] = useState('notEntered');
   const [submitBtnStatus, setSubmitBtnStatus] = useState('notSubmitted');

   useEffect(() => {
      if (!userStatus?.type || !userStatus?.message) return;

      alert(userStatus.type, userStatus.message);
      setSubmitBtnStatus(userStatus.type);
      if (userStatus.type === 'error') {
         setTimeout(() => {
            setSubmitBtnStatus('notSubmitted');
         }, 1000);
      }
      if (userStatus.type === 'success') {
         setTimeout(() => {
            history.push('/login');
         }, 1200);
      }
   }, [userStatus, alert, history]);

   const handleSubmit = (e) => {
      e.preventDefault();
      if (emailStatus === 'notEntered') {
         alert('error', 'Please enter your email address.');
      } else if (emailStatus === 'EnteredButInvalid') {
         alert('error', 'Please enter a valid email address.');
      } else {
         setSubmitBtnStatus('submitted');
         forgetPassword(email);
      }
   };

   return (
      <form className="form form--fit" autoComplete="off" onSubmit={handleSubmit}>
         <div className="form__header">
            <BackLink route="/login" />
            <h3 className="form__header--title">Forget Password?</h3>
            <h5 className="form__header--subtitle">
               Enter your email address to reset your password.
            </h5>
         </div>
         <div className="form__body">
            <FgiEmail
               email={email}
               updateEmail={setEmail}
               emailStatus={emailStatus}
               updateEmailStatus={setEmailStatus}
            />
            <SubmitBtn name="Send Reset Link" status={submitBtnStatus} />
         </div>
      </form>
   );
};

const mapStateToProps = createStructuredSelector({
   userStatus: selectUserStatus,
});
const mapDispatchToProps = (dispatch) => ({
   alert: (type, msg) => dispatch(alert(type, msg)),
   forgetPassword: (email) => dispatch(forgetPassword(email)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);
