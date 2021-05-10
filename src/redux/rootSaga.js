import { all, call } from 'redux-saga/effects';

import alertSagas from './alert/alertSagas';

function* rootSaga() {
   yield all([call(alertSagas)]);
}

export default rootSaga;
