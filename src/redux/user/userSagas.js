import { takeLatest, put, all, call } from 'redux-saga/effects';

import hold from '../../components/vanilla/hold';
import userActionTypes from './userActionTypes';
import { storeUser, setStatus } from './userActions';
import { auth, resolveUser, getCurrentUser } from '../../firebase/firebaseUtils';

export function* isUserLoggedIn() {
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

export function* signup({ payload: { email, password, fullName } }) {
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

export function* signin({ payload: { email, password } }) {
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

export function* signout() {
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

export default function* userSagas() {
   yield all([
      call(onCheckUserLoggedIn),
      call(onSignup),
      call(onSignin),
      call(onSignout),
   ]);
}
