import React, { Suspense, lazy, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import AlertBox from './components/utils/AlertBox';
import Spinner from './components/utils/Spinner';
import ProtectedRoute from './components/utils/ProtectedRoute';
import PublicRoute from './components/utils/PublicRoute';
import { checkUserLoggedIn } from './redux/user/userActions';

const Home = lazy(() => import('./pages/Home'));
const Edit = lazy(() => import('./pages/Edit'));
const LoginSignup = lazy(() => import('./pages/LoginSignup'));
const ForgetPassword = lazy(() => import('./pages/ForgetPassword'));
const AccountManagement = lazy(() => import('./pages/AccountManagement'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

function App({ checkUserLoggedIn }) {
   useEffect(() => {
      checkUserLoggedIn();
   }, [checkUserLoggedIn]);

   return (
      <>
         <AlertBox></AlertBox>
         <Suspense fallback={<Spinner />}>
            <Switch>
               <Route exact path="/" component={Home} />
               <ProtectedRoute path="/edit">
                  <Edit />
               </ProtectedRoute>
               <PublicRoute path="/login">
                  <LoginSignup />
               </PublicRoute>
               <PublicRoute path="/signup">
                  <LoginSignup />
               </PublicRoute>
               <PublicRoute path="/forgetPassword">
                  <ForgetPassword />
               </PublicRoute>
               <PublicRoute path="/accmng">
                  <AccountManagement />
               </PublicRoute>
               <Route exact path="/*" component={PageNotFound} />
            </Switch>
         </Suspense>
      </>
   );
}

const mapDispatchToProps = (dispatch) => ({
   checkUserLoggedIn: () => dispatch(checkUserLoggedIn()),
});
export default connect(null, mapDispatchToProps)(App);
