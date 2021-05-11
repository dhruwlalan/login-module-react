import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { selectCurrentUser } from '../../redux/user/userSelector';
import Spinner from '../utils/Spinner';

const PrivateRoute = ({ currentUser, children, ...rest }) => {
   return (
      <Route
         {...rest}
         render={({ location }) => {
            if (currentUser === 'checking') {
               return <Spinner />;
            } else if (currentUser) {
               return children;
            } else {
               return (
                  <Redirect
                     to={{
                        pathname: '/',
                        state: { from: location },
                     }}
                  />
               );
            }
         }}
      />
   );
};

const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(PrivateRoute);
