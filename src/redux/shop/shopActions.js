import shopActionTypes from './shopActionTypes';
import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebaseUtils';

export const fetchCollectionsStart = () => ({
   type: shopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionMap) => ({
   type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
   payload: collectionMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
   type: shopActionTypes.FETCH_COLLECTIONS_FAILURE,
   payload: errorMessage,
});

export const fetchCollectionsStartAsync = () => {
   return (dispatch) => {
      const collectionRef = firestore.collection('collections');
      dispatch(fetchCollectionsStart());

      collectionRef
         .get()
         .then((snapshot) => {
            const collectionMap = convertCollectionSnapshotToMap(snapshot);
            dispatch(fetchCollectionsSuccess(collectionMap));
         })
         .catch((error) => {
            dispatch(fetchCollectionsFailure(error.message));
         });
   };
};
