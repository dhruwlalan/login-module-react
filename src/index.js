import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './sass/main.scss';

import App from './App';
import { store } from './redux/store';
import preloader from './components/vanilla/preloader';

preloader();

ReactDOM.render(
   <Provider store={store}>
      <React.StrictMode>
         <App />
      </React.StrictMode>
   </Provider>,
   document.getElementById('root'),
);
