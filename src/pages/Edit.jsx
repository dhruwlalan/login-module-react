import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Navbar from '../components/layout/Navbar';
import Pipes from '../components/layout/Pipes';
import FgiName from '../components/layout/FgiName';
import FgiEmail from '../components/layout/FgiEmail';
import FgiPass from '../components/layout/FgiPass';
import SubmitBtn from '../components/layout/SubmitBtn';
import { alert } from '../redux/alert/alertActions';
import { updatePassword } from '../redux/user/userActions';
import { selectCurrentUser, selectUserStatus } from '../redux/user/userSelector';

const Edit = ({ user, alert, updatePassword, userStatus }) => {
   const [fullname, setFullname] = useState(user.displayName);
   const [fullnameStatus, setFullnameStatus] = useState('notEntered');
   const [photoURL, setPhotoURL] = useState(user.photoURL);
   const [email, setEmail] = useState(user.email);
   const [emailStatus, setEmailStatus] = useState('notEntered');

   const [password, setPassword] = useState('');
   const [passwordStatus, setPasswordStatus] = useState('notEntered');
   const [currentPassword, setCurrentPassword] = useState('');
   const [currentPasswordStatus, setCurrentPasswordStatus] = useState('notEntered');
   const [newPassword, setNewPassword] = useState('');
   const [newPasswordStatus, setNewPasswordStatus] = useState('notEntered');

   const [submittedBtn, setSubmittedBtn] = useState(null);
   const [updateProfileBtnStatus, setUpdateProfileBtnStatus] = useState('notSubmitted');
   const [updateEmailBtnStatus, setUpdateEmailBtnStatus] = useState('notSubmitted');
   const [updatePasswordBtnStatus, setUpdatePasswordBtnStatus] = useState('notSubmitted');

   useEffect(() => {
      const Btns = {
         profile: setUpdateProfileBtnStatus,
         email: setUpdateEmailBtnStatus,
         password: setUpdatePasswordBtnStatus,
      };

      if (!userStatus?.type) return;
      alert(userStatus.type, userStatus.message);

      Btns[submittedBtn](userStatus.type);

      setTimeout(() => {
         Btns[submittedBtn]('notSubmitted');
      }, 1000);
   }, [userStatus, alert, submittedBtn]);

   const handlePasswordUpdate = (e) => {
      e.preventDefault();
      if (currentPasswordStatus === 'notEntered') {
         alert('error', 'Please enter your current password.');
      } else if (currentPasswordStatus === 'EnteredButInvalid') {
         alert('error', 'Please enter your valid current password.');
      } else if (newPasswordStatus === 'notEntered') {
         alert('error', 'Please enter your new password.');
      } else if (newPasswordStatus === 'EnteredButInvalid') {
         alert('error', 'Please enter a valid new password.');
      } else {
         setUpdatePasswordBtnStatus('submitted');
         setSubmittedBtn('password');
         updatePassword(currentPassword, newPassword);
      }
   };

   return (
      <>
         <Navbar page="edit" />
         <Pipes />
         <div className="section section--edit">
            <form className="form form--edit" autoComplete="off">
               <h3 className="form__header--midtitle">Update Your Profile</h3>
               <div className="form__body">
                  <FgiName
                     fullname={fullname}
                     updateFullname={setFullname}
                     fullnameStatus={fullnameStatus}
                     updateFullnameStatus={setFullnameStatus}
                  />
                  {/* image-crop */}
                  <div className="form__group__profile">
                     <img
                        className="form__group__profile--preview"
                        id="uploadImagePreview"
                        src={photoURL}
                        alt="profile"
                     />
                     <input
                        className="form__group__profile--input"
                        id="uploadImageInput"
                        type="file"
                        accept="image/*"
                        name="photo"
                     />
                     <div className="form__group__profile--links">
                        <label
                           className="form__group__profile--remove"
                           id="removeImageLabel"
                           click="setProfilePicToDefault"
                        >
                           Remove Photo
                        </label>
                        <label
                           className="form__group__profile--select"
                           id="uploadImageLabel"
                           htmlFor="uploadImageInput"
                        >
                           Select New Photo
                        </label>
                     </div>
                  </div>
                  <SubmitBtn name="Update Profile" status={updateProfileBtnStatus} />
               </div>
            </form>
         </div>
         <Pipes />
         <div className="section section--edit">
            <form className="form form--edit" autoComplete="off">
               <h3 className="form__header--midtitle">Update Your Email</h3>
               <div className="form__body">
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
                  <SubmitBtn name="Update Email" status={updateEmailBtnStatus} />
               </div>
            </form>
         </div>
         <Pipes />
         <div className="section section--edit">
            <form
               className="form form--edit"
               autoComplete="off"
               onSubmit={handlePasswordUpdate}
            >
               <h3 className="form__header--midtitle">Change Your Password.</h3>
               <div className="form__body">
                  <FgiPass
                     label="currentPassword"
                     password={currentPassword}
                     updatePassword={setCurrentPassword}
                     passwordStatus={currentPasswordStatus}
                     updatePasswordStatus={setCurrentPasswordStatus}
                  />
                  <FgiPass
                     label="newPassword"
                     password={newPassword}
                     updatePassword={setNewPassword}
                     passwordStatus={newPasswordStatus}
                     updatePasswordStatus={setNewPasswordStatus}
                  />
                  <SubmitBtn name="Change Password" status={updatePasswordBtnStatus} />
               </div>
            </form>
         </div>
      </>
   );
};

const mapStateToProps = createStructuredSelector({
   user: selectCurrentUser,
   userStatus: selectUserStatus,
});
const mapDispatchToProps = (dispatch) => ({
   alert: (type, msg) => dispatch(alert(type, msg)),
   updatePassword: (currentPassword, newPassword) =>
      dispatch(updatePassword({ currentPassword, newPassword })),
});
export default connect(mapStateToProps, mapDispatchToProps)(Edit);
