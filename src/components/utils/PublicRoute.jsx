import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { selectCurrentUser } from '../../redux/user/userSelector';
import Spinner from '../utils/Spinner';

const PublicRoute = ({ currentUser, children, ...rest }) => {
   return (
      <Route
         {...rest}
         render={({ location }) => {
            if (currentUser === 'checking') {
               return <Spinner />;
            } else if (currentUser) {
               return (
                  <Redirect
                     to={{
                        pathname: '/',
                        state: { from: location },
                     }}
                  />
               );
            } else {
               return children;
            }
         }}
      />
   );
};

const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(PublicRoute);
