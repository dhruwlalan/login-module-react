import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import SubmitBtn from '../components/layout/SubmitBtn';
import FgiPass from '../components/layout/FgiPass';
import { confirmPasswordReset } from '../redux/user/userActions';
import { selectUserStatus } from '../redux/user/userSelector';
import { auth } from '../firebase/firebaseUtils';
import { alert } from '../redux/alert/alertActions';

function useQuery() {
   return new URLSearchParams(useLocation().search);
}

const AccountManagement = ({ alert, confirmPasswordReset, userStatus }) => {
   const history = useHistory();
   const query = useQuery();
   const mode = query.get('mode');
   const actionCode = query.get('oobCode');
   const apiKey = query.get('apiKey');

   const [isInvalidCode, setIsInvalidCode] = useState(false);
   const [showForm, setShowForm] = useState(false);
   const [accountEmail, setAccountEmail] = useState('');
   const [newPassword, setNewPassword] = useState('');
   const [newPasswordStatus, setNewPasswordStatus] = useState('notEntered');
   const [submitBtnStatus, setSubmitBtnStatus] = useState('notSubmitted');

   useEffect(() => {
      async function verifyPasswordResetCode() {
         try {
            const email = await auth.verifyPasswordResetCode(actionCode);
            console.log(email);
            setAccountEmail(email);
            setShowForm(true);
         } catch (error) {
            setIsInvalidCode(true);
         }
      }
      verifyPasswordResetCode();
   }, [actionCode]);

   useEffect(() => {
      if (!userStatus?.type) return;

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
      if (newPasswordStatus === 'notEntered') {
         alert('error', 'Please enter your new password.');
      } else if (newPasswordStatus === 'EnteredButInvalid') {
         alert('error', 'Please enter a valid new password.');
      } else {
         setSubmitBtnStatus('submitted');
         confirmPasswordReset(actionCode, newPassword);
      }
   };

   return (
      <>
         {isInvalidCode ? (
            <form
               className="form form--fit"
               autoComplete="off"
               onSubmit={() => history.push('/forgetPassword')}
            >
               <div className="form__header">
                  <h3 className="form__header--title">Reset Password</h3>
                  <h5 className="form__header--subtitle">
                     Password reset code is invalid or expired! Try resetting your
                     password again.
                  </h5>
                  <div className="form__body">
                     <SubmitBtn name="Reset Password Again" status={submitBtnStatus} />
                  </div>
               </div>
            </form>
         ) : null}
         {!isInvalidCode && showForm ? (
            <form className="form form--fit" autoComplete="off" onSubmit={handleSubmit}>
               <div className="form__header">
                  <h3 className="form__header--title form__header--title--reset">
                     Reset Password
                  </h3>
                  <h5 className="form__header--subtitle">{accountEmail}</h5>
               </div>
               <div className="form__body">
                  <FgiPass
                     label="newPassword"
                     password={newPassword}
                     updatePassword={setNewPassword}
                     passwordStatus={newPasswordStatus}
                     updatePasswordStatus={setNewPasswordStatus}
                  />
                  <SubmitBtn name="Reset Password" status={submitBtnStatus} />
               </div>
            </form>
         ) : null}
      </>
   );
};

const mapStateToProps = createStructuredSelector({
   userStatus: selectUserStatus,
});
const mapDispatchToProps = (dispatch) => ({
   alert: (type, msg) => dispatch(alert(type, msg)),
   confirmPasswordReset: (actionCode, newPassword) =>
      dispatch(confirmPasswordReset({ actionCode, newPassword })),
});
export default connect(mapStateToProps, mapDispatchToProps)(AccountManagement);
