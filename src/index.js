import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './sass/main.scss';
import App from './App';
import { store } from './redux/store';
import preloader from './components/vanilla/preloader';

preloader();

ReactDOM.render(
   <Provider store={store}>
      <BrowserRouter>
         <React.StrictMode>
            <App />
         </React.StrictMode>
      </BrowserRouter>
   </Provider>,
   document.getElementById('root'),
);
