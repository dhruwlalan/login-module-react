import React from 'react';

const FgiEmail = () => {
   return (
      <div className="form__group">
         <input className="form__group-input" id="emailInput" type="email" />
         <label className="form__group-label" id="emailLabel" htmlFor="emailInput">
            Email
         </label>
      </div>
   );
};

export default FgiEmail;
