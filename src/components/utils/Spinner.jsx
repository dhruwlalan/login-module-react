import React from 'react';

const Spinner = ({ color }) => (
   <div className={`spinner spinner-${color ?? 'white'}`}></div>
);

export default Spinner;
