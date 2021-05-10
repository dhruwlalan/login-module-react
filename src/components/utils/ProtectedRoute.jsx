import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { selectCurrentUser } from '../../redux/user/userSelector';

const PrivateRoute = ({ currentUser, children, ...rest }) => {
   console.log('private', currentUser);
   return (
      <Route
         {...rest}
         render={({ location }) =>
            currentUser ? (
               children
            ) : (
               <Redirect
                  to={{
                     pathname: '/',
                     state: { from: location },
                  }}
               />
            )
         }
      />
   );
};

const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(PrivateRoute);
