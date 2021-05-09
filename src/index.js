import React from 'react';
import ReactDOM from 'react-dom';
import './sass/main.scss';

import App from './App';
import preloader from './components/vanilla/preloader';

preloader();

ReactDOM.render(
   <React.StrictMode>
      <App />
   </React.StrictMode>,
   document.getElementById('root'),
);
