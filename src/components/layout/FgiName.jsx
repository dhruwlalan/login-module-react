import React from 'react';

const FgiName = ({ path }) => {
   return (
      <div
         className="form__group"
         style={{ display: path === '/signup' ? 'block' : 'none' }}
      >
         <input className="form__group-input" id="nameInput" type="text" />
         <label className="form__group-label" id="nameLabel" htmlFor="nameInput">
            Full Name
         </label>
      </div>
   );
};

export default FgiName;
