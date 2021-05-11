import React, { useState } from 'react';
import classNames from 'classnames';

const FgiPass = ({
   label,
   password,
   updatePassword,
   passwordStatus,
   updatePasswordStatus,
}) => {
   label = label ?? 'password';
   const [shouldHover, setShouldHover] = useState(false);
   const [shouldFocus, setShouldFocus] = useState(false);
   const [showEyeSvg, setShowEyeSvg] = useState(false);
   const [showPassword, setShowPassword] = useState(false);

   const handleChange = (e) => {
      const value = e.target.value;
      updatePassword(value);
      if (value.length === 0) {
         updatePasswordStatus('notEntered');
      } else if (value.length > 7) {
         updatePasswordStatus('EnteredAndValid');
      } else {
         updatePasswordStatus('EnteredButInvalid');
      }
   };
   const togglePassword = () => {
      setShowPassword(!showPassword);
   };
   const labelName = () => {
      if (label === 'currentPassword') {
         return 'Current Password';
      }
      if (label === 'newPassword') {
         return 'New Password';
      }
      return 'Password';
   };
   const mouseEnter = () => {
      if (password.length === 0 && !shouldFocus) {
         setShouldHover(true);
      }
      setShowEyeSvg(true);
   };
   const mouseLeave = () => {
      setShouldHover(false);
      setShowEyeSvg(false);
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
      if (passwordStatus === 'EnteredAndValid') {
         return { border: '1px solid #002fff' };
      }
      if (passwordStatus === 'EnteredButInvalid') {
         return { border: '1px solid tomato' };
      }
      return null;
   };
   const labelClass = classNames('form__group-label', {
      'hover-label': shouldHover,
      'focus-label': shouldFocus,
   });
   const labelStyle = () => {
      if (passwordStatus === 'EnteredAndValid') {
         return { color: '#002fff' };
      } else if (passwordStatus === 'EnteredButInvalid') {
         return { color: 'tomato' };
      } else {
         return null;
      }
   };
   const eyeSvgClass = classNames('eye-svg', {
      showeyesvg: showEyeSvg,
   });
   const eyeSvgStyle = {
      display: showPassword ? 'inline-block' : null,
   };

   let eyeSvg;
   if (showPassword) {
      eyeSvg = (
         <svg
            focusable="false"
            viewBox="0 0 24 24"
            onClick={togglePassword}
            className={eyeSvgClass}
            style={eyeSvgStyle}
         >
            <path
               d="M8.073 12.194L4.212 8.333c-1.52 1.657-2.096 3.317-2.106 3.351L2 12l.105.316C2.127 12.383 4.421 19 12.054 19c.929 0 1.775-.102 2.552-.273l-2.746-2.746a3.987 3.987 0 0 1-3.787-3.787zM12.054 5c-1.855 0-3.375.404-4.642.998L3.707 2.293L2.293 3.707l18 18l1.414-1.414l-3.298-3.298c2.638-1.953 3.579-4.637 3.593-4.679l.105-.316l-.105-.316C21.98 11.617 19.687 5 12.054 5zm1.906 7.546c.187-.677.028-1.439-.492-1.96s-1.283-.679-1.96-.492L10 8.586A3.955 3.955 0 0 1 12.054 8c2.206 0 4 1.794 4 4a3.94 3.94 0 0 1-.587 2.053l-1.507-1.507z"
               fill="#002fff"
            ></path>
         </svg>
      );
   } else {
      eyeSvg = (
         <svg
            focusable="false"
            viewBox="0 0 24 24"
            onClick={togglePassword}
            className={eyeSvgClass}
            style={eyeSvgStyle}
         >
            <path
               d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316l-.105-.316C21.927 11.617 19.633 5 12 5zm0 11c-2.206 0-4-1.794-4-4s1.794-4 4-4s4 1.794 4 4s-1.794 4-4 4z"
               fill="#002fff"
            ></path>
            <path
               d="M12 10c-1.084 0-2 .916-2 2s.916 2 2 2s2-.916 2-2s-.916-2-2-2z"
               fill="#002fff"
            ></path>
         </svg>
      );
   }

   return (
      <div
         className={groupClass}
         style={groupStyle()}
         onMouseEnter={mouseEnter}
         onMouseLeave={mouseLeave}
      >
         <input
            className="form__group-input form__group-input--pass"
            id={`${label}Input`}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handleChange}
            onFocus={focusIn}
            onBlur={focusOut}
         />
         <label
            id={`${label}Label`}
            htmlFor={`${label}Input`}
            className={labelClass}
            style={labelStyle()}
         >
            {labelName()}
         </label>
         {eyeSvg}
      </div>
   );
};

export default FgiPass;
