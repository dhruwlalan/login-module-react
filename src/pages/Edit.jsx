import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Navbar from '../components/layout/Navbar';
import Pipes from '../components/layout/Pipes';
import FgiName from '../components/layout/FgiName';
import FgiEmail from '../components/layout/FgiEmail';
import FgiPass from '../components/layout/FgiPass';
import SubmitBtn from '../components/layout/SubmitBtn';
import ImageCrop from '../components/layout/ImageCrop';
import { alert } from '../redux/alert/alertActions';
import { updatePassword, updateEmail, updateProfile } from '../redux/user/userActions';
import {
   selectCurrentUser,
   selectUserStatus,
   selectDefaultPhotoURL,
} from '../redux/user/userSelector';

const Edit = ({
   user,
   alert,
   userStatus,
   defaultPhotoURL,
   updatePassword,
   updateEmail,
   updateProfile,
}) => {
   const [fullname, setFullname] = useState(user.displayName);
   const [fullnameStatus, setFullnameStatus] = useState('notEntered');
   const [photoURL, setPhotoURL] = useState(user.photoURL);
   const [openImageCropModal, setOpenImageCropModal] = useState(false);
   const [newPhotoDataUrl, setNewPhotoDataUrl] = useState(null);
   const [newPhotoFile, setNewPhotoFile] = useState(null);

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
         setPassword('');
         setCurrentPassword('');
         setNewPassword('');
      }, 1000);
   }, [userStatus, alert, submittedBtn]);

   const uploadImageInput = useRef(null);
   const getNewPhotoFromUser = () => {
      const photo = uploadImageInput.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(photo);
      reader.onload = (e) => {
         setNewPhotoDataUrl(e.target.result);
         uploadImageInput.current.value = '';
         setOpenImageCropModal(true);
      };
   };
   const setProfilePicToDefault = () => {
      setPhotoURL(defaultPhotoURL);
      setNewPhotoDataUrl(null);
      setNewPhotoFile(null);
   };
   const onCropped = (cropImageUrl) => {
      setNewPhotoDataUrl(null);
      setPhotoURL(cropImageUrl.base64);
      setNewPhotoFile(cropImageUrl.photo);
   };

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
   const handleEmailUpdate = (e) => {
      e.preventDefault();
      if (emailStatus === 'notEntered') {
         alert('error', 'Please enter your email address.');
      } else if (emailStatus === 'EnteredButInvalid') {
         alert('error', 'Please enter a valid email address.');
      } else if (passwordStatus === 'notEntered') {
         alert('error', 'Please enter your password to change your email');
      } else if (passwordStatus === 'EnteredButInvalid') {
         alert('error', 'Please enter your correct current password');
      } else {
         setUpdateEmailBtnStatus('submitted');
         setSubmittedBtn('email');
         updateEmail(email, password);
      }
   };
   const handleProfileUpdate = (e) => {
      e.preventDefault();
      if (fullnameStatus === 'notEntered') {
         alert('error', 'Please enter your full name.');
      } else if (emailStatus === 'notEntered') {
         alert('error', 'Please enter your email address.');
      } else if (emailStatus === 'EnteredButInvalid') {
         alert('error', 'Please enter a valid email address.');
      } else {
         setUpdateProfileBtnStatus('submitted');
         setSubmittedBtn('profile');
         updateProfile({ fullname });
         if (photoURL === defaultPhotoURL) {
            updateProfile({ photoURL: defaultPhotoURL });
         } else if (newPhotoFile) {
            updateProfile({ newPhotoFile: newPhotoFile });
         }
      }
   };

   return (
      <>
         <Navbar page="edit" />
         <Pipes />
         <div className="section section--edit">
            <form
               className="form form--edit"
               autoComplete="off"
               onSubmit={handleProfileUpdate}
            >
               <h3 className="form__header--midtitle">Update Your Profile</h3>
               <div className="form__body">
                  <FgiName
                     fullname={fullname}
                     updateFullname={setFullname}
                     fullnameStatus={fullnameStatus}
                     updateFullnameStatus={setFullnameStatus}
                  />
                  <ImageCrop
                     img={newPhotoDataUrl}
                     openModal={openImageCropModal}
                     updateModal={setOpenImageCropModal}
                     onCropped={onCropped}
                  />
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
                        onChange={getNewPhotoFromUser}
                        ref={uploadImageInput}
                     />
                     <div className="form__group__profile--links">
                        <label
                           className="form__group__profile--remove"
                           id="removeImageLabel"
                           onClick={setProfilePicToDefault}
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
            <form
               className="form form--edit"
               autoComplete="off"
               onSubmit={handleEmailUpdate}
            >
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
   defaultPhotoURL: selectDefaultPhotoURL,
});
const mapDispatchToProps = (dispatch) => ({
   alert: (type, msg) => dispatch(alert(type, msg)),
   updatePassword: (currentPassword, newPassword) =>
      dispatch(updatePassword({ currentPassword, newPassword })),
   updateEmail: (email, password) => dispatch(updateEmail({ email, password })),
   updateProfile: (obj) => dispatch(updateProfile(obj)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Edit);
