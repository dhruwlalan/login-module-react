import { takeLatest, put, all, call } from 'redux-saga/effects';

import userActionTypes from './userActionTypes';
import { storeUser, setStatus } from './userActions';
import { getCurrentUser } from '../../firebase/firebaseUtils';

export function* isUserAuthenticated() {
   try {
      const user = yield getCurrentUser();
      if (!user) yield put(storeUser('null'));
      else yield put(storeUser(user));
      yield put(setStatus('success'));
   } catch (error) {
      yield put(setStatus(error));
   }
}
export function* onCheckUserSession() {
   yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

// export function* signInWithEmail({ payload: { email, password } }) {
//    try {
//       const { user } = yield auth.signInWithEmailAndPassword(email, password);
//       yield put(signInSuccess(user));
//    } catch (error) {
//       yield put(signInFailure(error));
//    }
// }
// export function* onSignInStart() {
//    yield takeLatest(userActionTypes.SIGN_IN_START, signInWithEmail);
// }

// export function* signOut() {
//    try {
//       yield auth.signOut();
//       yield put(signOutSuccess());
//    } catch (error) {
//       yield put(signOutFailure(error));
//    }
// }
// export function* onSignOutStart() {
//    yield takeLatest(userActionTypes.SIGN_OUT_START, signOut);
// }

// export function* signUp({ payload: { email, password, fullName } }) {
//    try {
//       const { user } = yield auth.createUserWithEmailAndPassword(email, password);
//       yield user.updateProfile({
//          displayName: fullName,
//          photoURL: context.getters.defaultPhotoURL,
//       });
//       yield put(signUpSuccess({ user, additionalData: { fullName } }));
//    } catch (error) {
//       yield put(signUpFailure(error));
//    }
// }
// export function* onSignUpStart() {
//    yield takeLatest(userActionTypes.SIGN_UP_START, signUp);
// }
// export function* signInAfterSignUp({ payload: { user, additionalData } }) {
//    yield getSnapshotFromUserAuth(user, additionalData);
// }
// export function* onSignUpSuccess() {
//    yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
// }

function* userSagas() {
   // yield all([call(onCheckUserSession), call(onSignUp), call(onSignIn), call(onSignOut)]);
   yield all([call(onCheckUserSession)]);
}
export default userSagas;
