import React, { useState } from 'react';
import classNames from 'classnames';
import validator from 'email-validator';

const FgiEmail = ({ email, updateEmail, emailStatus, updateEmailStatus }) => {
   const [shouldHover, setShouldHover] = useState(false);
   const [shouldFocus, setShouldFocus] = useState(false);

   const handleChange = (e) => {
      const value = e.target.value;
      updateEmail(value);
      if (value.length === 0) {
         updateEmailStatus('notEntered');
      } else if (validator.validate(value)) {
         updateEmailStatus('EnteredAndValid');
      } else {
         updateEmailStatus('EnteredButInvalid');
      }
   };
   const mouseEnter = () => {
      if (email.length === 0 && !shouldFocus) {
         setShouldHover(true);
      }
   };
   const mouseLeave = () => {
      setShouldHover(false);
   };
   const focusIn = () => {
      setShouldFocus(true);
      setShouldHover(false);
   };
   const focusOut = () => {
      setShouldFocus(false);
   };

   const groupClass = classNames('form__group', {
      'hover-input': shouldHover,
      'focus-input': shouldFocus,
   });
   const groupStyle = () => {
      if (emailStatus === 'EnteredAndValid') {
         return { border: '1px solid #002fff' };
      } else if (emailStatus === 'EnteredButInvalid') {
         return { border: '1px solid tomato' };
      } else {
         return null;
      }
   };
   const labelClass = classNames('form__group-label', {
      'hover-label': shouldHover,
      'focus-label': shouldFocus,
   });
   const labelStyle = () => {
      if (emailStatus === 'EnteredAndValid') {
         return { color: '#002fff' };
      } else if (emailStatus === 'EnteredButInvalid') {
         return { color: 'tomato' };
      } else {
         return null;
      }
   };

   return (
      <div
         className={groupClass}
         style={groupStyle()}
         onMouseEnter={mouseEnter}
         onMouseLeave={mouseLeave}
      >
         <input
            className="form__group-input"
            id="emailInput"
            type="email"
            value={email}
            onChange={handleChange}
            onFocus={focusIn}
            onBlur={focusOut}
         />
         <label
            id="emailLabel"
            htmlFor="emailInput"
            className={labelClass}
            style={labelStyle()}
         >
            Email
         </label>
      </div>
   );
};

export default FgiEmail;
