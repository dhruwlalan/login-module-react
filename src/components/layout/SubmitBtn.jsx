import React from 'react';

const SubmitBtn = ({ path, status }) => {
   const text = path === '/login' ? 'Login' : 'Creat Account';

   let content;
   if (status === 'notSubmitted') {
      content = <span>{text}</span>;
   } else if (status === 'spinner') {
      content = <span className="spinner-white" />;
   } else if (status === 'success') {
      content = <span>&#10003;</span>;
   } else if (status === 'error') {
      content = <span>&#10007;</span>;
   } else {
      content = <span>button</span>;
   }

   return <button className="btn">{content}</button>;
};

export default SubmitBtn;
