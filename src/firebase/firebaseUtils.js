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

export const resolveUser = () => {
   return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
         unsubscribe();
         resolve(user);
      }, reject);
   });
};

export const getCurrentUser = () => {
   return auth.currentUser;
};

// auth.signOut();

export { fb, auth, storageRef };
