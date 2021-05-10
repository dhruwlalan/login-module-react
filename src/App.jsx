import React, { Suspense, lazy, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import AlertBox from './components/utils/AlertBox';
import Spinner from './components/utils/Spinner';
import ProtectedRoute from './components/utils/ProtectedRoute';
import PublicRoute from './components/utils/PublicRoute';
import { checkUserSession } from './redux/user/userActions';

const Home = lazy(() => import('./pages/Home'));
const Edit = lazy(() => import('./pages/Edit'));
const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const ForgetPassword = lazy(() => import('./pages/ForgetPassword'));
const AccountManagement = lazy(() => import('./pages/AccountManagement'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

function App({ checkUserSession }) {
   useEffect(() => {
      checkUserSession();
   }, [checkUserSession]);

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
                  <Login />
               </PublicRoute>
               <PublicRoute path="/signup">
                  <SignUp />
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
   checkUserSession: () => dispatch(checkUserSession()),
});
export default connect(null, mapDispatchToProps)(App);
