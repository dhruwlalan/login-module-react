import userActionTypes from './userActionTypes';

const INITIAL_STATE = {
   defaultPhotoURL:
      'https://firebasestorage.googleapis.com/v0/b/login-module-vue.appspot.com/o/default.png?alt=media&token=ac9c3618-ab29-42b5-8fc4-54d31cbe68a2',
   currentUser: 'checking',
   status: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case userActionTypes.STORE_USER:
         return {
            ...state,
            currentUser: action.payload,
         };
      case userActionTypes.SET_STATUS:
         return {
            ...state,
            status: action.payload,
         };
      default:
         return state;
   }
};

export default userReducer;
