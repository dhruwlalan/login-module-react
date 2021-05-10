import cartActionTypes from './cartActionTypes';

export const toggleCart = () => ({
   type: cartActionTypes.TOGGLE_CART,
});

export const addItem = (item) => ({
   type: cartActionTypes.ADD_ITEM,
   payload: item,
});

export const removeItem = (item) => ({
   type: cartActionTypes.REMOVE_ITEM,
   payload: item,
});

export const clearItemFormCart = (item) => ({
   type: cartActionTypes.CLEAR_ITEM_FROM_CART,
   payload: item,
});

export const clearCart = () => ({
   type: cartActionTypes.CLEAR_CART,
});
