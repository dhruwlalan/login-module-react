import { all, call } from 'redux-saga/effects';

import alertSagas from './alert/alertSagas';
import userSagas from './user/userSagas';

function* rootSaga() {
   yield all([call(alertSagas), call(userSagas)]);
}

export default rootSaga;
