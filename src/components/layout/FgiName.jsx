import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

const FgiName = ({
   path,
   fullname,
   updateFullname,
   fullnameStatus,
   updateFullnameStatus,
}) => {
   path = path ?? 'no-path';
   const [shouldHover, setShouldHover] = useState(false);
   const [shouldFocus, setShouldFocus] = useState(false);

   useEffect(() => {
      if (fullname.length === 0) {
         updateFullnameStatus('notEntered');
      } else {
         updateFullnameStatus('EnteredAndValid');
      }
   }, [fullname, updateFullnameStatus]);

   const mouseEnter = () => {
      if (fullname.length === 0 && !shouldFocus) {
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
   const groupStyle = {
      display: path === '/login' ? 'none' : 'block',
      border: fullnameStatus === 'EnteredAndValid' ? '1px solid #002fff' : null,
   };
   const labelClass = classNames('form__group-label', {
      'hover-label': shouldHover,
      'focus-label': shouldFocus,
   });
   const labelStyle = {
      color: fullnameStatus === 'EnteredAndValid' ? '#002fff' : null,
   };

   return (
      <div
         className={groupClass}
         style={groupStyle}
         onMouseEnter={mouseEnter}
         onMouseLeave={mouseLeave}
      >
         <input
            className="form__group-input"
            id="nameInput"
            type="text"
            value={fullname}
            onChange={(e) => updateFullname(e.target.value)}
            onFocus={focusIn}
            onBlur={focusOut}
         />
         <label
            id="nameLabel"
            htmlFor="nameInput"
            className={labelClass}
            style={labelStyle}
         >
            Full Name
         </label>
      </div>
   );
};

export default FgiName;
