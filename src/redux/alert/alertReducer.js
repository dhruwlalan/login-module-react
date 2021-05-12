import alertActionTypes from './alertActionTypes';

const INITIAL_STATE = {
   showAlert: false,
   type: null,
   msg: null,
};

const alertReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case alertActionTypes.SHOW_ALERT:
         return {
            ...state,
            showAlert: true,
            type: action.payload.type,
            msg: action.payload.msg,
         };
      case alertActionTypes.HIDE_ALERT:
         return {
            ...state,
            showAlert: false,
         };
      default:
         return state;
   }
};

export default alertReducer;
