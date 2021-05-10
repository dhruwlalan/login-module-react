import alertActionTypes from './alertActionTypes';

export const alert = (type, msg, time) => ({
   type: alertActionTypes.ALERT,
   payload: { type, msg, time },
});

export const showAlert = (type, msg) => ({
   type: alertActionTypes.SHOW_ALERT,
   payload: { type, msg },
});

export const hideAlert = () => ({
   type: alertActionTypes.HIDE_ALERT,
});
