import { takeLatest, put, all, call } from 'redux-saga/effects';

import userActionTypes from './userActionTypes';
import {
   signInSuccess,
   signInFailure,
   signOutSuccess,
   signOutFailure,
   signUpSuccess,
   signUpFailure,
} from './userActions';
import {
   auth,
   createUserProfileDocument,
   getCurrentUser,
   googleProvider,
} from '../../firebase/firebaseUtils';

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
   try {
      const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
      const userSnapshot = yield userRef.get();
      yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
   } catch (error) {
      yield put(signInFailure(error));
   }
}

export function* signInWithGoogle() {
   try {
      const { user } = yield auth.signInWithPopup(googleProvider);
      yield getSnapshotFromUserAuth(user);
   } catch (error) {
      yield put(signInFailure(error));
   }
}
export function* signInWithEmail({ payload: { email, password } }) {
   try {
      const { user } = yield auth.signInWithEmailAndPassword(email, password);
      yield getSnapshotFromUserAuth(user);
   } catch (error) {
      yield put(signInFailure(error));
   }
}

export function* onGoogleSignInStart() {
   yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}
export function* onEmailSignInStart() {
   yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* isUserAuthenticated() {
   try {
      const userAuth = yield getCurrentUser();
      if (!userAuth) return;
      yield getSnapshotFromUserAuth(userAuth);
   } catch (error) {
      yield put(signInFailure(error));
   }
}
export function* onCheckUserSession() {
   yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOut() {
   try {
      yield auth.signOut();
      yield put(signOutSuccess());
   } catch (error) {
      yield put(signOutFailure(error));
   }
}
export function* onSignOutStart() {
   yield takeLatest(userActionTypes.SIGN_OUT_START, signOut);
}

export function* signUp({ payload: { email, password, displayName } }) {
   try {
      const { user } = yield auth.createUserWithEmailAndPassword(email, password);
      yield put(signUpSuccess({ user, additionalData: { displayName } }));
   } catch (error) {
      yield put(signUpFailure(error));
   }
}
export function* onSignUpStart() {
   yield takeLatest(userActionTypes.SIGN_UP_START, signUp);
}
export function* signInAfterSignUp({ payload: { user, additionalData } }) {
   yield getSnapshotFromUserAuth(user, additionalData);
}
export function* onSignUpSuccess() {
   yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

function* userSagas() {
   yield all([
      call(onGoogleSignInStart),
      call(onEmailSignInStart),
      call(onCheckUserSession),
      call(onSignOutStart),
      call(onSignUpStart),
      call(onSignUpSuccess),
   ]);
}
export default userSagas;
