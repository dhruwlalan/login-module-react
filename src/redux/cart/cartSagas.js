import { takeLatest, put, all, call } from 'redux-saga/effects';

import userActionTypes from '../user/userActionTypes';
import { clearCart } from './cartActions';

export function* clearCartOnSignOut() {
   yield put(clearCart());
}
export function* onSignOutSuccess() {
   yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

function* cartSagas() {
   yield all([call(onSignOutSuccess)]);
}
export default cartSagas;
