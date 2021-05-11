import React from 'react';

const FgiPass = ({ name }) => {
   return (
      <div className="form__group">
         <input className="form__group-input form__group-input--pass" />
         <label className="form__group-label">{name}</label>
         <pass-show v-if="showPassword" />
         <pass-hide v-if="!showPassword" />
      </div>
   );
};

export default FgiPass;
