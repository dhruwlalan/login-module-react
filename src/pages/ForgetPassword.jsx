import React, { useState } from 'react';
import { connect } from 'react-redux';

import SubmitBtn from '../components/layout/SubmitBtn';
import BackLink from '../components/utils/BackLink';
import FgiEmail from '../components/layout/FgiEmail';

import { alert } from '../redux/alert/alertActions';

const ForgetPassword = ({ alert }) => {
   const [email, setEmail] = useState('');
   const [emailStatus, setEmailStatus] = useState('notEntered');
   const [submitBtnStatus, setSubmitBtnStatus] = useState('notSubmitted');

   const forgetPassword = () => {
      console.log({ email });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if (emailStatus === 'notEntered') {
         alert('error', 'Please enter your email address.');
      } else if (emailStatus === 'EnteredButInvalid') {
         alert('error', 'Please enter a valid email address.');
      } else {
         setSubmitBtnStatus('submitted');
         forgetPassword();
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

const mapDispatchToProps = (dispatch) => ({
   alert: (type, msg) => dispatch(alert(type, msg)),
});
export default connect(null, mapDispatchToProps)(ForgetPassword);
