import { takeLatest, put, all, call } from 'redux-saga/effects';

import hold from '../../components/vanilla/hold';
import userActionTypes from './userActionTypes';
import { storeUser, setStatus } from './userActions';
import { fb, auth, resolveUser, getCurrentUser } from '../../firebase/firebaseUtils';

function* isUserLoggedIn() {
   try {
      const user = yield resolveUser();
      if (!user) {
         yield put(storeUser(null));
      } else {
         yield put(storeUser(user));
      }
   } catch (error) {
      yield put(setStatus('error', error.message));
   }
}
export function* onCheckUserLoggedIn() {
   yield takeLatest(userActionTypes.CHECK_USER_LOGGED_IN, isUserLoggedIn);
}

function* signup({ payload: { email, password, fullName } }) {
   try {
      const { user } = yield auth.createUserWithEmailAndPassword(email, password);
      yield user.updateProfile({
         displayName: fullName,
         photoURL:
            'https://firebasestorage.googleapis.com/v0/b/login-module-vue.appspot.com/o/default.png?alt=media&token=ac9c3618-ab29-42b5-8fc4-54d31cbe68a2',
      });
      const currentUser = getCurrentUser();
      if (currentUser) {
         yield put(setStatus('success', 'User Created Successfully!'));
         yield hold(1200);
         yield put(setStatus(null));
         yield put(storeUser(currentUser));
      } else {
         throw new Error('Unable to store user!');
      }
   } catch (error) {
      yield put(storeUser(null));
      if (error.code === 'auth/email-already-in-use') {
         yield put(setStatus('error', 'Email already exists!'));
      } else {
         yield put(setStatus('error', error.message));
      }
   }
}
export function* onSignup() {
   yield takeLatest(userActionTypes.SIGN_UP, signup);
}

function* signin({ payload: { email, password } }) {
   try {
      yield auth.signInWithEmailAndPassword(email, password);
      const currentUser = getCurrentUser();
      if (currentUser) {
         yield put(setStatus('success', 'User Logged In Successfully!'));
         yield hold(1200);
         yield put(setStatus(null));
         yield put(storeUser(currentUser));
      } else {
         throw new Error('Unable to store user!');
      }
   } catch (error) {
      yield put(storeUser(null));
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
         yield put(setStatus('error', 'Invalid email or password!'));
      } else {
         yield put(setStatus('error', error.message));
      }
   }
}
export function* onSignin() {
   yield takeLatest(userActionTypes.SIGN_IN, signin);
}

function* signout() {
   try {
      yield auth.signOut();
      yield put(storeUser(null));
   } catch (error) {
      yield put(storeUser(null));
      yield put(setStatus('error', error.message));
   }
}
export function* onSignout() {
   yield takeLatest(userActionTypes.SIGN_OUT, signout);
}

function* forgetPassword({ payload: { email } }) {
   try {
      yield auth.sendPasswordResetEmail(email);
      yield put(setStatus('success', 'Link sent to email successfully!'));
      yield put(setStatus(null));
   } catch (error) {
      yield put(setStatus('error', error.message));
   }
}
export function* onForgetPassword() {
   yield takeLatest(userActionTypes.FORGET_PASSWORD, forgetPassword);
}

function* _reAuthenticateUser(password) {
   try {
      const user = getCurrentUser();
      const credentials = fb.auth.EmailAuthProvider.credential(user.email, password);
      yield user.reauthenticateWithCredential(credentials);
      return 'success';
   } catch (error) {
      return error.code;
   }
}
function* updatePassword({ payload: { currentPassword, newPassword } }) {
   const res = yield _reAuthenticateUser(currentPassword);
   if (res === 'success') {
      try {
         const user = getCurrentUser();
         yield user.updatePassword(newPassword);
         yield put(storeUser(getCurrentUser()));
         yield put(setStatus('success', 'Password Updated Successfully!'));
         yield put(setStatus(null));
      } catch (error) {
         yield put(setStatus('error', error.message));
      }
   } else {
      if (res === 'auth/wrong-password') {
         yield put(setStatus('error', 'Invalid Current Password!'));
         yield put(setStatus(null));
      } else if (res === 'auth/too-many-requests') {
         yield put(setStatus('error', 'Please try after some time!'));
         yield put(setStatus(null));
      } else {
         yield put(setStatus('error', 'something went wrong!'));
         yield put(setStatus(null));
      }
   }
}
export function* onUpdatePassword() {
   yield takeLatest(userActionTypes.UPDATE_PASSWORD, updatePassword);
}
function* updateEmail({ payload: { email, password } }) {
   const res = yield _reAuthenticateUser(password);
   if (res === 'success') {
      try {
         const user = getCurrentUser();
         yield user.updateEmail(email);
         yield put(storeUser(getCurrentUser()));
         yield put(setStatus('success', 'Email Updated Successfully!'));
         yield put(setStatus(null));
      } catch (error) {
         yield put(setStatus('error', error.message));
      }
   } else {
      if (res === 'auth/wrong-password') {
         yield put(setStatus('error', 'Invalid Current Password!'));
         yield put(setStatus(null));
      } else if (res === 'auth/too-many-requests') {
         yield put(setStatus('error', 'Please try after some time!'));
         yield put(setStatus(null));
      } else {
         yield put(setStatus('error', 'something went wrong!'));
         yield put(setStatus(null));
      }
   }
}
export function* onUpdateEmail() {
   yield takeLatest(userActionTypes.UPDATE_EMAIL, updateEmail);
}

export default function* userSagas() {
   yield all([
      call(onCheckUserLoggedIn),
      call(onSignup),
      call(onSignin),
      call(onSignout),
      call(onForgetPassword),
      call(onUpdatePassword),
      call(onUpdateEmail),
   ]);
}
