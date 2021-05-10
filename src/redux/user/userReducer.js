import userActionTypes from './userActionTypes';

const INITIAL_STATE = {
   currentUser: null,
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
