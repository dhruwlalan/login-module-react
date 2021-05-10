import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import firebaseConfig from './firebaseConfig';

///Initialize Firebase///
firebase.initializeApp(firebaseConfig);

///Utils///
const fb = firebase;
const auth = firebase.auth();
const storageRef = firebase.storage().ref();

export const getCurrentUser = () => {
   return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged((userAuth) => {
         unsubscribe();
         resolve(userAuth);
      }, reject);
   });
};

export { fb, auth, storageRef };
