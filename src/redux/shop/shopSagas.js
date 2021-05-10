import { takeLatest, put, all, call } from 'redux-saga/effects';

import shopActionTypes from './shopActionTypes';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shopActions';
import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebaseUtils';

export function* fetchCollectionsAsync() {
   try {
      const collectionRef = firestore.collection('collections');
      const snapshot = yield collectionRef.get();
      const collectionMap = yield call(convertCollectionSnapshotToMap, snapshot);
      yield put(fetchCollectionsSuccess(collectionMap));
   } catch (error) {
      yield put(fetchCollectionsFailure(error.message));
   }
}
export function* fetchCollectionsStart() {
   yield takeLatest(shopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}

function* shopSagas() {
   yield all([call(fetchCollectionsStart)]);
}
export default shopSagas;
