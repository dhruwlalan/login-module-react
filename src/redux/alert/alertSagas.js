import { takeLatest, put, all, call } from 'redux-saga/effects';

import alertActionTypes from './alertActionTypes';
import { showAlert, hideAlert } from './alertActions';

async function hold(time) {
   time = time ?? 1000;
   return new Promise((res) => {
      setTimeout(() => {
         res(true);
      }, time);
   });
}
export function* alert({ payload: { type, msg, time } }) {
   yield put(showAlert(type, msg));
   yield hold(time);
   yield put(hideAlert());
}
export function* onAlert() {
   yield takeLatest(alertActionTypes.ALERT, alert);
}

function* alertSagas() {
   yield all([call(onAlert)]);
}
export default alertSagas;
