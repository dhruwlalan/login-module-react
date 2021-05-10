import userActionTypes from './userActionTypes';

// uid: auth.currentUser.uid,
// email: auth.currentUser.email,
// displayName: auth.currentUser.displayName,
// photoURL: auth.currentUser.photoURL,
export const storeUser = (user) => ({
   type: userActionTypes.STORE_USER,
   payload: user,
});

export const setStatus = (type, message) => ({
   type: userActionTypes.SET_STATUS,
   payload: { type, message },
});

export const checkUserSession = () => ({
   type: userActionTypes.CHECK_USER_SESSION,
});

export const signUp = ({ email, password, fullName }) => ({
   type: userActionTypes.SIGN_UP,
   payload: { email, password, fullName },
});

export const signIn = ({ email, password }) => ({
   type: userActionTypes.SIGN_IN,
   payload: { email, password },
});

export const signOut = () => ({
   type: userActionTypes.SIGN_OUT,
});
