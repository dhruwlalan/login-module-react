import userActionTypes from './userActionTypes';

export const storeUser = (user) => ({
   type: userActionTypes.STORE_USER,
   payload: user
      ? {
           uid: user.uid,
           email: user.email,
           displayName: user.displayName,
           photoURL: user.photoURL,
        }
      : null,
});

export const setStatus = (type, message) => ({
   type: userActionTypes.SET_STATUS,
   payload: { type, message },
});

export const checkUserLoggedIn = () => ({
   type: userActionTypes.CHECK_USER_LOGGED_IN,
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
