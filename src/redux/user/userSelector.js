import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector([selectUser], (user) => user.currentUser);

export const selectUserStatus = createSelector([selectUser], (user) => user.status);

export const selectDefaultPhotoURL = createSelector(
   [selectUser],
   (user) => user.defaultPhotoURL,
);
