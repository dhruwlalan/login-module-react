import React from 'react';
import { connect } from 'react-redux';

import AlertBox from './components/utils/AlertBox';
import { alert } from './redux/alert/alertActions';

function App({ showAlert }) {
   return (
      <>
         <AlertBox></AlertBox>
         <div className="container">
            <button onClick={() => showAlert('success', 'ohh YES')}>yes</button>
            <button onClick={() => showAlert('error', 'hell no')}>no</button>
         </div>
      </>
   );
}

const mapDispatchToProps = (dispatch) => ({
   showAlert: (type, msg, time) => dispatch(alert(type, msg, time)),
});
export default connect(null, mapDispatchToProps)(App);
